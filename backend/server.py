from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import team routes
from team_routes import router as team_router


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Import models for courses
from models import Course, TeamProfile

# Get all courses with team information
@api_router.get("/courses")
async def get_all_courses():
    courses = await db.courses.find().to_list(1000)
    
    # Enrich courses with team information
    enriched_courses = []
    for course in courses:
        course_obj = Course(**course)
        
        # Get instructor team info if available
        instructor_team = None
        if course_obj.instructor_team_id:
            team_doc = await db.teams.find_one({"id": course_obj.instructor_team_id})
            if team_doc:
                team_doc.pop("password_hash", None)
                instructor_team = TeamProfile(**team_doc)
        
        enriched_courses.append({
            **course_obj.dict(),
            "instructor_team": instructor_team.dict() if instructor_team else None
        })
    
    return enriched_courses

# Get single course with team information
@api_router.get("/courses/{course_id}")
async def get_course(course_id: str):
    course = await db.courses.find_one({"id": course_id})
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    course_obj = Course(**course)
    
    # Get instructor team info
    instructor_team = None
    if course_obj.instructor_team_id:
        team_doc = await db.teams.find_one({"id": course_obj.instructor_team_id})
        if team_doc:
            team_doc.pop("password_hash", None)
            instructor_team = TeamProfile(**team_doc)
    
    return {
        **course_obj.dict(),
        "instructor_team": instructor_team.dict() if instructor_team else None
    }

# Get public materials (materials marked as public)
@api_router.get("/materials/public")
async def get_public_materials():
    materials = await db.team_materials.find({"is_public": True}).to_list(1000)
    
    # Enrich with team information
    enriched_materials = []
    for material in materials:
        team_doc = await db.teams.find_one({"id": material["team_id"]})
        team_info = None
        if team_doc:
            team_doc.pop("password_hash", None)
            team_info = {
                "team_name": team_doc.get("team_name"),
                "logo_url": team_doc.get("logo_url"),
                "social_media": team_doc.get("social_media", {})
            }
        
        enriched_materials.append({
            **material,
            "team_info": team_info
        })
    
    return enriched_materials

# Include the router in the main app
app.include_router(api_router)

# Set up database for team routes
import team_routes
team_routes.db_instance = db

# Include team router
app.include_router(team_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

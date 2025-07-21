from fastapi import APIRouter, HTTPException, status, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timedelta
import base64
import os
from typing import List, Optional

from models import (
    TeamRegistrationRequest, TeamLogin, TeamToken, TeamProfile, 
    TeamUpdateRequest, MaterialUploadRequest, TeamMaterial,
    ContactTeamRequest, TeamContactMessage, Course
)
from auth import (
    get_password_hash, verify_password, create_access_token, 
    get_current_team
)

# This will be injected in server.py
router = APIRouter(prefix="/api/teams", tags=["teams"])

async def get_team_collection(db: AsyncIOMotorDatabase):
    return db.teams

async def get_materials_collection(db: AsyncIOMotorDatabase):
    return db.team_materials

async def get_messages_collection(db: AsyncIOMotorDatabase):
    return db.team_messages

async def get_courses_collection(db: AsyncIOMotorDatabase):
    return db.courses

# Team Registration
@router.post("/register", response_model=TeamToken)
async def register_team(request: TeamRegistrationRequest, db: AsyncIOMotorDatabase = Depends()):
    teams_collection = await get_team_collection(db)
    
    # Check if team already exists
    existing_team = await teams_collection.find_one({
        "$or": [
            {"contact_email": request.contact_email},
            {"team_name": request.team_name}
        ]
    })
    
    if existing_team:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Team with this name or email already exists"
        )
    
    # Create team profile
    team_profile = TeamProfile(
        team_name=request.team_name,
        team_number=request.team_number,
        contact_email=request.contact_email,
        description=request.description,
        location=request.location,
        founded_year=request.founded_year,
        website=request.website
    )
    
    # Hash password and create team document
    team_doc = team_profile.dict()
    team_doc["password_hash"] = get_password_hash(request.password)
    
    # Insert team into database
    result = await teams_collection.insert_one(team_doc)
    
    if not result.inserted_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create team"
        )
    
    # Create access token
    access_token = create_access_token(
        data={"team_id": team_profile.id, "team_name": team_profile.team_name}
    )
    
    return TeamToken(
        access_token=access_token,
        token_type="bearer",
        team_profile=team_profile
    )

# Team Login
@router.post("/login", response_model=TeamToken)
async def login_team(login_data: TeamLogin, db: AsyncIOMotorDatabase = Depends()):
    teams_collection = await get_team_collection(db)
    
    # Find team by email
    team_doc = await teams_collection.find_one({"contact_email": login_data.email})
    
    if not team_doc or not verify_password(login_data.password, team_doc["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Remove password hash from response
    team_doc.pop("password_hash", None)
    team_profile = TeamProfile(**team_doc)
    
    # Create access token
    access_token = create_access_token(
        data={"team_id": team_profile.id, "team_name": team_profile.team_name}
    )
    
    return TeamToken(
        access_token=access_token,
        token_type="bearer", 
        team_profile=team_profile
    )

# Get Team Profile
@router.get("/profile", response_model=TeamProfile)
async def get_team_profile(
    current_team: dict = Depends(get_current_team),
    db: AsyncIOMotorDatabase = Depends()
):
    teams_collection = await get_team_collection(db)
    
    team_doc = await teams_collection.find_one({"id": current_team["team_id"]})
    if not team_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )
    
    team_doc.pop("password_hash", None)
    return TeamProfile(**team_doc)

# Update Team Profile
@router.put("/profile", response_model=TeamProfile)
async def update_team_profile(
    update_data: TeamUpdateRequest,
    current_team: dict = Depends(get_current_team),
    db: AsyncIOMotorDatabase = Depends()
):
    teams_collection = await get_team_collection(db)
    
    # Build update document
    update_doc = {}
    if update_data.team_name is not None:
        update_doc["team_name"] = update_data.team_name
    if update_data.team_number is not None:
        update_doc["team_number"] = update_data.team_number
    if update_data.description is not None:
        update_doc["description"] = update_data.description
    if update_data.logo_data is not None:
        update_doc["logo_url"] = update_data.logo_data
    if update_data.social_media is not None:
        update_doc["social_media"] = update_data.social_media.dict()
    if update_data.location is not None:
        update_doc["location"] = update_data.location
    if update_data.founded_year is not None:
        update_doc["founded_year"] = update_data.founded_year
    if update_data.website is not None:
        update_doc["website"] = update_data.website
    
    update_doc["updated_at"] = datetime.utcnow()
    
    # Update team
    result = await teams_collection.update_one(
        {"id": current_team["team_id"]},
        {"$set": update_doc}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )
    
    # Return updated profile
    team_doc = await teams_collection.find_one({"id": current_team["team_id"]})
    team_doc.pop("password_hash", None)
    return TeamProfile(**team_doc)

# Upload Material
@router.post("/materials", response_model=TeamMaterial)
async def upload_material(
    material_data: MaterialUploadRequest,
    current_team: dict = Depends(get_current_team),
    db: AsyncIOMotorDatabase = Depends()
):
    materials_collection = await get_materials_collection(db)
    
    # Validate file size (limit to 50MB)
    try:
        file_size = len(base64.b64decode(material_data.file_data))
        if file_size > 50 * 1024 * 1024:  # 50MB limit
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="File size too large. Maximum 50MB allowed."
            )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file data"
        )
    
    # Create material
    material = TeamMaterial(
        team_id=current_team["team_id"],
        title=material_data.title,
        description=material_data.description,
        material_type=material_data.material_type,
        file_data=material_data.file_data,
        file_name=material_data.file_name,
        file_size=file_size,
        mime_type=material_data.mime_type,
        is_public=material_data.is_public,
        tags=material_data.tags
    )
    
    # Insert into database
    result = await materials_collection.insert_one(material.dict())
    
    if not result.inserted_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload material"
        )
    
    return material

# Get Team Materials
@router.get("/materials", response_model=List[TeamMaterial])
async def get_team_materials(
    current_team: dict = Depends(get_current_team),
    db: AsyncIOMotorDatabase = Depends()
):
    materials_collection = await get_materials_collection(db)
    
    # Get materials for current team
    materials = await materials_collection.find(
        {"team_id": current_team["team_id"]}
    ).sort("created_at", -1).to_list(None)
    
    return [TeamMaterial(**material) for material in materials]

# Delete Material
@router.delete("/materials/{material_id}")
async def delete_material(
    material_id: str,
    current_team: dict = Depends(get_current_team),
    db: AsyncIOMotorDatabase = Depends()
):
    materials_collection = await get_materials_collection(db)
    
    # Delete material (only if it belongs to current team)
    result = await materials_collection.delete_one({
        "id": material_id,
        "team_id": current_team["team_id"]
    })
    
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Material not found"
        )
    
    return {"message": "Material deleted successfully"}

# Get Public Team Profile (for course instructor display)
@router.get("/{team_id}/public", response_model=TeamProfile)
async def get_public_team_profile(team_id: str, db: AsyncIOMotorDatabase = Depends()):
    teams_collection = await get_team_collection(db)
    
    team_doc = await teams_collection.find_one({"id": team_id})
    if not team_doc or not team_doc.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )
    
    # Remove sensitive information
    team_doc.pop("password_hash", None)
    team_doc.pop("contact_email", None)  # Hide email in public view
    
    return TeamProfile(**team_doc)

# Contact Team
@router.post("/{team_id}/contact")
async def contact_team(
    team_id: str,
    contact_data: ContactTeamRequest,
    db: AsyncIOMotorDatabase = Depends()
):
    teams_collection = await get_team_collection(db)
    messages_collection = await get_messages_collection(db)
    
    # Verify team exists
    team_doc = await teams_collection.find_one({"id": team_id})
    if not team_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )
    
    # Create contact message
    message = TeamContactMessage(
        from_name=contact_data.from_name,
        from_email=contact_data.from_email,
        to_team_id=team_id,
        subject=contact_data.subject,
        message=contact_data.message,
        course_id=contact_data.course_id
    )
    
    # Insert message
    result = await messages_collection.insert_one(message.dict())
    
    if not result.inserted_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send message"
        )
    
    # TODO: Send email notification to team
    # This would require email service integration
    
    return {"message": "Message sent successfully to team"}

# Get Team Messages (for teams to see their messages)
@router.get("/messages", response_model=List[TeamContactMessage])
async def get_team_messages(
    current_team: dict = Depends(get_current_team),
    db: AsyncIOMotorDatabase = Depends()
):
    messages_collection = await get_messages_collection(db)
    
    messages = await messages_collection.find(
        {"to_team_id": current_team["team_id"]}
    ).sort("created_at", -1).to_list(None)
    
    return [TeamContactMessage(**message) for message in messages]

# Mark Message as Read
@router.put("/messages/{message_id}/read")
async def mark_message_read(
    message_id: str,
    current_team: dict = Depends(get_current_team),
    db: AsyncIOMotorDatabase = Depends()
):
    messages_collection = await get_messages_collection(db)
    
    result = await messages_collection.update_one(
        {"id": message_id, "to_team_id": current_team["team_id"]},
        {"$set": {"is_read": True}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )
    
    return {"message": "Message marked as read"}
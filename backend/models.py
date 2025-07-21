from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid
from enum import Enum

class SocialMediaLinks(BaseModel):
    instagram: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    youtube: Optional[str] = None

class TeamProfile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    team_name: str = Field(..., min_length=2, max_length=100)
    team_number: Optional[str] = None  # FRC team number like "7845"
    contact_email: EmailStr
    description: Optional[str] = Field(None, max_length=500)
    logo_url: Optional[str] = None  # Base64 encoded logo
    social_media: SocialMediaLinks = Field(default_factory=SocialMediaLinks)
    location: Optional[str] = None
    founded_year: Optional[int] = None
    website: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TeamAuth(BaseModel):
    team_name: str = Field(..., min_length=2, max_length=100)
    contact_email: EmailStr
    password: str = Field(..., min_length=6)
    team_number: Optional[str] = None

class TeamLogin(BaseModel):
    email: EmailStr
    password: str

class TeamToken(BaseModel):
    access_token: str
    token_type: str
    team_profile: TeamProfile

class MaterialType(str, Enum):
    DOCUMENT = "document"
    VIDEO = "video" 
    IMAGE = "image"
    PRESENTATION = "presentation"
    CODE = "code"
    OTHER = "other"

class TeamMaterial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    team_id: str
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    material_type: MaterialType
    file_data: str  # Base64 encoded file data
    file_name: str
    file_size: int  # Size in bytes
    mime_type: str
    is_public: bool = False  # Whether other teams can see this material
    tags: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Course(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=10, max_length=2000)
    category: str  # FRC Temelleri, Kodlama, Elektronik
    duration: str  # e.g., "2 saat"
    level: str  # Başlangıç, Orta, İleri
    image_url: str  # Course thumbnail
    instructor_team_id: Optional[str] = None  # Team that created this course
    content: Optional[str] = None  # Course content/curriculum
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TeamContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    from_name: str = Field(..., min_length=1, max_length=100)
    from_email: EmailStr
    to_team_id: str
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    course_id: Optional[str] = None  # If asking about specific course
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Request/Response models
class TeamRegistrationRequest(BaseModel):
    team_name: str = Field(..., min_length=2, max_length=100)
    team_number: Optional[str] = None
    contact_email: EmailStr
    password: str = Field(..., min_length=6)
    description: Optional[str] = Field(None, max_length=500)
    location: Optional[str] = None
    founded_year: Optional[int] = None
    website: Optional[str] = None

class TeamUpdateRequest(BaseModel):
    team_name: Optional[str] = Field(None, min_length=2, max_length=100)
    team_number: Optional[str] = None
    description: Optional[str] = Field(None, max_length=500)
    logo_data: Optional[str] = None  # Base64 encoded logo
    social_media: Optional[SocialMediaLinks] = None
    location: Optional[str] = None
    founded_year: Optional[int] = None
    website: Optional[str] = None

class MaterialUploadRequest(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    material_type: MaterialType
    file_data: str  # Base64 encoded file
    file_name: str
    mime_type: str
    is_public: bool = False
    tags: List[str] = Field(default_factory=list)

class ContactTeamRequest(BaseModel):
    from_name: str = Field(..., min_length=1, max_length=100)
    from_email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    course_id: Optional[str] = None
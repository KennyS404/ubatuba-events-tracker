from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: datetime
    location: str
    category: Optional[str] = "General"

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    location: Optional[str] = None
    category: Optional[str] = None

class EventResponse(EventBase):
    id: int
    creator_id: int
    image_content_type: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class TokenData(BaseModel):
    username: Optional[str] = None
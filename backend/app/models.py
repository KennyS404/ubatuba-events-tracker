from sqlalchemy import Column, Integer, String, Text, DateTime, LargeBinary, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    full_name = Column(String(100))
    hashed_password = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relação com eventos
    events = relationship("Event", back_populates="creator")

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    date = Column(DateTime(timezone=True), nullable=False)
    location = Column(String(200))
    category = Column(String(50), default="General")
    image_data = Column(LargeBinary, nullable=True) 
    image_content_type = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relacionamento com usuário
    creator_id = Column(Integer, ForeignKey("users.id"))
    creator = relationship("User", back_populates="events")
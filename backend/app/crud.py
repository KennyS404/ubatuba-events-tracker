from sqlalchemy.orm import Session
from . import models, schemas, auth
from fastapi import HTTPException, status
from typing import Optional

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    if get_user_by_username(db, user.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuário já cadastrado"
        )
    
    if get_user_by_email(db, user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já cadastrado"
        )
    
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        hashed_password=hashed_password
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

def get_events(
    db: Session, 
    skip: int = 0, 
    limit: int = 100, 
    search: Optional[str] = None,
    category: Optional[str] = None,
    user_id: Optional[int] = None
):
    query = db.query(models.Event)
    
    if search:
        query = query.filter(models.Event.title.ilike(f"%{search}%"))
    
    if category:
        query = query.filter(models.Event.category == category)
    
    if user_id:
        query = query.filter(models.Event.creator_id == user_id)
    

    query = query.order_by(models.Event.date.desc())
    
    return query.offset(skip).limit(limit).all()

def get_event(db: Session, event_id: int):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Evento não encontrado"
        )
    return event

def create_event(
    db: Session, 
    event: schemas.EventCreate, 
    user_id: int, 
    image_data: Optional[bytes] = None, 
    image_content_type: Optional[str] = None
):

    db_event = models.Event(
        **event.dict(),
        creator_id=user_id,
        image_data=image_data,
        image_content_type=image_content_type
    )
    
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    return db_event

def update_event(
    db: Session, 
    event_id: int, 
    event: schemas.EventUpdate, 
    user_id: int,
    image_data: Optional[bytes] = None, 
    image_content_type: Optional[str] = None
):
    db_event = get_event(db, event_id)
    
    if db_event.creator_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Você não tem permissão para editar este evento"
        )
    
    update_data = event.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_event, key, value)
    
    if image_data is not None:
        db_event.image_data = image_data
        db_event.image_content_type = image_content_type
    
    db.commit()
    db.refresh(db_event)
    
    return db_event

def delete_event(db: Session, event_id: int, user_id: int):
    db_event = get_event(db, event_id)
    
    if db_event.creator_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Você não tem permissão para excluir este evento"
        )
    
    db.delete(db_event)
    db.commit()
    
    return {"detail": "Evento removido com sucesso"}
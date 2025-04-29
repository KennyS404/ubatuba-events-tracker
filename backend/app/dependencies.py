from sqlalchemy.orm import Session
from . import database, models, auth
from fastapi import Depends, HTTPException, status

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(db: Session = Depends(get_db), token: str = Depends(auth.oauth2_scheme)):
    return auth.get_current_user(token=token, db=db)

def get_current_active_user(current_user: models.User = Depends(get_current_user)):
    return current_user
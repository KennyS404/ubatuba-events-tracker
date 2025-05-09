from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from . import schemas, models, database, config

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def verify_password(plain_password, hashed_password):
    return password_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return password_context.hash(password)

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=config.settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(
        to_encode, 
        config.settings.SECRET_KEY, 
        algorithm=config.settings.ALGORITHM
    )
    
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais inválidas",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(
            token, 
            config.settings.SECRET_KEY, 
            algorithms=[config.settings.ALGORITHM]
        )
        username: str = payload.get("sub")
        
        if username is None:
            raise credentials_exception
            
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
        
    user = db.query(models.User).filter(models.User.username == token_data.username).first()
    
    if user is None:
        raise credentials_exception
        
    return user
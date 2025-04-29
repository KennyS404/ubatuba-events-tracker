from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import schemas, models, crud, auth, dependencies, config

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
    responses={401: {"description": "Não autorizado"}},
)

@router.post("/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    """
    Registra um novo usuário no sistema.
    """
    return crud.create_user(db=db, user=user)

@router.post("/login", response_model=schemas.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(dependencies.get_db)
):
    """
    Obtém o token de acesso para autenticação.
    """
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nome de usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=config.settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@router.get("/me", response_model=schemas.UserResponse)
def read_users_me(current_user: models.User = Depends(dependencies.get_current_active_user)):
    """
    Retorna os dados do usuário autenticado.
    """
    return current_user
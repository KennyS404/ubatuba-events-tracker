from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form, Response
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from .. import schemas, models, crud, dependencies
import json
from datetime import datetime
from io import BytesIO

router = APIRouter(
    prefix="/api/events",
    tags=["events"],
)

@router.get("/", response_model=List[schemas.EventResponse])
def read_events(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(dependencies.get_db)
):
    """
    Retorna uma lista de eventos com opções de filtragem e paginação.
    """
    events = crud.get_events(db=db, skip=skip, limit=limit, search=search, category=category)
    return events

@router.get("/my", response_model=List[schemas.EventResponse])
def read_my_events(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
    category: Optional[str] = None,
    current_user: models.User = Depends(dependencies.get_current_active_user),
    db: Session = Depends(dependencies.get_db)
):
    """
    Retorna os eventos criados pelo usuário autenticado.
    """
    events = crud.get_events(
        db=db, 
        skip=skip, 
        limit=limit, 
        search=search, 
        category=category,
        user_id=current_user.id
    )
    return events

@router.get("/{event_id}", response_model=schemas.EventResponse)
def read_event(event_id: int, db: Session = Depends(dependencies.get_db)):
    """
    Retorna os detalhes de um evento específico.
    """
    event = crud.get_event(db=db, event_id=event_id)
    return event

@router.get("/{event_id}/image")
def get_event_image(event_id: int, db: Session = Depends(dependencies.get_db)):
    """
    Retorna a imagem de um evento específico.
    """
    event = crud.get_event(db=db, event_id=event_id)
    
    if not event.image_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Imagem não encontrada"
        )
    
    return StreamingResponse(
        BytesIO(event.image_data),
        media_type=event.image_content_type
    )

@router.post("/", response_model=schemas.EventResponse)
async def create_event(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    date: str = Form(...),
    location: str = Form(...),
    category: Optional[str] = Form("General"),
    image: Optional[UploadFile] = File(None),
    current_user: models.User = Depends(dependencies.get_current_active_user),
    db: Session = Depends(dependencies.get_db)
):
    """
    Cria um novo evento com possibilidade de upload de imagem.
    """
    try:

        event_date = datetime.fromisoformat(date)
        
        event_data = schemas.EventCreate(
            title=title,
            description=description,
            date=event_date,
            location=location,
            category=category
        )
        
        image_data = None
        image_content_type = None
        
        if image:
            image_data = await image.read()
            image_content_type = image.content_type
        
        # Cria o evento
        event = crud.create_event(
            db=db, 
            event=event_data, 
            user_id=current_user.id,
            image_data=image_data,
            image_content_type=image_content_type
        )
        
        return event
    
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Formato de data inválido. Use o formato ISO (YYYY-MM-DDTHH:MM:SS)"
        )

@router.put("/{event_id}", response_model=schemas.EventResponse)
async def update_event(
    event_id: int,
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    date: Optional[str] = Form(None),
    location: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    current_user: models.User = Depends(dependencies.get_current_active_user),
    db: Session = Depends(dependencies.get_db)
):
    """
    Atualiza um evento existente.
    """
    event_data = schemas.EventUpdate()
    
    if title is not None:
        event_data.title = title
    
    if description is not None:
        event_data.description = description
    
    if date is not None:
        try:
            event_data.date = datetime.fromisoformat(date)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Formato de data inválido. Use o formato ISO (YYYY-MM-DDTHH:MM:SS)"
            )
    
    if location is not None:
        event_data.location = location
    
    if category is not None:
        event_data.category = category
    
    image_data = None
    image_content_type = None
    
    if image:
        image_data = await image.read()
        image_content_type = image.content_type
    
    event = crud.update_event(
        db=db, 
        event_id=event_id, 
        event=event_data, 
        user_id=current_user.id,
        image_data=image_data,
        image_content_type=image_content_type
    )
    
    return event

@router.delete("/{event_id}")
def delete_event(
    event_id: int,
    current_user: models.User = Depends(dependencies.get_current_active_user),
    db: Session = Depends(dependencies.get_db)
):
    """
    Remove um evento existente.
    """
    return crud.delete_event(db=db, event_id=event_id, user_id=current_user.id)
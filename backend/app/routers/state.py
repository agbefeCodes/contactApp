from fastapi import Depends, HTTPException, status, APIRouter, Response
from fastapi.params import List

from .. import schemas
from ..db import get_db
from .. import models, crud, oauth
from sqlalchemy.orm import Session

router = APIRouter(prefix="/states")


@router.post("/", response_model=schemas.State)
def new_state(
    state: schemas.StateCreate,
    db: Session = Depends(get_db),
    
):
    return crud.create_state(state, db)


@router.get("/", response_model=List[schemas.State])
def get_states(
    db: Session = Depends(get_db)
):
    return crud.get_all_states(db)


@router.get("/{id}", response_model=schemas.State)
def get_state(
    id: int,
    db: Session = Depends(get_db),
    
):
    return crud.get_state_by_id(id, db)


@router.get("/all/{countryId}", response_model=List[schemas.State])
def get_state(
    countryId: int,
    db: Session = Depends(get_db),
    
):
    return crud.get_all_states_by_countryId(countryId, db)

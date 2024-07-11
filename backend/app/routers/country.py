from fastapi import Depends, HTTPException, status, APIRouter, Response
from fastapi.params import List

from .. import schemas
from ..db import get_db
from .. import models, crud, oauth
from sqlalchemy.orm import Session


router = APIRouter(prefix="/countries")


@router.post("/", response_model=schemas.Country)
def new_country(
    country: schemas.CountryCreate,
    db: Session = Depends(get_db),
):
   
    return crud.create_country(country, db)


@router.get("/")
def get_countries(
    db: Session = Depends(get_db),
):
   
    return crud.get_countries(db)


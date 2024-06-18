from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..db import get_db
from .. import oauth
from .. import models
from .. import schemas
from passlib.hash import bcrypt

router = APIRouter(prefix="/activate")


@router.put("/")
def activate_user(activate: schemas.User, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == activate.email)

    if not user.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact with email:{activate.email} not found!!",
        )
    if not user.first().verify_password(activate.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials"
        )
    activate.isActive = True
    activate.password = user.first().password
    user.update(activate.model_dump(), synchronize_session=False)
    db.commit()
    db.refresh(user.first())
    return {"message": "Activation Successful"}

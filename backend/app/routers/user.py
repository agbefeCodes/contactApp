import fastapi as _fa
import fastapi.security as _security
import sqlalchemy.orm as _orm

from .. import models
from .. import schemas
from ..db import get_db
from .. import crud
from passlib.hash import bcrypt
from .. import oauth

router = _fa.APIRouter(prefix="/user")
# response_model=schemas.Token


@router.post("/register")
def create_user(user: schemas.UserCreate, db: _orm.Session = _fa.Depends(get_db)):
    return crud.user_create(user, db)


# user_details: _security.OAuth2PasswordRequestForm = _fa.Depends()
@router.post("/login", response_model=schemas.Token)
def user_login(
    user_details: schemas.Login,
    db: _orm.Session = _fa.Depends(get_db),
    # user_id: int = _fa.Depends(oauth.get_current_user)
):
    return crud.user_login(user_details, db)


# @router.put("/activate/")
# def activate_user(
#     activate: schemas.Activate, db: _orm.Session = _fa.Depends(get_db)
# ):
#     print(activate)
#     return crud.activate_user(activate, db)


@router.put("/change_password")
def reset_password(
    user_details: schemas.Login,
    db: _orm.Session = _fa.Depends(get_db),
    # id: int = _fa.Depends(oauth.get_current_user),
):
    return crud.change_password(
        user_details=user_details, db=db
    )


@router.post("/forgot_password")
def forgot_password(username: schemas.Email, db: _orm.Session = _fa.Depends(get_db)):
    return crud.forgot_password(username, db)


@router.put("/forgot_password/validate{token}")
def validate_token(token: str, db: _orm.Session = _fa.Depends(get_db)):
    return crud.validate_url_token(
        token=token,
        db=db,
    )


from fastapi import (
    Depends,
    File,
    Form,
    UploadFile,
    APIRouter,
)
from fastapi.params import List
from sqlalchemy import JSON

from .. import oauth
from .. import schemas
from ..db import get_db
from .. import crud
from sqlalchemy.orm import Session
import json

# from .key_config import keys

router = APIRouter(prefix="/contacts")




@router.get("/", response_model=List[schemas.Contact])
def get_contacts(
    db: Session = Depends(get_db), user_id: int = Depends(oauth.get_current_user)
):
    return crud.get_all_contacts(user_id, db)


# @router.post("/image_upload")
# async def upload_contact_image(file: UploadFile = File(...)):
#     await s3.upload_fileobj(file.file, BUCKET_NAME, file.filename)
#     return {"success": "file uploaded"}


#  user_id: int = Depends(oauth.get_current_user),
# response_model=schemas.Contact
@router.post("/")
async def create_contact(
    firstname: str = Form(...),
    lastname: str = Form(...),
    email: str = Form(...),
    file: UploadFile = File(...),
    countryId: int = Form(...),
    stateId: int = Form(...),
    mobile: str = Form(...),
    user_id: int = Depends(oauth.get_current_user),
    db: Session = Depends(get_db),
):
    # if file:
    #     bucket = s3.Bucket(S3_BUCKET_NAME)
    #     bucket.upload_fileobj(
    #         file.file, file.filename, ExtraArgs={"ACL": "public-read"}
    #     )

    # img = f"https://{S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/{file.filename}"

    contact = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "mobile": mobile,
        "stateId": stateId,
        "countryId": countryId,
        "imgURL": img,
        "imgName": file.filename,
    }
    return crud.create_contact(contact, user_id, db)


# @router.get('/img')
# def get_contact_img(db:Session=Depends(get_db)):
#     ...


@router.get("/{id}")
def get_contact(
    id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(oauth.get_current_user),
):
    return crud.get_contact_details(id, db)


@router.put("/{contact_id}")
def update_contact(
    contact_id: int,
    edit: schemas.ContactCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(oauth.get_current_user),
):
    return crud.edit_contact(contact_id=contact_id, edit=edit, db=db)


@router.delete("/{id}")
def delete_contact(
    id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(oauth.get_current_user),
):
    return crud.delete_contact(id, user_id, db)

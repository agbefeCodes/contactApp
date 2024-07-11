from fastapi import Depends, File, Form, UploadFile, APIRouter
from fastapi.params import List

from .. import oauth
from .. import schemas
from ..db import get_db
from .. import crud
from sqlalchemy.orm import Session
import os


router = APIRouter(prefix="/contacts")


@router.get("/", response_model=List[schemas.Contact])
def get_contacts(
    db: Session = Depends(get_db), user_id: int = Depends(oauth.get_current_user)
):
    print('Im here')
    return crud.get_all_contacts(user_id, db)


# @router.post("/image_upload")
# async def upload_contact_image(file: UploadFile = File(...)):
#     await s3.upload_fileobj(file.file, BUCKET_NAME, file.filename)
#     return {"success": "file uploaded"}


#  user_id: int = Depends(oauth.get_current_user),
# response_model=schemas.Contact


NEW_DIR = "../images"
os.makedirs(NEW_DIR, exist_ok=True)


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

    if file.size > 0:
        contents = await file.read()
        with open(os.path.join(NEW_DIR, file.filename), "wb") as f:
            f.write(contents)

    contact = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "mobile": mobile,
        "stateId": stateId,
        "countryId": countryId,
        "imgURL": f"{NEW_DIR}/{file.filename}",
    }
    
    return crud.create_contact(contact, user_id, db)


@router.put("/{contact_id}")
async def update_contact(
    contact_id: int,
    firstname: str = Form(...),
    lastname: str = Form(...),
    mobile: str = Form(...),
    email: str = Form(...),
    file: UploadFile = File(...),
    stateId: int = Form(...),
    countryId: int = Form(...),
    imgURL: str = Form(...),
    user_id: int = Depends(oauth.get_current_user),
    db: Session = Depends(get_db)
):
    # print(mobile)
    if file.size > 0:
        contents = await file.read()
        with open(os.path.join(NEW_DIR, file.filename), "wb") as f:
            f.write(contents)
        imgURL = f"{NEW_DIR}/{file.filename}"
    # print('Im here')
    new_details = {
        "firstname": firstname,
        "lastname": lastname,
        "mobile": mobile,
        "email": email,
        "imgURL": imgURL,
        "stateId": stateId,
        "countryId": countryId,
    }
    print(new_details)

    return crud.update_contact(contact_id, new_details, user_id, db)


@router.put("/update_img/{contact_id}")
async def update_contact_img(
    contact_id: int,
    file: UploadFile = File(...),
    user_id: int = Depends(oauth.get_current_user),
    db: Session = Depends(get_db),
):

    if file:
        contents = await file.read()
        with open(os.path.join(NEW_DIR, file.filename), "wb") as f:
            f.write(contents)

    new_img = {"imgURL": f"{NEW_DIR}/{file.filename}"}
    print(new_img)
    return crud.update_contact_img(contact_id, new_img, user_id, db)


@router.delete("/{id}")
def delete_contact(
    id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(oauth.get_current_user),
):
    return crud.delete_contact(id, user_id, db)


@router.get("/{id}")
def get_contact(
    id: int,
    db: Session = Depends(get_db),
    user_id: int = Depends(oauth.get_current_user),
):
    return crud.get_contact_details(id, db)

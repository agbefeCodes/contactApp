import json


from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session
from passlib.hash import bcrypt

from .db import get_db

from . import schemas
from . import models, oauth


# COUNTRY  *************************


def validate_url_token(token: str, db: Session):
    supplied_token = db.query(models.Tokens).filter(models.Tokens.token == token)

    if not supplied_token.first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

    if supplied_token.first().used:
        raise HTTPException(
            status_code=status.HTTP_226_IM_USED, detail="URL has expired"
        )

    supplied_token.update(used=True, synchronize_session=False)
    db.commit()
    db.refresh(supplied_token)

    return {"result": True}


def create_country(country: schemas.CountryCreate, db: Session):
    country_exists = (
        db.query(models.Country).filter(models.Country.name == country.name).first()
    )
    if country_exists:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Can only have one instance of Country!!\n country:{country.name} already exists",
        )
    new_country = models.Country(**country.model_dump())
    db.add(new_country)
    db.commit()
    db.refresh(new_country)
    return new_country


def get_countries(db: Session):
    return db.query(models.Country).all()


# STATES ************************   *************************
def create_state(state, db: Session):
    state_query = db.query(models.State).filter(models.State.name == state.name).first()
    if state_query:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Can only have one instance of State!!\n sate:{state.name} already exists",
        )
    new_state = models.State(**state.model_dump())
    db.add(new_state)
    db.commit()
    db.refresh(new_state)
    return new_state


def get_all_states(db: Session):
    states = db.query(models.State).all()
    if len(states) < 1:
        raise HTTPException(
            status_code=status.HTTP_204_NO_CONTENT, detail="State List is Empty"
        )
    return states


def get_all_states_by_countryId(id, db: Session):
    states = db.query(models.State).filter(models.State.countryId == id).all()
    if len(states) < 1:
        raise HTTPException(
            status_code=status.HTTP_204_NO_CONTENT, detail="State List is Empty"
        )
    return states


def get_state_by_id(id: int, db: Session):
    state = db.query(models.State).filter(models.State.id == id).first()
    if not state:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"State with id:{id} not found!!",
        )
    return state


# def delete_state(id: int, db: Session):
#     state = db.query(models.State).filter(models.State.id == id).first()
#     if not state:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"State with id:{id} not found!!",
#         )
#     db.delete(state)
#     db.commit()

# CONTACT ************************** ******************************************


def create_contact(contact, user_id, db: Session):
    # contact_query = (
    #     db.query(models.Contact)
    #     .filter(
    #         models.Contact.email == contact["email"]
    #         and models.Contact.ownerId == user_id
    #     )
    #     .first()
    # )
    contact_query = (
        db.query(models.Contact).filter(models.Contact.ownerId == user_id).all()
    )
    contacts = [
        {"email": contacts.email}
        for contacts in contact_query
        if contacts.email == contact["email"]
    ]
    print("Im here")

    if len(contacts) > 0:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Can only have one instance of Contact!!\n contact with email {contact['email']} already exists",
        )

    # if contact_query:
    #     raise HTTPException(
    #         status_code=status.HTTP_403_FORBIDDEN,
    #         detail=f"Can only have one instance of Contact!!\n contact with email {contact['email']} already exists",
    #     )

    new_contact = models.Contact(
        firstname=contact["firstname"],
        lastname=contact["lastname"],
        email=contact["email"],
        mobile=contact["mobile"],
        ownerId=user_id,
        imgURL=contact["imgURL"],
        stateId=contact["stateId"],
        countryId=contact["countryId"],
    )
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    print("Im here")
    return new_contact


def get_contact_details(id: int, db: Session):
    contact = db.query(models.Contact).filter(models.Contact.id == id).first()

    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact with id:{id} not found!!",
        )

    contact_details = {
        "id": contact.id,
        "firstname": contact.firstname,
        "lastname": contact.lastname,
        "email": contact.email,
        "mobile": contact.mobile,
        "stateId": contact.state.id,
        "state": contact.state.name,
        "countryId": contact.state.countryId,
        "country": contact.country.name,
        "imgURL": contact.imgURL,
        "ownerId": contact.ownerId,
    }
    return contact_details


def get_all_contacts(user_id, db: Session):
    contact_list = (
        db.query(models.Contact).filter(models.Contact.ownerId == user_id).all()
    )

    if contact_list == None:
        raise HTTPException(
            status_code=status.HTTP_204_NO_CONTENT, detail="Contact List is Empty"
        )

    contacts = [
        {
            "id": contact.id,
            "firstname": contact.firstname,
            "lastname": contact.lastname,
            "email": contact.email,
            "mobile": contact.mobile,
            "stateId": contact.stateId,
            "state": contact.state.name,
            "countryId": contact.country.id,
            "country": contact.country.name,
            "imgURL": contact.imgURL,
            "ownerId": contact.ownerId,
        }
        for contact in contact_list
    ]

    return contacts


def update_contact(contact_id, new_details, user_id, db: Session):
    contact = db.query(models.Contact).filter(
        models.Contact.id == contact_id and models.Contact.ownerId == user_id
    )

    if not contact.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact with id:{user_id} not found!!",
        )

    contact.update(new_details, synchronize_session=False)
    db.commit()
    db.refresh(contact.first())
    return contact.first()


def update_contact_img(contact_id, new_image, user_id, db: Session):
    contact = db.query(models.Contact).filter(
        models.Contact.id == contact_id and models.Contact.ownerId == user_id
    )

    if not contact.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact with id:{user_id} not found!!",
        )

    contact.update(
        new_image,
        synchronize_session=False,
    )
    db.commit()
    db.refresh(contact.first())
    return


def delete_contact(id: int, user_id, db: Session):
    contact = (
        db.query(models.Contact)
        .filter(models.Contact.id == id and models.Contact.ownerId == user_id)
        .first()
    )
    if contact == None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Current User can not delete this contact",
        )
    db.delete(contact)
    db.commit()


# USERS ***********************  ******************************


def user_create(user, db: Session):
    # unhashed_password = user.password
    hashed_password = bcrypt.hash(user.password)
    user.password = hashed_password
    user_query = db.query(models.User).filter(models.User.email == user.email).first()

    if user_query:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"user with email: {user.email} already exists",
        )
    role = db.query(models.Role).filter(models.Role.name == "member").first()
    new_user = models.User(**user.model_dump())

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    new_user_role = models.UserRole(user_id=new_user.id, role_id=role.id)
    db.add(new_user_role)
    db.commit()
    db.refresh(new_user_role)

    # hashedUserId = bcrypt.hash(str(new_user.id))
    # random_token = generate_random_token()
    # token = models.Tokens(token=random_token, user_id=new_user.id)
    # db.add(token)
    # db.commit()
    # db.refresh(token)
    # link = f"http://localhost:5173/activation/{random_token}"
    # SEND EMAIL TO NEW USER....
    # _mchimp.add_user(user)
    # _mchimp.add_user(new_user)
    # _mchimp.customized_template_activate_account(link)
    # _mchimp.send_mail_account_activate(new_user.email)
    # _mchimp.add_user(user)
    # access_token = oauth.create_access_token(data={"user_id": new_user.id})

    return {"message": "registration was successful"}


def user_login(user_details, db: Session):
    login_query = db.query(models.User).filter(models.User.email == user_details.email)
    user = login_query.first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials"
        )

    if not user.verify_password(user_details.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Credentials",
        )
    # if not user.isActive:
    #     raise HTTPException(
    #         status_code=status.HTTP_423_LOCKED, detail="Account Activation Required"
    #     )

    access_token = oauth.create_access_token(data={"user_id": user.id})

    return {
        "user": user.firstname,
        "access_token": access_token,
        "token_type": "bearer",
    }


# def activate_user(activate, db: Session):
#     user = db.query(models.User).filter(models.User.email == activate.email)

#     if not user.first():
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"Contact with email:{activate.email} not found!!",
#         )

#     if not user.first().verify_password(activate.password):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials"
#         )

#     activate.isActive = True
#     activate.password = user.first().password
#     user.update(activate.model_dump(), synchronize_session=False)
#     db.commit()
#     db.refresh(user.first())

#     return {"message": "Activation Successful"}


def change_password(user_details, db: Session):

    user = db.query(models.User).filter(models.User.email == user_details.email)

    hashed_password = bcrypt.hash(user_details.password)
    user_details.password = hashed_password

    if not user.first():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"user with email {user_details.email} not found",
        )
    user.update(user_details.model_dump(), synchronize_session=False)
    db.commit()
    db.refresh(user.first())

    return {"message": "Password change successful"}


def forgot_password(username, db: Session):
    email = username.email
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"The Email:{email} not found",
        )
    random_token = generate_random_token()
    token = models.Tokens(token=random_token, user_id=user.id)
    db.add(token)
    db.commit()
    db.refresh(token)
    link = f"http://localhost:3000/change-password/{user.id}/{random_token}"
    _mchimp.customized_template_forgot_password(link)
    _mchimp.send_mail_for_password_reset(email)
    return {
        "message": f"If you have registered with this email, you will receive an email at {email}"
    }

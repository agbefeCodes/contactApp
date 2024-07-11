from typing import Optional
from fastapi import File, UploadFile
import pydantic as _pyd


class CountryBase(_pyd.BaseModel):
    name: str


class CountryCreate(CountryBase):
    pass


class Country(CountryBase):
    id: int

    class Config:
        from_attributes = True


class StateBase(_pyd.BaseModel):
    name: str
    countryId: int


class StateCreate(StateBase):
    pass


class State(StateBase):
    id: int

    class Config:
        from_attributes = True


class ContactBase(_pyd.BaseModel):
    firstname: str
    lastname: str
    mobile: str | None = None
    email: _pyd.EmailStr
    stateId: int
    countryId: int
    imgURL: UploadFile | str | None = None


class ContactCreate(ContactBase):
    pass


class ContactUpdate(ContactBase):
    imgName: str | None = None


class Contact(ContactBase):
    ownerId: int
    state: str
    country: str
    id: int

    class Config:
        from_attributes = True


class ImgUpdate(_pyd.BaseModel):
    imgURL: str


class Img(ImgUpdate): ...


# class ContactRes(Contact):

#     class Config:
#         from_attributes = True


class UserBase(_pyd.BaseModel):
    firstname: str
    lastname: str
    email: _pyd.EmailStr
    password: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    isActive: bool | None = None

    class Config:
        from_attributes = True


class UserLogin(_pyd.BaseModel):
    email: _pyd.EmailStr
    password: str


class Login(UserLogin):
    pass


class Token(_pyd.BaseModel):
    access_token: str
    token_type: str
    user: str


class TokenData(_pyd.BaseModel):
    id: Optional[int] = None


class Role(_pyd.BaseModel):
    name: str


class ActivateBase(_pyd.BaseModel):
    email: str
    password: str
    isActive: bool | None = None


class Activate(ActivateBase):
    pass


class Email(_pyd.BaseModel):
    email: _pyd.EmailStr

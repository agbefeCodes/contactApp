from typing import Optional
from .db import Base
from passlib.hash import bcrypt
import sqlalchemy as _sql
import sqlalchemy.orm as _orm
from .db import SessionLocal
from sqlalchemyseeder import basic_seeder


# db=_orm.Session()
db = SessionLocal()
seeder = basic_seeder.BasicSeeder


# def initialize_table(db: _orm.Session):
#     dbQuery = (
#         db.query(Role).filter(Role.name == "Admin" or Role.name == "Member").first()
#     )
#     if dbQuery == None:
#         admin = Role(name="Admin")
#         member = Role(name="Member")
#         db.add_all([admin, member])
#         db.commit()
#         db.close()


# class Tokens(Base):
#     __tablename__ = "tokens"
#     id: _orm.Mapped[int] = _orm.mapped_column(primary_key=True)
#     token: _orm.Mapped[str] = _orm.mapped_column(nullable=False, unique=True)
#     used: _orm.Mapped[bool] = _orm.mapped_column(
#         nullable=False, server_default=_sql.sql.expression.false()
#     )
#     user_id: _orm.Mapped[int]= _orm.mapped_column(nullable=False)


class Country(Base):
    __tablename__ = "countries"
    id: _orm.Mapped[int] = _orm.mapped_column(primary_key=True, nullable=False)
    name: _orm.Mapped[str] = _orm.mapped_column(nullable=False)
    state: _orm.Mapped["State"] = _orm.relationship(back_populates="country")
    contact: _orm.Mapped["Contact"] = _orm.relationship(back_populates="country")


class State(Base):
    __tablename__ = "states"
    id: _orm.Mapped[int] = _orm.mapped_column(primary_key=True, nullable=False)
    name: _orm.Mapped[str] = _orm.mapped_column(nullable=False)
    countryId: _orm.Mapped[int] = _orm.mapped_column(
        _sql.ForeignKey("countries.id", ondelete="CASCADE")
    )
    country: _orm.Mapped["Country"] = _orm.relationship(back_populates="state")
    contact: _orm.Mapped["Contact"] = _orm.relationship(back_populates="state")


class Contact(Base):
    __tablename__ = "contacts"

    id: _orm.Mapped[int] = _orm.mapped_column(primary_key=True, nullable=False)
    firstname: _orm.Mapped[str] = _orm.mapped_column(nullable=False)
    lastname: _orm.Mapped[str] = _orm.mapped_column(nullable=False)
    mobile: _orm.Mapped[Optional[str | None]] = _orm.mapped_column(server_default=None)
    email: _orm.Mapped[str] = _orm.mapped_column(nullable=False)
    stateId: _orm.Mapped[int] = _orm.mapped_column(
        _sql.ForeignKey("states.id", ondelete="CASCADE"), nullable=False
    )
    countryId: _orm.Mapped[int] = _orm.mapped_column(
        _sql.ForeignKey("countries.id", ondelete="CASCADE"), nullable=False
    )
    imgURL: _orm.Mapped[Optional[str | None]] = _orm.mapped_column(server_default=None)
    ownerId: _orm.Mapped[int] = _orm.mapped_column(
        _sql.ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    state: _orm.Mapped["State"] = _orm.relationship(back_populates="contact")
    country: _orm.Mapped["Country"] = _orm.relationship(back_populates="contact")
    owner: _orm.Mapped["User"] = _orm.relationship(back_populates="contact")


class User(Base):
    __tablename__ = "users"
    id: _orm.Mapped[int] = _orm.mapped_column(primary_key=True, nullable=False)
    firstname: _orm.Mapped[str] = _orm.mapped_column(nullable=False)
    lastname: _orm.Mapped[str] = _orm.mapped_column(nullable=False)
    email: _orm.Mapped[str] = _orm.mapped_column(nullable=False, unique=True)
    password: _orm.Mapped[str] = _orm.mapped_column(nullable=False)
    # isActive: _orm.Mapped[bool] = _orm.mapped_column(
    #     server_default=_sql.sql.expression.false(), nullable=False
    # )
    contact: _orm.Mapped["Contact"] = _orm.relationship(back_populates="owner")
    userrole: _orm.Mapped["UserRole"] = _orm.relationship(back_populates="user")

    def verify_password(self, pwd: str):
        return bcrypt.verify(pwd, self.password)


class UserRole(Base):
    __tablename__ = "user_roles"
    id: _orm.Mapped[int] = _orm.mapped_column(primary_key=True, nullable=False)
    user_id: _orm.Mapped[int] = _orm.mapped_column(
        _sql.ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    role_id: _orm.Mapped[int] = _orm.mapped_column(
        _sql.ForeignKey("roles.id", ondelete="CASCADE"), nullable=False
    )
    user: _orm.Mapped["User"] = _orm.relationship(back_populates="userrole")
    role: _orm.Mapped["Role"] = _orm.relationship(back_populates="userrole")


class Role(Base):
    __tablename__ = "roles"
    id: _orm.Mapped[int] = _orm.mapped_column(primary_key=True, nullable=False)
    name: _orm.Mapped[str] = _orm.mapped_column(nullable=False, unique=True)
    userrole: _orm.Mapped["UserRole"] = _orm.relationship(back_populates="role")


INITIAL_DATA = [
    {"name": "admin"},
    {"name": "member"},
]

admin = seeder.entity_from_dict(INITIAL_DATA[0], Role)
member = seeder.entity_from_dict(INITIAL_DATA[1], Role)


def initialize_roles_table():
    db = SessionLocal()
    dbQuery = (
        db.query(Role).filter(Role.name == "admin" or Role.name == "member").first()
    )
    if dbQuery == None:
        db.add_all([admin, member])
        db.commit()
        db.close()

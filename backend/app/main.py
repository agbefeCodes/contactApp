# import time
# import psycopg
# from psycopg.rows import dict_row
from fastapi import FastAPI
import fastapi.middleware.cors as _cors
from . import models
from .db import engine
from .routers import contact, country, state, user,activate


app = FastAPI()


@app.on_event("startup")
def configure():
    models.Base.metadata.create_all(bind=engine)
    models.initialize_roles_table()



app.include_router(contact.router)
app.include_router(country.router)
app.include_router(state.router)
app.include_router(user.router)
app.include_router(activate.router)

origins = ["*"]
app.add_middleware(
    _cors.CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)







# while True:
#     try:
#         conn = psycopg.connect(
#             host="localhost",
#             dbname="contactapp",
#             user="postgres",
#             password="kananga",
#             row_factory=dict_row,
#         )
#         cur = conn.cursor()
#         break
#     except Exception as error:
#         print("Connecting to database failed")
#         print(error)
#         time.sleep(2)

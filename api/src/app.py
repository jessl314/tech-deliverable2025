from contextlib import asynccontextmanager
from datetime import datetime
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)

# endpoint to process a quote submission
@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)

# START EDITING HERE!!---------------------------
# TODO: add another API route with a query parameter to retrieve quotes based on max age

@app.get("/retrieve", response_model=list[Quote])
def get_quotes():
    """
    API route to obtain quotes from the database.
    - need to add query parameter to indicate the max age of quotes to return
    - on the frontend, need a select menu for options to view quotes from last week, month year, or all
    
    """
    # currently: gets quotes in the database under the quote key
    #  and then returns a list of them or an empty list if there is none
    quotes_data = database.get("quotes", [])
    return quotes_data
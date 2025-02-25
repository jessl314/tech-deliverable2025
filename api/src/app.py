from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import AsyncIterator

from fastapi import FastAPI, Form, status, Query
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
async def get_quotes(
    max_age: int = Query(None, description="max age of quotes")):

    """
    API route to obtain quotes from the database.
    - on the frontend, need a select menu for options to view quotes from 
    last week, month year, or all
    
    """
    
    quotes_data: list[Quote] = database.get("quotes", [])

    if max_age is not None:
        # cutoff age means the time that is exactly max_age days away from now
        cutoff_age = datetime.now() - timedelta(days = max_age)
        filter_quotes = []
        # loop through the Quote objects and try to convert the time from iso string to a datetime object in order to compare ages
        for quote in quotes_data["quotes"]:
            try:
                quote_time = datetime.fromisoformat(quote['time'])
            except ValueError:
                continue
            # if the age of the quote is less than the cutoff_age (the date comes after the cutoff date) we append
            if quote_time >= cutoff_age:
                filter_quotes.append(quote)
        return filter_quotes
    # just return all quotes as a default
    return quotes_data


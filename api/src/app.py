from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from typing import AsyncIterator

from fastapi import FastAPI, Form, status, Query
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase

from fastapi.middleware.cors import CORSMiddleware




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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


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

def get_cutoff_age(max_age: str) -> datetime:
    """
    calculates the cutoff age that a quote can be in order to be displayed.

    takes month length variation and leap years into consideration.
    
    """
    now = datetime.now()
    if max_age == "all":
        return None
    elif max_age == "week":
        return now - timedelta(weeks=1)
    elif max_age == "month":
        return now - relativedelta(months=1)
    elif max_age == "year":
        return now - relativedelta(years=1)
    else:
        raise ValueError("Invalid time range")

@app.get("/retrieve", response_model=list[Quote])
async def get_quotes(
    max_age: str = Query(None, description="max age of quotes")):
    """
    API route to obtain quotes from the database.
    - on the frontend, need a select menu for options to view quotes from 
    last week, month year, or all
    
    """
    quotes_data: list[Quote] = database.get("quotes", [])
    # print(quotes_data)

    if max_age is not None:
        # cutoff age means the time that is exactly max_age days away from now
        cutoff_age = get_cutoff_age(max_age)
        if cutoff_age is None:
            return {"quotes": quotes_data}
        filter_quotes = []
        # loop through the Quote objects
        # and try to convert the time
        # from iso string to a datetime object
        # in order to compare ages
        for quote in quotes_data:
            try:
                quote_time = datetime.fromisoformat(quote['time'])
                print(quote_time)
            except ValueError:
                continue
            # if the age of the quote is less
            # than the cutoff_age
            # (the date comes after the cutoff date) we append
            print(cutoff_age)
            if quote_time >= cutoff_age:
                filter_quotes.append(quote)
        print(filter_quotes)
        return filter_quotes
    # just return all quotes as a default
    return quotes_data

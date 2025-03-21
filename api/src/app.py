from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from typing import AsyncIterator

from fastapi import FastAPI, Form, status, Query
from fastapi.responses import RedirectResponse, JSONResponse
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
    allow_origins=["*"],  # Allow frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# endpoint to process a quote submission
@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> JSONResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    return JSONResponse(content={"message": "quote submission successful", "quote": quote})

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

    """
    quotes_data: list[Quote] = database.get("quotes", [])
    # print(quotes_data)

    if max_age is not None:
        # cutoff age means the time that is exactly max_age days away from now
        cutoff_age = get_cutoff_age(max_age)
        if cutoff_age is None:
            return quotes_data
        filter_quotes = []
        # converts each quotes time from isoformat to datetime format in order to compare times accurately
        for quote in quotes_data:
            try:
                quote_time = datetime.fromisoformat(quote['time'])
            except ValueError:
                continue
            # if the quote_time date comes after cutoff_date, append
            if quote_time >= cutoff_age:
                filter_quotes.append(quote)
        # print(filter_quotes)
        return filter_quotes
    # just return all quotes as a default
    return quotes_data

import "./App.css";
import React, {useEffect, useState} from 'react';
import QuoteFilter from "./components/QuoteFilter";
import FetchQuotes from "./components/FetchQuotes";
import FormatDateTime from "./components/FormatDateTime";

function App() {

	// filter refers to the option the use selects for viewing previous quotes: Choose, week, year, month, all
	const [filter, setFilter] = useState("all");
	const handleFilterChange = (newFilter) => {
		setFilter(newFilter);
	};

	const[quotes, setQuotes] = useState([]);
    
	// this use affect sets the correct set of quotes based on the filter keyword
	useEffect(() => {
		if (filter !== "") {
		const fetchData = async () => {
			const fetchedQuotes = await FetchQuotes(filter);
			setQuotes(fetchedQuotes)
	};
	fetchData();
}
    }, [filter]);

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form action="/api/quote" method="post">
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
			</form>

			<QuoteFilter selectedOption={filter}onFilterChange={handleFilterChange}/>
	
			<h2>Previous Quotes</h2>
			<div className="messages">
				{quotes.length > 0 ? (
                    <ul>
                        {quotes.map((quote, index) => (
                            <li key={index}>
                                "{quote.message}" - {quote.name}, {FormatDateTime(quote.time)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No quotes available</p>
                )}
				
			</div>
		</div>
	);
}

export default App;
import "./App.css";
import React, {useEffect, useState} from 'react';
import QuoteFilter from "./components/QuoteFilter";
import FetchQuotes from "./components/FetchQuotes";
import FormatDateTime from "./components/FormatDateTime";
import FormSubmission from "./components/FormSubmission";

function App() {

	// filter refers to the option the use selects for viewing previous quotes: Choose, week, year, month, all
	const [filter, setFilter] = useState("all");
	const handleFilterChange = (newFilter) => {
		setFilter(newFilter);
	};

	const[quotes, setQuotes] = useState([]);
    
	// this use effect sets the correct set of quotes based on the filter keyword
	useEffect(() => {
		if (filter !== "") {
		const fetchData = async () => {
			const fetchedQuotes = await FetchQuotes(filter);
			setQuotes(fetchedQuotes)
			console.log(fetchedQuotes)
	};
	fetchData();
}
    }, [filter]);

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>
			<FormSubmission refreshQuotes={() => setFilter(filter)}/>
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
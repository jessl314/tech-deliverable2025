import "./App.css";
import React, {useEffect, useState} from 'react';
import QuoteFilter from "./components/QuoteFilter";
import FetchQuotes from "./components/FetchQuotes";
import FormatDateTime from "./components/FormatDateTime";
import FormSubmission from "./components/FormSubmission";
import logo from "./assets/quotebook.png";
import { Button } from "@radix-ui/themes";

function App() {

	// filter refers to the option the use selects for viewing previous quotes: Choose, week, year, month, all
	const [filter, setFilter] = useState("");
	const handleFilterChange = (newFilter) => {
		setFilter(newFilter);
	};

	const[quotes, setQuotes] = useState([]);
    
	// this arrow function sets the correct set of quotes based on the filter keyword
	const fetchData = async () => {
			const fetchedQuotes = await FetchQuotes(filter);
			setQuotes(fetchedQuotes)
	}
	// this useEffect executes fetchData 
	// when the menu selection is not Choose, we fetch the corresponding quotes
	// else set quotes to empty list -> displays "No quotes available"
	useEffect(() => {
		if (filter !== "") {
			fetchData();
		} else {
			setQuotes([]);
		}
	
    }, [filter]);

	// arrow function that explicitly fetches data. used to force a refetch of data after quote submission
	const handleQuoteSubmit = () => {
		fetchData();
	}

	return (
		<div className="App">
			<img src={logo} alt="quotebook logo"></img>
			<h1>Hack at UCI Tech Deliverable</h1>
			<FormSubmission refreshQuotes={handleQuoteSubmit}/>
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
				<Button>Hello</Button>
				
			</div>
		</div>
	);
}

export default App;
import "./App.css";
import React, {useEffect, useState} from 'react';
import QuoteFilter from "./components/QuoteFilter";
import FetchQuotes from "./components/FetchQuotes";
import FormatDateTime from "./components/FormatDateTime";
import FormSubmission from "./components/FormSubmission";
import logo from "./assets/quotebook.png";
import { Button } from "@radix-ui/themes";
import "./styles/app.scss";
import {Row, Col, Container} from "react-bootstrap";


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
        <Container className="mt-5">
			<Row className="d-flex justify-content-center align-items-center"> 
				<Col xs="auto" className="d-flex justify-content-end">
					<img className="quote-logo" src={logo} alt="quotebook logo"></img>
				</Col>
				<Col xs="auto">
					<h1>Hack at UCI Tech Deliverable</h1>
				</Col>
			</Row>
			<Row className="d-flex">
				<Col xs="auto">
				<Container className="submission-container align-items-center">
				<FormSubmission refreshQuotes={handleQuoteSubmit}/>
				</Container>
				</Col>
				<Col xs={6} className="prev align-items-start">
				<QuoteFilter selectedOption={filter}onFilterChange={handleFilterChange}/>
				<div className="messages">
				<h2>Previous Quotes</h2>
				
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
				</Col>
			</Row>
			
		</Container>
		
		
	);
}

export default App;
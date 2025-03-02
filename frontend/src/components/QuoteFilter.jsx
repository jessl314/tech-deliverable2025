import React, { useState } from 'react';
import "../styles/prevquotes.scss";
import {Row, Col} from "react-bootstrap";


const QuoteFilter = ({onFilterChange}) => {
    const [selectedOption, setSelectedOption] = useState('')

    // event handler for when the user switches choices for the view menu
    const handleSelectChange = (event) => {
        const newVal = event.target.value;
        setSelectedOption(newVal);
        onFilterChange(newVal);
    };

    return (
        
        <Row className='quote-menu'>
            <Col xs={6} className="d-flex align-items-center">
                <h2>View Quotes From: </h2>
            </Col>
            <Col xs={6} className="d-flex align-items-center">
                <select
                id="view-quote-menu"
                value={selectedOption}
                onChange={handleSelectChange}>
                    <option value="">Choose</option>
                    <option value="week">the last week</option>
                    <option value="month">the last month</option>
                    <option value="year">the last year</option>
                    <option value="all">all time</option>
                </select>
            </Col>
        </Row> 
    );
};

export default QuoteFilter;





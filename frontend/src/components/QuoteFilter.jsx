import React, { useState } from 'react';

const QuoteFilter = ({onFilterChange}) => {
    const [selectedOption, setSelectedOption] = useState('')

    const handleSelectChange = (event) => {
        const newVal = event.target.value;
        setSelectedOption(newVal);
        onFilterChange(newVal);
    };

    return (
        <div>
        <label htmlFor="view-quote-menu" style={{ fontSize: "1.5rem", "fontWeight": "bold", "marginTop": "1.5rem"}}>View Quotes From: </label>
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
        </div>
    );
};

export default QuoteFilter;





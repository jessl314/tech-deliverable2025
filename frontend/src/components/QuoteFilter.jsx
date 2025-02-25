import React, { useState } from 'react';

const QuoteFiler = ({onFilterChange}) => {
    const [selectedOption, setSelectedOption] = useState('week')

    const handleSelectChange = (event) => {
        const newVal = event.target.value;
        setSelectedOption(newVal);
        onFilterChange(newVal);
    };

    return (
        <div>
        <label htmlFor="view-quote-menu">View Quotes From: </label>
        <select>
        <option value="week">the last week</option>
        <option value="month">the last month</option>
        <option value="year">the last year</option>
        </select>
        </div>

    );
}

export default QuoteFilter;





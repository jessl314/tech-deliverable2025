import React, { useState } from 'react';

const QuoteFiler = ({onFilterChange}) => {

    return (
        <div>
            <div className="view-quote-menu">
            <div><h2>View Quotes From: </h2></div>
        <div>
        <select>
        <option value="week">the last week</option>
        <option value="month">the last month</option>
        <option value="year">the last year</option>
        </select>
        </div>

        </div>

        <h2>Previous Quotes</h2>

        </div> 

    );
}

export default QuoteFilter;





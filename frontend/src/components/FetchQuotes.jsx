import React, {useState} from 'react';

export const FetchQuotes = async (max_age) => {
    let url = "http://127.0.0.1:8000/retrieve";
    // query parameter for age of previous quotes to view
    if (max_age) {
        url += `?max_age=${max_age}`
    }
    try {
        // retrieving the relevant data from the database
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response not ok")
        }
        const data = await response.json()
        return data.quotes || data;
    } catch(error) {
        console.error("Error fetching quotes:", error);
        return [];
    }
};

export default FetchQuotes;
import React, {useState} from 'react';

export const FetchQuotes = async (max_age) => {
    let url = "/retrieve";
    if (max_age) {
        url += '?max_age=${max_age}'
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response not ok")
        }
        const data = await response.json();
        return data.quotes || data;
    } catch(error) {
        console.error("Error fetching quotes:", error);
        return [];
    }
};
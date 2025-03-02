import React, {useState} from 'react';
import axios from 'axios';
import "../styles/submission.scss";
import { Button } from "@radix-ui/themes";

const FormSubmission = ({refreshQuotes}) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        // prevents default reloading
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/quote', new URLSearchParams({
                name: name,
                message: message
            }));
            // if API post request successful then we reset the input fields and refresh the quotes to include the new one
            if (response.status === 200) {
                console.log('quote submission successful');
                setName('');
                setMessage('');
                refreshQuotes();
            }
        } catch (error) {
            console.error("Error submitting quote:", error);
        }
    };
    return (
        <div className='submit-quote align-items-center'>
            <h2>Submit a quote</h2>
			
			<form onSubmit={handleSubmit}>
				<label htmlFor="input-name">Name: </label>
                    <input 
                        style={{ width: "30%" }}
                        type="text" 
                        name="name" 
                        id="input-name"
                        value = {name}
                        onChange ={(e) => setName(e.target.value)}
                        required />
				<label htmlFor="input-message">Quote: </label>
                    <input 
                        style={{ width: "30%"}}
                        type="text" 
                        name="message" 
                        id="input-message" 
                        value = {message}
                        onChange ={(e) => setMessage(e.target.value)}
                        required />
				<Button type="submit" className="submit-button" size="1" style={{padding: "0.2rem 0.2rem", marginLeft: "2rem", position: 'relative'}}>Submit</Button>
			</form>
        </div>
    );
};



export default FormSubmission;

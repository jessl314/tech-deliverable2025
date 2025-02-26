import React, {useState} from 'react';
import axios from 'axios';

const FormSubmission = ({refreshQuotes}) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/quote', new URLSearchParams({
                name: name,
                message: message
            }));
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
        <div>
            <h2>Submit a quote</h2>
			
			<form onSubmit={handleSubmit}>
				<label htmlFor="input-name">Name</label>
				<input 
                    type="text" 
                    name="name" 
                    id="input-name"
                    value = {name}
                    onChange ={(e) => setName(e.target.value)}
                    required />
				<label htmlFor="input-message">Quote</label>
				<input 
                type="text" 
                name="message" 
                id="input-message" 
                value = {message}
                onChange ={(e) => setMessage(e.target.value)}
                required />
				<button type="submit">Submit</button>
			</form>
        </div>
    );
};



export default FormSubmission;

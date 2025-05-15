import React, { useState } from 'react';
import axios from 'axios';

const BulkMailer = () => {
    const api = axios.create({
        baseURL: 'http://localhost:8000',
        withCredentials: true, // Important for cookie-based auth    
    });
    const [file, setFile] = useState(null);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('subject', subject);
        formData.append('message', message);

        console.log(file);

        // const res = await fetch('http://localhost:8000/users/bulk-mail/upload', {
        //     method: 'POST',
        //     body: formData,
        // });
        // const result = await res.json();

        const result = await api.post('/users/bulk-mail/upload', formData);
        console.log(result);
        
        alert(`Successfully sent to ${result.sent} emails.`);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Bulk Mail Students</h2>

            <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="block mb-2 p-2 w-full border" />
            <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className="block p-2 w-full border mb-4" />
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">Send Bulk Mail</button>
        </div>
    );
};

export default BulkMailer;

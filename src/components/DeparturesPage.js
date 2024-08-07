import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const DeparturesPage = () => {
    const [departures, setDepartures] = useState([]);
    const [airportId, setAirportId] = useState('');

    const fetchDepartures = async () => {
        const response = await axios.get(`http://localhost:8080/flights/departures/${airportId}`);
        setDepartures(response.data);
    };

    return (
        <div className="departures-page">
            <h1>Departures Page</h1>
            <input
                type="text"
                value={airportId}
                placeholder="Airport ID"
                onChange={(e) => setAirportId(e.target.value)}
            />
            <button onClick={fetchDepartures}>Fetch Departures</button>
            <ul>
                {departures.map(departure => (
                    <li key={departure.id}>
                        {departure.fromAirportId} - {departure.toAirportId} (Departing at: {departure.leavingTime})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeparturesPage;

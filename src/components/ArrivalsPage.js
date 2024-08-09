import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const ArrivalsPage = () => {
    const [arrivals, setArrivals] = useState([]);
    const [airportId, setAirportId] = useState('');

    const fetchArrivals = async () => {
        const response = await axios.get(`http://localhost:8080/flights/arrivals/${airportId}`);
        setArrivals(response.data);
    };

    return (
        <div className="arrivals-page">
            <h1>Arrivals Page</h1>
            <input
                type="text"
                value={airportId}
                placeholder="Airport ID"
                onChange={(e) => setAirportId(e.target.value)}
            />
            <button onClick={fetchArrivals}>Fetch Arrivals</button>
            <ul>
                {arrivals.map(arrival => (
                    <li key={arrival.id}>
                        {arrival.fromAirportId} - {arrival.toAirportId} (Arriving at: {arrival.arrivingTime})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArrivalsPage;

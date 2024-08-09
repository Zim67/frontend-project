import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const ArrivalsPage = () => {
    const [airports, setAirports] = useState([]);
    const [arrivals, setArrivals] = useState([]);
    const [airportId, setAirportId] = useState('');

    const fetchArrivals = async () => {
        if (airportId === "") return
        const response = await axios.get(`http://localhost:8080/flights/arrivals/${airportId}`);
        setArrivals(response.data);
    };

    const fetchAirports = async () => {
        const response = await axios.get('http://localhost:8080/airports');
        setAirports(response.data);
    }

    useEffect(() => {
        fetchAirports();
    }, []);

    return (
        <div className="arrivals-page">
            <h1>Arrivals Page</h1>
            <select onChange={(e) => setAirportId(e.target.value)} defaultValue="">
                <option value="" disabled>Select an airport</option>
                {airports.map(airport => (
                    <option key={airport.id} value={airport.id}>{airport.name}</option>
                ))}
            </select>
            <button onClick={fetchArrivals}>Fetch Arrivals</button>
            <ul>
                {arrivals.map(arrival => (
                    <li key={arrival.id}>
                        {arrival.from.name} - {arrival.to.name} (Arriving at: {new Date(arrival.arrivingTime).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArrivalsPage;

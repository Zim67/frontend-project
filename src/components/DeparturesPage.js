import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles.css';

const DeparturesPage = () => {
    const [airports, setAirports] = useState([]);
    const [departures, setDepartures] = useState([]);
    const [airportId, setAirportId] = useState('');

    const fetchDepartures = async () => {
        if (airportId === "") return
        const response = await axios.get(`http://localhost:8080/flights/departures/${airportId}`);
        setDepartures(response.data);
    };

    const fetchAirports = async () => {
        const response = await axios.get(`http://localhost:8080/airports`);
        setAirports(response.data);
    }

    useEffect(() => {
        fetchAirports();
    }, []);

    return (
        <div className="departures-page">
            <h1>Departures Page</h1>
            <select onChange={(e) => setAirportId(e.target.value)} defaultValue="">
                <option value="" disabled>Select an airport</option>
                {airports.map(airport => (
                    <option key={airport.id} value={airport.id}>{airport.name}</option>
                ))}
            </select>
            <button onClick={fetchDepartures}>Fetch Departures</button>
            <ul>
                {departures.map(departure => (
                    <li key={departure.id}>
                        {departure.from.name} - {departure.to.name} (Departing at: {new Date(departure.leavingTime).toLocaleString()})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeparturesPage;

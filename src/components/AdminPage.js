import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const AdminPage = () => {
    const [flights, setFlights] = useState([]);
    const [newFlight, setNewFlight] = useState({
        aircraftId: '',
        fromAirportId: '',
        fromGate: '',
        leavingTime: '',
        toAirportId: '',
        toGate: '',
        arrivingTime: ''
    });

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        const response = await axios.get('http://localhost:8080/flights');
        setFlights(response.data);
    };

    const handleChange = (e) => {
        setNewFlight({
            ...newFlight,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateFlight = async () => {
        await axios.post('http://localhost:8080/flights/create', newFlight);
        fetchFlights();
    };

    const handleDeleteFlight = async (id) => {
        await axios.delete('http://localhost:8080/flights/${id}');
        fetchFlights();
    };

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <div className="new-flight-form">
                <h2>Create New Flight</h2>
                <input type="text" name="aircraftId" placeholder="Aircraft ID" onChange={handleChange} />
                <input type="text" name="fromAirportId" placeholder="From Airport ID" onChange={handleChange} />
                <input type="text" name="fromGate" placeholder="From Gate" onChange={handleChange} />
                <input type="text" name="leavingTime" placeholder="Leaving Time" onChange={handleChange} />
                <input type="text" name="toAirportId" placeholder="To Airport ID" onChange={handleChange} />
                <input type="text" name="toGate" placeholder="To Gate" onChange={handleChange} />
                <input type="text" name="arrivingTime" placeholder="Arriving Time" onChange={handleChange} />
                <button onClick={handleCreateFlight}>Create Flight</button>
            </div>
            <div className="flights-list">
                <h2>Existing Flights</h2>
                <ul>
                    {flights.map(flight => (
                        <li key={flight.id}>
                            {flight.aircraftId} - {flight.fromAirportId} to {flight.toAirportId}
                            <button onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;


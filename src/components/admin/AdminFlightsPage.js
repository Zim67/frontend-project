import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles.css';

const AdminFlightsPage = () => {
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
    const [airports, setAirports] = useState([]);
    const [aircrafts, setAircrafts] = useState([]);

    useEffect(() => {
        fetchFlights();
        fetchAirports();
        fetchAircrafts();
    }, []);

    const fetchFlights = async () => {
        const response = await axios.get(`/flights`);
        setFlights(response.data);
    };

    const fetchAirports = async () => {
        const response = await axios.get(`/airports`);
        setAirports(response.data);
    }

    const fetchAircrafts = async () => {
        const response = await axios.get(`/aircrafts`);
        setAircrafts(response.data);
    }

    const handleChange = (e) => {
        setNewFlight({
            ...newFlight,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateFlight = async () => {
        await axios.post(`/flights/create`, {
            aircraft: Number.parseInt(newFlight.aircraftId),
            to: Number.parseInt(newFlight.toAirportId),
            from: Number.parseInt(newFlight.fromAirportId),
            toGate: newFlight.toGate,
            fromGate: newFlight.fromGate,
            arrivingTime: newFlight.arrivingTime,
            leavingTime: newFlight.leavingTime,
        });
        fetchFlights();
    };

    const handleDeleteFlight = async (id) => {
        await axios.delete(`/flights/${id}`);
        fetchFlights();
    };

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <div className="admin-form">
                <h2>Create New Flight</h2>
                <select name="aircraftId" onChange={handleChange} defaultValue="">
                    <option value="" disabled>Select an aircraft</option>
                    {aircrafts.map(aircraft => (
                        <option key={aircraft.id} value={aircraft.id}>{aircraft.registrationNumber}</option>
                    ))}
                </select>
                <select name="fromAirportId" onChange={handleChange} defaultValue="">
                    <option value="" disabled>Select an leaving airport</option>
                    {airports.map(airport => (
                        <option key={airport.id} value={airport.id}>{airport.name}</option>
                    ))}
                </select>
                <input type="text" name="fromGate" placeholder="From Gate" onChange={handleChange} />
                <input type="datetime-local" name="leavingTime" placeholder="Leaving Time" onChange={handleChange} />
                <select name="toAirportId" onChange={handleChange} defaultValue="">
                    <option value="" disabled>Select an arriving airport</option>
                    {airports.map(airport => (
                        <option key={airport.id} value={airport.id}>{airport.name}</option>
                    ))}
                </select>
                <input type="text" name="toGate" placeholder="To Gate" onChange={handleChange} />
                <input type="datetime-local" name="arrivingTime" placeholder="Arriving Time" onChange={handleChange} />
                <button onClick={handleCreateFlight}>Create Flight</button>
            </div>
            <div className="admin-list">
                <h2>Existing Flights</h2>
                <ul>
                    {flights.map(flight => (
                        <li key={flight.id}>
                            <span>{flight.aircraft.id} - {flight.from.name} to {flight.to.name}</span>
                            <button onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminFlightsPage;
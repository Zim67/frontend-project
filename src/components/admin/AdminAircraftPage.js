import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles.css';

const AdminAircraftPage = () => {
    const [newAircraft, setNewAircraft] = useState({
        registrationNumber: '',
        manufacturer: '',
        model: '',
        airline: '',
    });
    const [aircrafts, setAircrafts] = useState([]);

    useEffect(() => {
        fetchAircrafts();
    }, []);

    const fetchAircrafts = async () => {
        const response = await axios.get(`/aircrafts`);
        setAircrafts(response.data);
    }


    const handleChange = (e) => {
        setNewAircraft({
            ...newAircraft,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateAircraft = async () => {
        await axios.post(`/aircrafts/create`, newAircraft);
        fetchAircrafts();
    };

    const handleDeleteAircraft = async (id) => {
        await axios.delete(`/aircrafts/${id}`);
        fetchAircrafts();
    };

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <div className="admin-form">
                <h2>Create New Aircraft</h2>

                <datalist id="airlines">
                    {aircrafts.map(aircraft => aircraft.airline)
                    .filter((value, index, array) => array.indexOf(value) === index)
                    .map(airline => (
                        <option key={airline} value={airline}/>
                    ))}
                </datalist>

                <datalist id="manufacturers">
                    {aircrafts.map(aircraft => aircraft.manufacturer)
                    .filter((value, index, array) => array.indexOf(value) === index)
                    .map(manufacturer => (
                        <option key={manufacturer} value={manufacturer}/>
                    ))}
                </datalist>

                <datalist id="models">
                    {aircrafts.map(aircraft => aircraft.model)
                    .filter((value, index, array) => array.indexOf(value) === index)
                    .map(model => (
                        <option key={model} value={model}/>
                    ))}
                </datalist>

                <input type="text" name="registrationNumber" placeholder="Registration Number" onChange={handleChange} />
                <input type="text" list="manufacturers" name="manufacturer" placeholder="Manufacturer" onChange={handleChange} />
                <input type="text" list="models" name="model" placeholder="Model" onChange={handleChange} />
                <input type="text" list="airlines" name="airline" placeholder="Airline" onChange={handleChange} />

                <button onClick={handleCreateAircraft}>Create Aircraft</button>
            </div>
            <div className="admin-list">
                <h2>Existing Aircrafts</h2>
                <ul>
                    {aircrafts.map(aircraft => (
                        <li key={aircraft.id}>
                            <span>{aircraft.id} - {aircraft.registrationNumber} - {aircraft.manufactuerer} {aircraft.model} {aircraft.airline} </span>
                            <button onClick={() => handleDeleteAircraft(aircraft.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminAircraftPage;


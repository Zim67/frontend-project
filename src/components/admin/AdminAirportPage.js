import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles.css';

const AdminAirportPage = () => {
    const [newAirport, setNewAirport] = useState({
        code: '',
        name: '',
        city: '',
        country: '',
    });
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        fetchAirports();
    }, []);

    const fetchAirports = async () => {
        const response = await axios.get(`http://localhost:8080/airports`);
        setAirports(response.data);
    }


    const handleChange = (e) => {
        setNewAirport({
            ...newAirport,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateAirport = async () => {
        if (airports.find((value) => value.code === newAirport.code)) return
        await axios.post(`http://localhost:8080/airports/create`, newAirport);
        fetchAirports();
    };

    const handleDeleteAirport = async (id) => {
        await axios.delete(`http://localhost:8080/airports/${id}`);
        fetchAirports();
    };

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <div className="admin-form">
                <h2>Create New Airport</h2>

                <datalist id="countries">
                    {airports.map(airport => airport.country)
                    .filter((value, index, array) => array.indexOf(value) === index)
                    .map(country => (
                        <option key={country} value={country}/>
                    ))}
                </datalist>

                <datalist id="cities">
                    {airports.map(airport => airport.city)
                    .filter((value, index, array) => array.indexOf(value) === index)
                    .map(city => (
                        <option key={city} value={city}/>
                    ))}
                </datalist>

                <input type="text" name="code" placeholder="Airport Code" onChange={handleChange} />
                <input type="text" name="name" placeholder="Name" onChange={handleChange} />
                <input type="text" list="cities" name="city" placeholder="City" onChange={handleChange} />
                <input type="text" list="countries" name="country" placeholder="Country" onChange={handleChange} />

                <button onClick={handleCreateAirport}>Create Airport</button>
            </div>
            <div className="admin-list">
                <h2>Existing Airports</h2>
                <ul>
                    {airports.map(airport => (
                        <li key={airport.id}>
                            <span>{airport.id} - {airport.code} - {airport.name} - {airport.city} {airport.country}</span>
                            <button onClick={() => handleDeleteAirport(airport.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminAirportPage;


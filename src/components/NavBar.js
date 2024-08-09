import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <a href="/" className="logo">FlightManagement</a>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/arrivals">Arrivals</Link></li>
                <li><Link to="/departures">Departures</Link></li>
                <li><Link to="/admin">Admin</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;


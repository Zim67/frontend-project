import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import FlightList from './components/FlightList';
import AdminPanel from './components/AdminPanel';

const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/arrivals" element={<FlightList type="arrivals" />} />
                <Route path="/departures" element={<FlightList type="departures" />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </>
    );
};

export default App;




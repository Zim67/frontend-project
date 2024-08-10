import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ArrivalsPage from './components/ArrivalsPage';
import DeparturesPage from './components/DeparturesPage';
import AdminAircraftPage from './components/admin/AdminAircraftPage';
import AdminAirportPage from './components/admin/AdminAirportPage';
import AdminFlightsPage from './components/admin/AdminFlightsPage';
import AdminPage from './components/AdminPage';

const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/flights" element={<AdminFlightsPage />} />
                <Route path="/admin/aircrafts" element={<AdminAircraftPage />} />
                <Route path="/admin/airports" element={<AdminAirportPage />} />
                <Route path="/arrivals" element={<ArrivalsPage />} />
                <Route path="/departures" element={<DeparturesPage />} />
            </Routes>
        </>
    );
};

export default App;





import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import ArrivalsPage from './components/ArrivalsPage';
import DeparturesPage from './components/DeparturesPage';

const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/arrivals" element={<ArrivalsPage />} />
                <Route path="/departures" element={<DeparturesPage />} />
            </Routes>
        </>
    );
};

export default App;





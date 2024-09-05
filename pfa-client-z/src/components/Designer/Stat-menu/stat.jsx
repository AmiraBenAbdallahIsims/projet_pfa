import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Select from 'react-select';
import axios from 'axios'; // Make sure you have axios installed
import SideNav from '../../general-compo/sidenav';
import FloatingMetrics from './components/FloatingMetrics';
import './stat.css';

const Stat = () => {
    const [clientsOptions, setClientsOptions] = useState([]);

    useEffect(() => {
        // Fetch client data from the backend
        const fetchClients = async () => {
            try {
                const response = await axios.get('/api/clients'); // Replace with your actual API endpoint
                const clients = response.data; // Assuming your API returns an array of client objects
                const options = clients.map(client => ({
                    value: client.id, // or another unique identifier
                    label: client.name // or another property for display
                }));
                setClientsOptions(options);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    return (
        <div className="Stat-container">
            <SideNav />
            <div className="main-content-container">
                <div className="select">
                    <Form.Group controlId="clientSelect">
                        <Select
                            options={clientsOptions}
                            isSearchable
                            placeholder="select a project"
                        />
                    </Form.Group>
                </div>
                <div className="stat">
                    <FloatingMetrics />
                </div>
            </div>
        </div>
    );
};

export default Stat;

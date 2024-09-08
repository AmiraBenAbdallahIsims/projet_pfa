import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Select from 'react-select';
import axios from 'axios'; // Make sure you have axios installed
import SideNav from '../../general-compo/sidenav';
import FloatingMetrics from './components/FloatingMetrics';
import './stat.css';

const Stat = () => {
    const [clientsOptions, setClientsOptions] = useState([]);

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('http://localhost:3001/api/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                    'userid': JSON.parse(user)._id
                },
            });
            const data = await response.json();
            const projects = data;
            console.log(projects)
            const options = projects.map(project => ({
                value: project._id,
                label: JSON.parse(project.cardDesign).name.text
            }));
            setClientsOptions(options);
        }
        fetchProjects();
    }, [])
    

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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNav from '../../general-compo/sidenav';
import GridLayout from "../../Designer/Projects-menu/components/GridLayout";
import './Projects.css'; 

const Projects = () => {

  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   // Fetch project data from the backend
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await axios.get('/api/projects'); // Replace with your actual API endpoint
  //       const projects = response.data; // Assuming your API returns an array of project objects
  //       const formattedItems = projects.map(project => ({
  //         profileImage: project.profileImage, // Profile image URL from the backend
  //         url: project.url, // URL from the backend
  //       }));
  //       setItems(formattedItems);
  //     } catch (error) {
  //       console.error('Error fetching projects:', error);
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  // return (
  //   <div className="projects-container">
  //     <SideNav />
  //     <div className="projects-content">
  //       <h1 className="projects-header">My Projects</h1>
  //       <GridLayout items={items} />
  //     </div>
      
  //     {/* Floating circles */}
  //     <div className="circle1"></div>
  //     <div className="circle2"></div>
  //     <div className="circle3"></div>
  //   </div>
  // );

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const [items , setItems] = useState({});

  useEffect(()=>{
    const fetchProjects = async ()=>{
        const response = await fetch('http://localhost:3001/api/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token' : token,
            'userid' : JSON.parse(user)._id
          },
        });
        const data = await response.json();
        setItems(data);
    }
    fetchProjects();
  }, [])


    console.log(items);

     return (
      <div className="projects-container">
           <SideNav />
          <div className="projects-content">
              <h1 className="projects-header">My Projects</h1>
              {items.length > 0 ? <GridLayout items={items} /> : <div class="no-project-section">No project found</div>}
              
           </div>
          
           {/* Floating circles */}
           <div className="circle1"></div>
         <div className="circle2"></div>
           <div className="circle3"></div>
       </div>
   );

};

export default Projects;

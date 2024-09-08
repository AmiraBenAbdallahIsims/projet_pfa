
import React, { useState } from 'react';
import "./FloatingMetrics.css";
import Card from "../../../v.card/card";
import profileImage from "../../../../assets/logilink.png"; 
import { FaCloud, FaTemperatureLow, FaPercentage, FaChartLine } from "react-icons/fa"; // Importing icons from react-icons

const AnalyticsPage = () => {
    const [userHasCreatedCard, setUserHasCreatedCard] = useState(false);
  
    return (
      <div className="metrics-container">
        <div className="circle-background"></div>
  
        {userHasCreatedCard ? (
          <Card />
        ) : (
          <div className="main-card">
            <img
              src={profileImage} // Replace with actual image URL
              alt="User"
              className="profile-image-float"
            />
            <h2>John Smith</h2>
            <p>Software Engineer</p>
            <p>Tech Inc.</p>
          </div>
        )}
  
        <div className="floating-box box1">
          <i className="icon bi bi-bar-chart"></i>
          <p>2%</p>
          <span>Progress</span>
        </div>
  
        <div className="floating-box box2">
          <i className="icon bi bi-bell"></i>
          <p>4%</p>
          <span>Alerts</span>
        </div>
  
        <div className="floating-box box3">
          <i className="icon bi bi-thermometer-half"></i>
          <p>7°</p>
          <span>Temperature</span>
        </div>
  
        <div className="floating-box box4">
          <i className="icon bi bi-graph-up"></i>
          <p>76%</p>
          <span>Growth</span>
        </div>
  
        <div className="floating-box box5">
          <i className="icon bi bi-battery-half"></i>
          <p>239%</p>
          <span>Efficiency</span>
        </div>
  
        <div className="small-circle circle1"></div>
        <div className="small-circle circle2"></div>
        <div className="small-circle circle3"></div>
      </div>
    );
  };
  
  export default AnalyticsPage;
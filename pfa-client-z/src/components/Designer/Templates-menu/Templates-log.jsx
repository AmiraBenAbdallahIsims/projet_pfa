import React from 'react';
import SlideDiv from '../../Templates-slide/slide/slide-div';
import SideNav from '../../general-compo/sidenav';
import './Templates-log.css'; // Import the new CSS

const TemplatesLog = () => {
    return (
        <div className="templates-log-container">
            <SideNav />
            <div className="main-content-container">
                <SlideDiv />
            </div>

            <div className="circle1 small-decor-circle"></div>
            <div className="circle2 small-decor-circle"></div>
            <div className="circle3 small-decor-circle"></div>
        </div>
    );
};

export default TemplatesLog;

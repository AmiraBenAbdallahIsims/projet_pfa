import React from 'react';

import SideNav from '../../general-compo/sidenav';
import '../Feed-menu/feed.css';


const Feed = () => {
    return (
        <div className="projects-container">
          <SideNav />
          {/* Floating circles */}
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
        </div>
);
};

export default Feed ;
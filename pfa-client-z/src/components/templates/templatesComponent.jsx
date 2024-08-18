import "./templates.css"
import React from 'react';
import SlideDiv from "./components/slidediv"

export default function TemplatesComponent(){
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    let isUser = false;
    if(token && user){
        isUser = token == user.token;
    }
    
    return (
        <div>
            <div className="div1"><div>👋 Hi {isUser ? user.username : " There"}, pick a link in bio template that matches your style</div></div>
            { <SlideDiv /> }
        </div>
    )
}
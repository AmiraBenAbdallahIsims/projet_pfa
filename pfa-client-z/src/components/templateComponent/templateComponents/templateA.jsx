import React, { useState, useEffect, useRef } from 'react';
import ModifCard from "../../Designer/modif-card/modif-card"

const TemplateA = ({ templateName }) => {
    return(
        <div>
            <ModifCard templateName={templateName}/>
        </div>
    )
};

export default TemplateA;

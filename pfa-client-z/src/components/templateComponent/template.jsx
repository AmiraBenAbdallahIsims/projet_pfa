import React from 'react';
import { useParams } from 'react-router-dom';
import TemplateA from './templateComponents/templateA';
import TemplateB from './templateComponents/templateB';
import TemplateC from './templateComponents/templateC';
import TemplateD from './templateComponents/templateD';



const Template = () => {
  console.log('test')
  const { templateName } = useParams();
  switch (templateName) {
    case 'a':
      return <TemplateA templateName ={templateName}/>;
    case 'b':
      return <TemplateB templateName ={templateName}/>;
    case 'c':
      return <TemplateC templateName ={templateName}/>;
    case 'd':
      return <TemplateD templateName ={templateName}/>;
    default:
      return <h1>Template Not Found</h1>;
  }

};

export default Template;
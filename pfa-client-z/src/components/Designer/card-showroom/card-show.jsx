import { useParams } from "react-router-dom";
import Card from "../../v.card/card";
import { useState , useEffect } from "react";





const ShowCard = () => {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    const {templateCardName , templateId } = useParams();
    const [createdCard , setCreatedCard] = useState();
    useEffect(() => {
        const CheckTemplate = async () => {
          if (templateId) {
            const response = await fetch(`http://localhost:3001/api/checktemplate/${templateId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'token': token,
                'userid': JSON.parse(user)._id,
                'templateid': templateId
              },
            });
    
    
            const data = await response.json();
            if (data.success) {
              await setCreatedCard(data.card);
            } 
          }
        }
    
        CheckTemplate();
      }, [])

    return (
        <div>
            {createdCard ? <Card isShow ={true} createdCard={createdCard}/> : 'Waiting ...'}
        </div>
        
    )
}


export default ShowCard;
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import VerificationCodeForm from './components/verificationCodeForm';
import PasswordsForm from './components/passwordsForm';
import './forgetPassword.css'

function Forgot(props) {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    const [isEmailInput , setIsEmailInput] = useState(true);
    const [verificationCode,setVerificationCode]= useState("");
    const [isPasswordsInput , setIsPasswordsInput] = useState(false);
    const [newpassword ,  setnewpassword] = useState("");
    const [newpasswordcheck,  setnewpasswordcheck] = useState("");
    const [message , setMessage] = useState("");
    const [token , setToken] = useState("");
    console.log(isEmailInput , isPasswordsInput)
    const HandlePassword = async () => {
        setIsLoading(true);
        const res = await fetch('http://localhost:3001/api/resetpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        setIsLoading(false);
        if (data.success) {
            setSuccess(true);
            setIsEmailInput(false);
            setToken(data.token);
        }
    }

    const handleEmail = (evt) => {
        setEmail(evt.target.value);
    }

    const handleCloseButton = () => {
        props.onHide(); 
        setSuccess(false);
        setIsEmailInput(true);
        setIsPasswordsInput(false);
    }

    const HandleVerificationCode = async() =>{
      const res = await fetch(`http://localhost:3001/api/verificationcode/${token}`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
      body: JSON.stringify({ verificationCode,email }),
    });

    const data = await res.json();
    if(data.success){
      setIsPasswordsInput(true);
      setIsEmailInput(false);
      setSuccess(false);
    }
  }
  const HandleNewPassword = async () => {
     setIsLoading(true);
     const res = await fetch(`http://localhost:3001/api/changepassword/${token}`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email ,newpassword,newpasswordcheck}),
     });

    const data = await res.json();

    if(data.success){
      setMessage("Password changed successfully");
      setTimeout(() => {
        setSuccess(false);
        setIsEmailInput(true);
        setIsPasswordsInput(false);
        setIsLoading(false);
        setMessage("");
      }, 2000);
    }else{
      setMessage(data.message);
    }
   
}

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Forget Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  {success && !isPasswordsInput ? (
                      <VerificationCodeForm setVerificationCode={setVerificationCode} />
                  ) : !success && !isPasswordsInput ? (
                      <div>
                          <p>Enter your email:</p>
                          <form>
                              <input type="email" onChange={handleEmail} name="email" />
                          </form>
                      </div>
                  ) : (
                      <PasswordsForm setnewpassword= {setnewpassword} setnewpasswordcheck ={setnewpasswordcheck} />
                  )}
                  <p>{message}</p>
              </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseButton}>Close</Button>
                <Button variant="primary" onClick={isEmailInput && !isPasswordsInput ? HandlePassword : !isPasswordsInput && !isEmailInput ? HandleVerificationCode : HandleNewPassword}>{isLoading ? <img className="loading-img" src="https://i.gifer.com/ZKZg.gif"></img> : "Continue"}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Forgot;

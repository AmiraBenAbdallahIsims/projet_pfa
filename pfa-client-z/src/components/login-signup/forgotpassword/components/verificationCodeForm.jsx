import { useState } from "react"

export default function VerificationCodeForm({setVerificationCode}){

const handleCode = (evt)=>{
    setVerificationCode(evt.target.value);
}
    return (
        <div>
            <label>Enter the verification code that is sent to your email</label>
            <input type="text" name="code" onChange={handleCode} ></input>
        </div>
    )
}
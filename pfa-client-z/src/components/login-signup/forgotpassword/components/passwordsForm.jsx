export default function PasswordsForm({ setnewpassword, setnewpasswordcheck}){

    const handlePassword = (evt)=>{
        setnewpassword(evt.target.value);
    }
    const handlePasswordCheck = (evt)=>{
        setnewpasswordcheck(evt.target.value);
    }
    return(
        <div>
            <label>Enter your new password</label>
            <input type="password" name="newpassword" onChange={handlePassword}></input>
            <label>Re-enter your new password</label>
            <input type="password" name="newpasswordcheck" onChange={handlePasswordCheck}></input>
        </div>
    )
}
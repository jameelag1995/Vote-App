import "./Login.css";
import { useContext, useRef, useState } from "react";
import { LoginContext } from "../../Context/LoginContext";
import { ThemeContext } from "../../Context/ThemeContext";

const Login = () => {
    const [btnClicked, setBtnClicked] = useState(false);
    const { handleUserLogin, errMsg } = useContext(LoginContext);
    const {darkTheme}= useContext(ThemeContext)
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        setBtnClicked((prev) => !prev);
        setTimeout(() => {
            handleUserLogin(emailRef.current.value, passwordRef.current.value);
            setBtnClicked((prev) => !prev);
        }, 1000);
    }

    return (
        <div className={`Login page ${darkTheme ? 'dark' : ''}`}>
            <form className={darkTheme ? 'dark' : ''} onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="user-email">Email:</label>
                <input className={darkTheme ? 'dark' : ''} ref={emailRef} type="email" name="user-email" placeholder="Enter Your Email Here..." />
                <label htmlFor="user-password">Password:</label>
                <input className={darkTheme ? 'dark' : ''} ref={passwordRef} type="password" name="user-password" placeholder="Enter Your Password Here..." />
                <button id="login-btn" className={darkTheme ? 'dark' : ''}>
                    Login
                </button>
                <div className="msg-spinner-container" style={{color:"red"}}>
                    {btnClicked ? <div className="sp sp-hydrogen"></div> : errMsg}
                </div>
            </form>
        </div>
    );
};

export default Login;

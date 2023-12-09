import React, { useContext } from "react";
import "./NavBar.css";
import { LoginContext } from "../../Context/LoginContext";
import { ThemeContext } from "../../Context/ThemeContext";
import logoImg from '../../assets/images/logo.png'
const NavBar = ({ setPage }) => {
    const { loggedUser, isAdmin, handleUserLogout } = useContext(LoginContext);
    const { darkTheme } = useContext(ThemeContext);
    return (
        <div className={`NavBar ${darkTheme ? "dark" : ""}`}>
            <div className="logo">
                <img src={logoImg} alt="logo" />
            </div>

            <div className="dropdown">
                <button className={`dropbtn ${darkTheme ? "dark" : ""}`}>
                    {loggedUser.name}
                </button>
                <div className="dropdown-content">
                    <button
                        className={darkTheme ? "dark" : ""}
                        onClick={() => {
                            setPage("vote");
                        }}
                    >
                        Vote
                    </button>
                    {isAdmin && (
                        <button
                            className={darkTheme ? "dark" : ""}
                            onClick={() => {
                                setPage("admin");
                            }}
                        >
                            Statistics
                        </button>
                    )}
                    <button
                        className={darkTheme ? "dark" : ""}
                        onClick={() => {
                            setPage("vote");
                            handleUserLogout();
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;

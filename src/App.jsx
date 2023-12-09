import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import LoginContextProvider from "./Context/LoginContext";
import ThemeContextProvider from "./Context/ThemeContext";
import Login from "./Pages/Login/Login";
import Vote from "./Pages/Vote/Vote";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState("vote");

    function navigatePage() {
        if (!loggedIn) {
            return <Login />;
        } else {
            if (page === "vote") {
                return (
                    <>
                        <NavBar setPage={setPage} />
                        <Vote />
                    </>
                );
            }
            if (page === "admin") {
                return (
                    <>
                        <NavBar setPage={setPage} />
                        <AdminDashboard />
                    </>
                );
            }
        }
    }
    return (
        <div className="App page">
            <ThemeContextProvider>
                <LoginContextProvider setLogin={setLoggedIn}>
                    {navigatePage()}
                </LoginContextProvider>
            </ThemeContextProvider>
        </div>
    );
}

export default App;

import { createContext, useEffect, useState } from "react";
import axios from "../data/axiosConfig";

const url = "https://6571c58bd61ba6fcc0138448.mockapi.io";

export const LoginContext = createContext({
    loggedUser: {},
    setLoggedUser: () => {},
    usersData: [],
    setUsersData: () => {},
    errMsg: "",
    isAdmin: false,
    handleUserLogin: () => {},
    handleUserLogout: () => {},
});

export default function LoginContextProvider({ setLogin, children }) {
    const [usersData, setUsersData] = useState([]);
    const [loggedUser, setLoggedUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const fetchData = async () => {
        try {
            const res = await axios.get("/users");
            console.log(res);
            setUsersData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (loggedUser.id != undefined) {
            handleVotesUpdate();
        }
    }, [loggedUser.vote]);

    async function handleVotesUpdate() {
        try {
            let newVote = loggedUser.vote;
            const res = await axios.put(`/users/${loggedUser.id}`, {
                vote: newVote,
            });
            const updatedData = usersData.map((usr) => {
                return usr.id === loggedUser.id ? res.data : usr;
            });
            setUsersData(updatedData);
        } catch (error) {
            console.log(error);
        }
    }

    function handleUserLogin(email, password) {
        let currUser = usersData.find((el) => el.email == email);
        if (currUser === undefined) {
            setErrMsg("Email Doesn't Exist!");
            return;
        }
        if (currUser.password !== password) {
            setErrMsg("Wrong Password! Try Again");
            return;
        }
        if (currUser.isAdmin) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }

        setLoggedUser(currUser);
        setErrMsg("");
        setLogin(true);
    }
    function handleUserLogout() {
        setLoggedUser({});
        setIsAdmin(false);
        setLogin(false);
        
    }

    const loginContextValues = {
        loggedUser,
        setLoggedUser,
        usersData,
        setUsersData,
        errMsg,
        isAdmin,
        handleUserLogin,
        handleUserLogout,
    };

    return (
        <LoginContext.Provider value={loginContextValues}>
            {children}
        </LoginContext.Provider>
    );
}

import axios from "axios";

const instance = axios.create({
    baseURL:"https://6571c58bd61ba6fcc0138448.mockapi.io",
    headers:{
        'Content-Type': 'application/json',
        // Authorization: "some Token"
    }
})

export default instance;
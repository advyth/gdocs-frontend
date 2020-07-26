const setAuth = (state) =>{
    localStorage.setItem("authorized", state);
}
const getAuth = () =>{
    return localStorage.getItem("authorized");
}

const setEmailStorage = (email)=>{
    localStorage.setItem("email", email);
}
const getEmailStorage = () =>{
    return localStorage.getItem("email");
}

module.exports = {
    setAuth,
    getAuth,
    setEmailStorage,
    getEmailStorage
}
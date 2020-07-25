const setAuth = (state) =>{
    localStorage.setItem("authorized", state);
}
const getAuth = () =>{
    return localStorage.getItem("authorized");
}

module.exports = {
    setAuth,
    getAuth
}
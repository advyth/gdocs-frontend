import React, { useState } from "react";
import { ReactComponent as DocumentLogo } from "../assets/icons/article-24px.svg";
import axios from "axios";
import {Redirect, useHistory, Link} from "react-router-dom";
import {setAuth, getAuth, setEmailStorage} from "../utils/globalstore";


import { BASE_URL } from "../utils/api";
import { _DEV_ } from "../utils/env_vars";

function Login() {
  const [email, setEmail] = useState(_DEV_ ? "advythashok@gmail.com" : "");
  const [password, setPassword] = useState(_DEV_ ? "password" : "");
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };
  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  if(getAuth() == "true"){
    history.push("/home",{
      email : email
    })
  }

  const login = () => {
    if(email != "" && password != ""){
      setLoading(true);
      let body = {
        email: email,
        password: password,
      };
      axios
        .post(`${BASE_URL}/login`, body)
        .then((response) => {
            setLoading(false);
            if(response.data.message == "success"){
              setAuth("true");
              console.log(email);
              setEmailStorage(email);
              history.push("/home",{
                email : email,
              });
            }
            else
            {
              alert("Invalid username/email");
            }
            console.log(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else
    {
      alert("Invalid username/email");
    }
    
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 login-col shadow-lg">
          <DocumentLogo fill="white" height={60} width={60} />
          <h2>Login</h2>
          <input
            className="login-input-fields"
            type="text"
            placeholder="username"
            onChange={handleEmail}
            value={email}
          />
          <br />
          <input
            className="login-input-fields"
            type="password"
            placeholder="password"
            onChange={handlePassword}
            value={password}
          />
          <br />
          <button onClick={login} className="login-button">
          {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Login"
            )}
          </button>
          <br/>
          <Link className="register-link" to="/register">Click here to Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

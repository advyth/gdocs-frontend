import React, { useState, useEffect } from "react";
import { ReactComponent as DocumentLogo } from "../assets/icons/article-24px.svg";
import PasswordLogo from "../components/password_confirm_logo";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {setAuth, getAuth, setEmailStorage} from "../utils/globalstore";

import { BASE_URL } from "../utils/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm] = useState("");
  const [passwordSame, setPasswordSame] = useState(false);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };
  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };
  const handleConfirmPassword = ({ target: { value } }) => {
    setConfirm(value);
  };
  const checkPasswordSame = () => {
    console.log(password + " " + confirm_password);
    if (password == confirm_password) {
      setPasswordSame(true);
    } else {
      setPasswordSame(false);
    }
  };
  useEffect(() => {
    checkPasswordSame();
  }, [password, confirm_password]);
  const register = () => {
    setLoading(true);
    let body = {
      email: email,
      password: password,
    };
    if(email == "" || password == "" || (password != confirm_password))
    {
      alert("Invalid details");
    }
    axios
      .post(`${BASE_URL}/register`, body)
      .then((response) => {
        console.log(response.data.message);
        setLoading(false);
        if(response.data.message === "registered"){
          setAuth("true");
          setEmailStorage(email);
          history.push("/home",{
            email : email
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 login-col shadow-lg">
          <DocumentLogo fill="white" height={60} width={60} />
          <h2>Register</h2>
          <input
            className="login-input-fields"
            type="text"
            placeholder="username"
            onChange={handleEmail}
          />
          <br />
          <input
            className="login-input-fields"
            type="password"
            placeholder="password"
            onChange={handlePassword}
          />
          <br />
          <input
            className="login-input-fields"
            type="password"
            placeholder="confirm"
            onChange={handleConfirmPassword}
          />
          {password != "" && confirm_password != "" ? (
            <PasswordLogo type={passwordSame} />
          ) : (
            ""
          )}
          <br />
          <button onClick={register} className="login-button">
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;

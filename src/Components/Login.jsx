import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import '../Style/Login.css';
import logo from '../Asset/OnWhite_RGB (1).png';
import { useUser } from "./UserContext";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const { data, setData } = useData();
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        
        const data = await response.json();

        const username = data.userId;

        navigate(`/dashboard/${username}`);
        console.log("Login successful");
        console.log(data.fullname);
        console.log(data.userId);
      } else {
        const data = await response.json();
        setError(data.message); // Assuming your API returns an error message

      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="homepage" >
        <div className="heading">
            <div>
                <img src={logo} alt=""  width="150px" style={{marginLeft: '-10px'}}/>

            </div>
            <div>
                <h1 style={{marginTop: '15px'}}>Employee Onboarding Checklist</h1>

            </div>
        </div>
        {error && alert(error)}
        <div className="formmain">
            <div>

            </div>
            <div className="loginform">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="userid"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>

        </div>
        
               
      </div>
    </>
  );
}

export default Login;

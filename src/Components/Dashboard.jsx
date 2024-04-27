import React, { useEffect, useState } from 'react';
// import UserDetail from './UserDetail';
import { useLocation, useParams, Link } from "react-router-dom";
import logo from '../Asset/OnWhite_RGB (1).png';
import { useUser } from "./UserContext";
import '../Style/UserDetail.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import image1 from '../Asset/0b2.jpg';
import image2 from '../Asset/ob3.jpg';
import image3 from '../Asset/ob4.jpg';
import image4 from '../Asset/ob8.jpg';



export const Dashboard = (props) => {

  const {username} = useParams();
  console.log('username is' + username)
  
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    
    fetchFullName();
    statusFlag();
  }, []);

  const fetchFullName = async () => {
    try{
      const response = await fetch("http://localhost:8080/fullname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      console.log()

      setFullName(data.fullname);
      setRole(data.role);

      // console.log(setFullName);
      // console.log('role is ' + data.role);

    
  }catch(error){
    console.error(error);

  }
}
 

const statusFlag = async () => {
  const userid = fullName;
  try{
    const response = await fetch("http://localhost:8080/statusflag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid }),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch status');
    }
    const data = await response.json();
    setStatus(data.status);
    console.log('status :' + setStatus);
}catch(error){
  console.error(error);
}
}

const handleLogout = () =>{
  history('/');
}
 
  return(<>
  <div className='header'> 
  <Navbar className="bg-body-tertiary" style={{backgroundColor: '#a5f2d8'}}>
      <Container>
        <Navbar.Brand href="#home"><img src={logo} alt="" srcset="" width='150px' /></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <h4>Signed: {fullName}</h4>
          </Navbar.Text>
          <Button variant="outline-success" style={{marginLeft: '20px'}} onClick={ handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  </div>
  <div className='title'>
    <h2>Employee Onboarding Checklist</h2>
    
  </div>
  <div>
    <div className='content-holder'>
      <div className='content'>
      <Link className='main-content' onClick={() => status === 'Y' ? alert('You are already Fill the Form!') : null} to={status !== 'Y' ? `/assetform/${username}` : '#'}>
      <img src={image1} alt="" width='400px' height='220px' style={{borderRadius: '10px 10px 00px 0px'}} />
      <h4>Onboard Checklist</h4>
      </Link>
      <Link className='main-content'>
      <img src={image4} alt="" width='400px' height='220px' style={{borderRadius: '10px 10px 00px 0px'}}/>
      <h4>My CheckList</h4>
      </Link >
      </div>
      <div className='content'>
      {role === 'admin' && (
        <Link className='main-content' to ={ `/adminview/${username}`}>
        <img src={image2} alt="" width='400px' height='220px' style={{borderRadius: '10px 10px 00px 0px'}} />
        <h4>Admin View</h4>
        </Link>

      )}
     
      {
        role === 'superadmin' && (
          <Link className='main-content' to={`/superadminview/${username}`}>
      <img src={image3} alt="" width='400px' height='220px' style={{borderRadius: '10px 10px 00px 0px'}}/>
      <h4>SuperAdmin View</h4>
      </Link>

        )
      }
      
      
      </div>
      
    </div>
  </div>
  
  </>)

}

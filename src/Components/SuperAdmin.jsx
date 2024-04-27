import React, {useState, useEffect} from 'react';
import image from '../Asset/arrow.jpg';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from "react-router-dom";
import '../Style/UserDetail.css';
import Form from 'react-bootstrap/Form';

export default function SuperAdmin(){
    const history = useNavigate();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);


    const handleLogout = () => {
        history('/');
    }

    const handleGoBack = () => {
        history(-1);
    }

    useEffect(() => {
        const adminData = async () => {
            try {
                const response = await fetch("http://localhost:8080/adminview");
                const jsonData = await response.json();
                setData(jsonData.data);
                console.log(setData);
            } catch (error) {
                console.error(error);
            }
        }
        adminData();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    // Filter data based on search query
    const filteredData = data.filter(item => {
        return Object.values(item).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    

    return (
        <div>
            <div className='headeradmin'>
                <div>
                    <Link onClick={handleGoBack}><img src={image} width='40px' style={{ borderRadius: '50%' }} /></Link>
                </div>
                <div>
                    <Button variant="outline-success" style={{ marginLeft: '20px' }} onClick={handleLogout}>Logout</Button>
                </div>
            </div>
            <div className='contentadmin'>
                <h3>Super Admin View</h3>
            </div>
            <div className='search'>
            <Form inline>
          <Form.Control type="text"
                    placeholder="Search..." onChange={handleSearch}
                    Style={{border: '2px solid black'}}/>
          </Form>
            </div>
            <div className='data'>
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Date of Birth</th>
                            <th>Date of Joining</th>
                            <th>Phone Number</th>
                            <th>Position/Role</th>
                            <th>Address Line 1</th>
                            <th>Address Line 2</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Laptop Model</th>
                            <th>Headset Model</th>
                            <th>Temporary ID Received</th>
                            <th>Permanent ID Received</th>
                            <th>Access Card</th>
                            <th>YUBI Key Received</th>
                            <th>Workstation Allocated</th>
                            <th>Required Space Provided</th>
                            <th>Parking Pass Provided</th>
                            <th>Comments</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.userid}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.gender}</td>
                                <td>{item.dob}</td>
                                <td>{item.date_of_joining}</td>
                                <td>{item.phonenumber}</td>
                                <td>{item.position}</td>
                                <td>{item.address1}</td>
                                <td>{item.address2}</td>
                                <td>{item.city}</td>
                                <td>{item.state}</td>
                                <td>{item.zipcode}</td>
                                <td>{item.laptop_model}</td>
                                <td>{item.headset_pref}</td>
                                <td>{item.temp_is_status}</td>
                                <td>{item.perm_id_status}</td>
                                <td>{item.access_card}</td>
                                <td>{item.yubikey_status}</td>
                                <td>{item.workstationallocated_stat}</td>
                                <td>{item.req_space_loc_stat}</td>
                                <td>{item.park_pass_stat}</td>
                                <td>{item.comments}</td>
                                <td><Button variant="danger">Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Style/AssetForm.css';

function AssetForm() {
  const { username } = useParams();
  const [formData, setFormData] = useState({
    userid: '',
    username: '',
    first_name: '',
    last_name: '',
    gender: '',
    dob: '',
    date_of_joining: '',
    position: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    laptop_model: '',
    mouse: '',
    headset_pref: '',
    temp_is_status: '',
    perm_id_status: '',
    access_card: '',
    yubikey_status: '',
    workstationallocated_stat: '',
    req_space_loc_stat: '',
    park_pass_stat: '',
    comments: '',
    phonenumber: ''
  });
  const [declareChecked, setDeclareChecked] = useState(false);

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const response = await axios.post("http://localhost:8080/fullname", { username }, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = response.data;

        setFormData(prevState => ({
          ...prevState,
          username: data.fullname,
          userid: data.userid
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchFullName();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      ...formData,
      first_name: '',
      last_name: '',
      gender: '',
      dob: '',
      date_of_joining: '',
      position: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      laptop_model: '',
      mouse: '',
      headset_pref: '',
      temp_is_status: '',
      perm_id_status: '',
      access_card: '',
      yubikey_status: '',
      workstationallocated_stat: '',
      req_space_loc_stat: '',
      park_pass_stat: '',
      comments: '',
      phonenumber: ''
    });
    setDeclareChecked(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/insert-asset', formData);
      resetForm();
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Delhi', 'Puducherry',
  ];

  return (
    <div className="assetform">
      <h2 style={{ marginTop: "20px" }}>Onboarding Checklist</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Enter First Name" required />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name='last_name' value={formData.last_name} onChange={handleChange} placeholder="Enter Last Name" required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="Default select example" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Please select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" name='dob' value={formData.dob} onChange={handleChange} placeholder="Enter Last Name" required />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Date of Joining</Form.Label>
            <Form.Control type="date" name='date_of_joining' value={formData.date_of_joining} onChange={handleChange} placeholder="Enter Last Name" required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" name='position' value={formData.position} onChange={handleChange} required placeholder="E.g: Manager-Delivery" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Phone No</Form.Label>
            <Form.Control type="text" name='phonenumber' value={formData.phonenumber} onChange={handleChange} required placeholder="E.g: 988789xxxx" />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 1 (Door No/Plot No/Floor)</Form.Label>
          <Form.Control name='address1' value={formData.address1} onChange={handleChange} required placeholder="No:00/Floor" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2 (Street Name)</Form.Label>
          <Form.Control name='address2' value={formData.address2} onChange={handleChange} required placeholder="Apartment, studio" />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control name='city' value={formData.city} onChange={handleChange} required placeholder="E.g: New York" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select name='state' value={formData.state} onChange={handleChange} required defaultValue="">
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index}>{state}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type='number' name='zipcode' value={formData.zipcode} onChange={handleChange} required />
          </Form.Group>
        </Row>

        {/* Equipment Preferences / Received */}
        <h2>Equipment Preferences / Received</h2>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Laptop Model</Form.Label>
            {['Mac', 'Window'].map((model, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={model}
                  name="laptop_model"
                  type="radio"
                  id={`inline-radio-${model}`}
                  value={model}
                  checked={formData.laptop_model === model}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Mouse Preferences</Form.Label>
            {['Wired', 'WireLess'].map((pref, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={pref}
                  name="mouse"
                  type="radio"
                  id={`inline-radio-mouse-${pref}`}
                  value={pref}
                  checked={formData.mouse === pref}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Keyboard Preferences</Form.Label>
            {['Wired', 'WireLess'].map((pref, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={pref}
                  name="headset_pref"
                  type="radio"
                  id={`inline-radio-headset_pref-${pref}`}
                  value={pref}
                  checked={formData.headset_pref === pref}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Temporary ID Card Received</Form.Label>
            {['Yes', 'No'].map((status, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={status}
                  name="temp_is_status"
                  type="radio"
                  id={`inline-radio-temp_is_status-${status}`}
                  value={status}
                  checked={formData.temp_is_status === status}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Permanent ID Card Received</Form.Label>
            {['Yes', 'No'].map((status, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={status}
                  name="perm_id_status"
                  type="radio"
                  id={`inline-radio-perm_id_status-${status}`}
                  value={status}
                  checked={formData.perm_id_status === status}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Access Card Received</Form.Label>
            {['Yes', 'No'].map((status, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={status}
                  name="access_card"
                  type="radio"
                  id={`inline-radio-access_card-${status}`}
                  value={status}
                  checked={formData.access_card === status}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>YUBI Key Received</Form.Label>
            {['Yes', 'No'].map((status, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={status}
                  name="yubikey_status"
                  type="radio"
                  id={`inline-radio-yubikey_status-${status}`}
                  value={status}
                  checked={formData.yubikey_status === status}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Workstation Allotted</Form.Label>
            {['Yes', 'No'].map((status, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={status}
                  name="workstationallocated_stat"
                  type="radio"
                  id={`inline-radio-workstationallocated_stat-${status}`}
                  value={status}
                  checked={formData.workstationallocated_stat === status}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Requested Space Location</Form.Label>
            {['Yes', 'No'].map((status, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={status}
                  name="req_space_loc_stat"
                  type="radio"
                  id={`inline-radio-req_space_loc_stat-${status}`}
                  value={status}
                  checked={formData.req_space_loc_stat === status}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Parking Space Allotted</Form.Label>
            {['Yes', 'No'].map((status, index) => (
              <div key={index} className="mb-3">
                <Form.Check
                  inline
                  label={status}
                  name="park_pass_stat"
                  type="radio"
                  id={`inline-radio-park_pass_stat-${status}`}
                  value={status}
                  checked={formData.park_pass_stat === status}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </Form.Group>
        </Row>
        <Form.Group controlId="commentsForm.ControlTextarea">
          <Form.Label>Add a comment:</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            name="comments"
            rows={3}
            value={formData.comments}
            onChange={handleChange}
            placeholder="Write your comments here..."
            required
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="I declare all above details entry my knowledge"
            checked={declareChecked}
            onChange={(e) => setDeclareChecked(e.target.checked)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AssetForm;

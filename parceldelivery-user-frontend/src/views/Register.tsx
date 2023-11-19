import React, {  useState, FormEvent } from 'react';
//import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styling/module.css';
import { request } from 'http';
import { create } from 'domain';
//import { updateExpression } from '@babel/types';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const POSTALCODE_REGEX = /^[0-9]{5}(?:-[0-9]{4})?$/;

const Register: React.FC = () => {
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(
    {email: '',
    postalCode: '',
    confirmPassword: '',
    form: '', // Add this if you want to store form-wide errors
  }
  );

  //const [success, setSuccess] = useState<boolean>(false);
  const [submissionState, setSubmissionState] = useState('idle');
  const [isFormValid, setIsFormValid] = useState(false);

  const validForm= () => {
     // Check if all required fields are filled in
    const requiredFields =Object.values(formData).every(value => value.trim() !== '');
    //Check REGEX
    //const validEmail = EMAIL_REGEX.test(formData.email);
   // const validPostalCode = POSTALCODE_REGEX.test(formData.postalCode);
    const validConfirmPassword = formData.password === formData.confirmPassword;
    //setIsFormValid(requiredFields && validEmail && validPostalCode && validConfirmPassword);
    setIsFormValid(requiredFields && validConfirmPassword);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
     
    setFormData(prevState =>{
    
        const updatedFormData = { ...prevState, [name]: value };
        // After state update, validate form
        validForm();
        return updatedFormData;
      });
 // Clear or set error messages as needed
if(name === 'confirmPassword' && formData.password !== value){
  setError(prevState => ({ ...prevState, confirmPassword: 'Passwords do not match' }));
}else {
  setError(prevState => ({ ...prevState, [name]:"" }));
}
  };

    // Validate the field (you can expand the validation logic)
   
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    if (!isFormValid) {
      //console.log(!formData);
      setSubmissionState('error');
      return;
    }
    setSubmissionState('pending');
      // Send data to the server (you can use fetch or Axios)
    try {
      const response = await fetch('http://localhost:3001/user/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        setSubmissionState('success');
      }else{
        throw new Error('Registration credentials are incorrect.');
      }
    } catch (error:any) {
      const message = typeof error.message === 'string' ? error.message : 'An unknown error occurred';
      console.log(error);
      console.log(message);
      console.log(error.message);
      console.log(formData);

      setError({...error, form: message});
      setSubmissionState('error');
    }
  };



  return (
    <section className="registerContainer">
    <h1>Register now and join us!</h1>
    <h5>* Mandory field </h5>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form">
            {/* Other form fields go here */}
            
            <label htmlFor="firstName" className='name'>First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="*First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            
            <label htmlFor="lastName" className='name'>Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="* Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
             <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="* Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
             {error.email && <p className="error">{error.email}</p>}
             <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="* Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="streeAddress">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              name="streetAddress"
              placeholder="* Street address"
              value={formData.streetAddress}
              onChange={handleChange}
              required
            />

            <label htmlFor="postalcode">Postal code</label>
            <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="* Postal code"
            value={formData.postalCode}
            onChange={handleChange}
            required
            />
             {error.postalCode && <p className="error">{error.postalCode}</p>}
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="* City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            
          <label htmlFor="userName">Give yourself username and password</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="* Username"
            value={formData.userName}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="* Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="* confirm password must match your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}
          <p> 
          By registering, you agree to our 
          <a className="terms" href="/terms">Terms and Conditions of Use</a>, 
          and <a className="terms" href="/privacy">Privacy Policy</a>.
          </p>
            {/* Conditional UI controls based on submission state */}
            {submissionState === 'processing' && <span>Processing...</span>}
            {submissionState === 'success' && <span>Success!</span>}
            {submissionState === 'error' && <span>Error. Please try again.</span>}
            {submissionState === 'idle' && <button type="submit" >Register</button>}
          </div>
        </form>
        {Object.values(error).map((error, index)=> 
        (error && <p key={index} className="error"> {error} 
      </p> ) )}
      
      
    </section>
  );
};

export default Register;
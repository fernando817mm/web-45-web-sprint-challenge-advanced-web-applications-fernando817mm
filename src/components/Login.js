import axios from "axios";
import React, { useState } from "react";

const initialValue = {
  username: '',
  password: ''
}

// const initialFormError = false;

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ formValue, setFormValue ] = useState(initialValue);
  const [ formError, setFormError ] = useState(false)
  
  //replace with error state
  const error = formError;

  const formValidity = (user) => {
    if(user.username.length === 0 || user.password.length === 0){
      return false;
    }else{
      return true;
    }
  }

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formValidity(formValue)){
      if(formValue.username === 'Lambda' && formValue.password === 'School'){
        axios.post('http://localhost:5000/api/login', formValue)
          .then(res => {
            localStorage.setItem('token', res.data.payload);
          })
          .catch(err => {
            alert(err);
          })
      }
      setFormValue(initialValue);
      setFormError(false);
      window.location.replace('http://localhost:3000/bubbles');
    }else{
      setFormError(true);
    }
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid='loginForm' className='login-form'>
        <form onSubmit={handleSubmit}>
          <label>Username: &nbsp;
            <input
              type='text'
              name='username'
              id='username'
              onChange={handleChange}
              value={formValue.username}
            />
          </label>
          <label>Password: &nbsp;
            <input
              type='password'
              name='password'
              id='password'
              onChange={handleChange}
              value={formValue.password}
            />
          </label>
          <button id='submit'>Submit</button>
        </form>
        { error && <p id="error" className="error">Username or Password not valid.</p>}
      </div>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"
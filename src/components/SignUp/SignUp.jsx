import React, {useState , useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import './SignUp.css'
import Form from 'react-bootstrap/Form';
import axios from 'axios';


function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState([]);

  async function checkValues(){
    var t = true;
    const usernames = await axios.get('http://localhost:3001/api/getUsernames').then(res => {return res.data});
    console.log(usernames);
    if (name === ''){
      setError(error => [...error, 'Name is required']);
      t =false;
    }
    if (username === ''){
      setError(error => [...error, 'Username is required']);
      t =false;
    }
    if (email === ''){
      setError(error => [...error, 'Email is required']);
      t =false;
    }
    if (password === ''){
      setError(error => [...error, 'Password is required']);
      t =false;
    }else if (password.length < 6){
      setError(error => [...error, 'Password must be at least 6 characters']);
      t =false;
    }
    if (!email.includes('@') || !email.includes('.') || email.includes(' ')){
      setError(error => [...error, 'Email is invalid']);
      t =false;
    }
    if (!checked){
      setError(error => [...error, 'You must agree to the Terms and Conditions']);
      t =false;
    }
    if (username.includes(' ')){
      setError(error => [...error, 'Username cannot contain spaces']);
      t =false;
    }
    if (Array.from(usernames).includes(username)){
      setError(error => [...error, 'Username is already taken']);
      t =false;
    }
    return t;
  }

  async function handleClick() {
    setError([]);
    var check = await checkValues();
    if (check === true){
        axios.get(`http://localhost:3001/api/pushData?username=${username}&name=${name}&password=${password}&email=${email}`).then((res) => {navigate(`/profilemaking/${username}`)});
      };
    }

  if (window.innerWidth < 960){
    return (
      <div className='SignUp'>
      <section className="side-content">
        <div className='logo'>
        <a href="/" className="auth-sidebar-logo">
          <img src="logo.png" height="56" width="56" alt="logo" />
        </a>
        <h1 className="typewriter">We Create What You Want!</h1>
        <img src="banner.png" className="auth-sidebar-banner" alt="banner" />
        <a className="auth-sidebar-credit" href="">@Aeonaxy</a>
        </div>
      </section>
      <section className="main-content">
        <main>
          <div className="auth-content">
            <h2>Sign up to Aeonaxy</h2>
            <ul>
            {error.map((err) => <li>{err}</li>)}
            </ul>
            <div className="auth-form signup-form" data-hide-on-signup-form="">
            <Form>
              <div className="form-field">
                <fieldset className="user_name"><label for="user_name">Name</label><input autoComplete="name" className="text-input" type="text" name="user[name]" id="user_name" onChange={(e)=>{setName(e.target.value)}}/></fieldset>
              </div>
              <div className="form-field">
                <fieldset className="user_login"><label for="user_login">Username</label><input autoCorrect="off" autoCapitalize="off" autoComplete="username" className="text-input" type="text" name="user[login]" id="user_login" onChange={(e)=>{setUsername(e.target.value)}}/></fieldset>
              </div>
            <div className="form-field">
                <fieldset className="email"><label for="email">Email</label><input autoComplete="email" className="text-input" type="text" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/></fieldset>
            </div>
            <div className="form-field">
                <fieldset className="password"><label for="password">Password</label><input className="text-input" placeholder="6+ characters" type="password" name="user[password]" id="user_password" aria-autocomplete="list" onChange={(e)=>{setPassword(e.target.value)}}/></fieldset>
            </div>
            <div className="form-field check-wrap opt-in">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="I agree to the Terms and Conditions" onChange={(e) => console.log(e.target.value)} />
            </Form.Group>
            <button className="submitBtn" type="button" onClick={handleClick} >Create Account</button>
            </div>
            </Form>
            </div>
          </div>
        </main>
      </section>
    </div>
    )
  }else{
    return(
      <div className='SignUp'>
      <section className="side-content">
        <div className='logo'>
        <a href="/" className="auth-sidebar-logo">
          <img src="logo.png" height="56" width="56" alt="logo" />
        </a>
        <h1 className="about">We Create What You Want!</h1>
        <img src="banner.png" className="auth-sidebar-banner" alt="banner" />
        <a className="auth-sidebar-credit" href="">@Aeonaxy</a>
        </div>
      </section>
      <section className="main-content">
        <main>
          <div className="auth-content">
            <h2>Sign up to Aeonaxy</h2>
            <ul>
            {error.map((err) => <li>{err}</li>)}
            </ul>
            <div className="auth-form signup-form" data-hide-on-signup-form="">
            <Form>
            <div className="form-field-group">
              <div className="form-field">
                <fieldset className="user_name"><label for="user_name">Name</label><input autoComplete="name" className="text-input" type="text" name="user[name]" id="user_name" onChange={(e)=>{setName(e.target.value)}}/></fieldset>
              </div>
              <div className="form-field">
                <fieldset className="user_login"><label for="user_login">Username</label><input autoCorrect="off" autoCapitalize="off" autoComplete="username" className="text-input" type="text" name="username" id="username" onChange={(e)=>{setUsername(e.target.value)}}/></fieldset>
              </div>
            </div>
            <div className="form-field">
                <fieldset className="email"><label for="email">Email</label><input autoComplete="email" className="text-input" type="text" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/></fieldset>
            </div>
            <div className="form-field">
                <fieldset className="password"><label for="password">Password</label><input className="text-input" placeholder="6+ characters" type="password" name="user[password]" id="user_password" aria-autocomplete="list"  onChange={(e)=>{setPassword(e.target.value)}}/></fieldset>
            </div>
            <div className="form-field check-wrap opt-in">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="I agree to the Terms and Conditions" onChange={(e) => setChecked(e.target.checked)} />
            </Form.Group>
            <button className="submitBtn" type="button" onClick={handleClick}>Create Account</button>
            </div>
            </Form>
            </div>
          </div>
        </main>
      </section>
    </div>
    )
  }
};

export default SignUp

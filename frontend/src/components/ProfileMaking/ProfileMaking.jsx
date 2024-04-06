import './ProfileMaking.css'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';


function ProfileMaking() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState('/profilepic.jpeg');
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
    console.log(currentUrl.data);
  }, []);
  
  const handleClick = async() => {
    const {data, error} = await axios.get(`https://starfish-app-dgren.ondigitalocean.app/api/pushProfile?username=${username}&location=${location}&photo=${photo}`).then(res => {navigate(`/role/${username}`)});
  };

  const handlePhotoUpload = async(event) => {
    setPhoto(URL.createObjectURL(event.target.files[0]));
  };
    
  return (
    <div className='main-window'>
    <Navbar />
    <main className='main-form'>
      <div className='main-container'>
        <header class='header'>
          <h1 className='header-title'>Welcome!, Let's create your profile</h1>
          <p class="header-subtitle">Let others get to know you better!</p>
        </header>
        <section className='content'>
        <div class="avatar-upload" field-name="avatarUpload" componenttype="avatarUpload" iscustomcomponent="true" values="[object Object]">
          <label>Add an avatar</label> 
          <div className='avatar-container'>
            <div className='avater-drop'>
              <div className='avater-uploader'>
                <div className='drop-area'>
                  <img src={photo} id='photo'/>
                  <input type='file' id='file' onChange={handlePhotoUpload}/>
                  <label for='file' id='uploadbtn'><img src='/camera.png' height='30' width='30' /></label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="theme-underlined pm-form-field">
            <fieldset className="location">
              <label for="location" className='fs-4 pt-5 pb-4'>Location</label>
              <input className="location-input" type="text" name="location" id="location" onChange={(e)=>{setLocation(e.target.value)}} placeholder='Enter your location'/>
            </fieldset>
            <button className='submitbtn1' onClick={handleClick}>Next</button>
        </div>
        </section>
      </div>
    </main>
    </div>
  );
}

export default ProfileMaking;
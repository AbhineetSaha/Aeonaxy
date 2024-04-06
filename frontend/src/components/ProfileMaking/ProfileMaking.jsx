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

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imgname = event.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = Math.max(img.width, img.height);
          canvas.width = maxSize;
          canvas.height = maxSize;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(
            img,
            (maxSize - img.width) / 2,
            (maxSize - img.height) / 2
          );
          canvas.toBlob(
            (blob) => {
              const file = new File([blob], imgname, {
                type: "image/png",
                lastModified: Date.now(),
              });

              console.log(file);
              setPhoto(URL.createObjectURL(file));
            },
            "image/jpeg",
            0.8
          );
        };
      };
    }
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
                  <input type='file' id='file' onChange={handleImageChange}/>
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
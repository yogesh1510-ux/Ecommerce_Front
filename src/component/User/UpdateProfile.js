import React, { Fragment, useEffect } from 'react';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MetaData from "../layout/MetaData";
import FaceIcon from "@material-ui/icons/Face"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./UpdateProfile.css"
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updatePofile, updateProfile } from '../../actions/userActions';
import { clearErrors } from '../../actions/userActions';
import { useAlert } from "react-alert"
import Loading from '../layout/Loader/Loading';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';


const UpdateProfile = () => {


  const dispatch=useDispatch();
    const { user} = useSelector(state => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const alert=useAlert();
    const navigate=useNavigate();
    

    const [avatar,setAvatar] =useState();
    const [avatarPreview,setAvatarPreview] =useState("/Profile.png");
    
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
   

    const updateProfileDataChange = (e) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
  
      reader.readAsDataURL(e.target.files[0]);
      
  }

  const updateProfileSubmit = (e) =>{
     e.preventDefault();

     const myForm= new FormData();

     myForm.set("name",name);
     myForm.set("email",email);


     if(avatarPreview !==user.avatar.url){
      
      myForm.set("avatar",avatar);
     }

    
    
    dispatch(updateProfile(myForm));
    
  }

  useEffect(() => {

    if(user){
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
      
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

  if(isUpdated){
     alert.success("Profile updated Sucessfully");
     dispatch(loadUser());
     navigate("/account");

     dispatch({
      type:UPDATE_PROFILE_RESET
     })
  }


   
  }, [dispatch,error,alert,navigate,user,isUpdated])
  


  return (
    <Fragment>
      {loading ? <Loading/>
    :
    (
      <Fragment>
      <MetaData title="Update User Profile" />
      <div className='updateProfileContainer'>
            <div className='updateProfileBox' >
              <h2 className='updateProfileHeading' >Update Profile</h2>

            <form className='updateProfileForm'  onSubmit={updateProfileSubmit} encType='multipart/form-data' >
                        <div className='updateProfileName'>
                            <FaceIcon />
                            <input
                            type='text'
                            placeholder='name'
                            required
                            name='name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            />

                        </div>

                        <div className='updateProfileEmail'>
                            <MailOutlineIcon />
                            <input
                            type='email'
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />

                        </div>

                        

                        <div id='updateProfileImage' >
                            <img src={avatarPreview} alt='Avatar Preview'  />
                            <input
                            type='file'
                            name='avatar'
                            accept='image/*'
                            onChange={updateProfileDataChange}
                            />

                        </div>

                        <input
                        type='submit'
                        value='Update'
                        className='updateProfileBtn'
                      
                        />
                </form>


              </div>
              </div>
    </Fragment>
    )  
    
    }
    </Fragment>
  )
}

export default UpdateProfile
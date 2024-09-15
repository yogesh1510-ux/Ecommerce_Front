import React, { Fragment, useEffect, useRef } from 'react';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "./LoginSignUp.css"
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../actions/userActions';
import { clearErrors } from '../../actions/userActions';
import { useAlert } from "react-alert"
import Loading from '../layout/Loader/Loading';

const LoginSignUp = () => {
    

    const dispatch=useDispatch();
    const { error, loading , isAuthenticated} = useSelector(state => state.user);
    const location = useLocation();
    const alert=useAlert();
    const navigate=useNavigate();

    const loginTab = useRef(null);
    const registerTab =useRef(null);
    const switcherTab = useRef(null);

    const [user,setUser] =useState({
        name:"",
        email:"",
        password:""
    });

    const {name,email,password} = user;

    const [avatar,setAvatar] =useState();
    const [avatarPreview,setAvatarPreview] =useState("/Profile.png");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");


    const loginSubmit = (e) =>{
       e.preventDefault();
       dispatch(login(loginEmail,loginPassword));

    }

    const registerDataChange = (e) => {
        if(e.target.name==="avatar"){
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState===2){
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        else{
            setUser({...user,[e.target.name]:[e.target.value]})
        }
    }

    const registerSubmit = (e) =>{
       e.preventDefault();

       const myForm= new FormData();

       myForm.set("name",name);
       myForm.set("email",email);
       myForm.set("password",password);
       myForm.set("avatar",avatar);
      dispatch(register(myForm));
    }


    

    useEffect(() => {
        
      if(error){
        
        if(error !=="please login to acess required resources"){
            alert.error(error);
        }
        
        dispatch(clearErrors())
      }

    if(isAuthenticated){
        // navigate(redirect);

        if(location.search){
            navigate("/shipping");
        }
        else{
            navigate("/account");
        }
    }
     
    }, [dispatch,error,alert,isAuthenticated,navigate])
    


    const switchTabs = (e,tab) =>{
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralform");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralform");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

  return (
   <Fragment>
    {
        loading ?  <Loading />
        :
        <Fragment>
        <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox' >
                <div  >
                    <div className='Login_signUp_toggle' >
                        <p onClick={(e) => switchTabs(e,"login")} >LOGIN</p>
                        <p onClick={(e) => switchTabs(e,"register")} >REGISTER</p>

                    </div>
                    <button ref={switcherTab} ></button>

                </div>

                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className='LoginEmail' >
                        <MailOutlineIcon />
                        <input
                        type='email'
                        placeholder='Email'
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    
                     <div className='LoginPassword' >
                        <LockOpenIcon />
                        <input
                        type='password'
                        placeholder='password'
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>

                    <Link to="/password/forgot" >Forget Password ?</Link>
                    <input type='submit' value="Login"  className='loginBtn'  />

                </form>

                <form className='signUpForm' ref={registerTab} onSubmit={registerSubmit} encType='multipart/form-data' >
                        <div className='signUpName'>
                            <FaceIcon />
                            <input
                            type='text'
                            placeholder='name'
                            required
                            name='name'
                            value={name}
                            onChange={registerDataChange}
                            />

                        </div>

                        <div className='signUpEmail'>
                            <MailOutlineIcon />
                            <input
                            type='email'
                            placeholder='Email'
                            required
                            name='email'
                            value={email}
                            onChange={registerDataChange}
                            />

                        </div>

                        <div className='signUpPassword'>
                            <LockOpenIcon />
                            <input
                            type='password'
                            placeholder='Password'
                            required
                            name='password'
                            value={password}
                            onChange={registerDataChange}
                            />

                        </div>

                        <div id='registerImage' >
                            <img src={avatarPreview} alt='Avatar Preview'  />
                            <input
                            type='file'
                            name='avatar'
                            accept='image/*'
                            onChange={registerDataChange}
                            />

                        </div>

                        <input
                        type='submit'
                        value='Register'
                        className='signUpBtn'
                      
                        />
                </form>

            </div>

        </div>
        
    </Fragment>
    }


   </Fragment>
   
  )
}

export default LoginSignUp
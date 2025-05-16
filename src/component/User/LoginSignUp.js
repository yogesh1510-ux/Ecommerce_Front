import React, { Fragment, useEffect, useRef, useState } from 'react';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./LoginSignUp.css";
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearErrors } from '../../actions/userActions';
import { useAlert } from "react-alert";
import Loading from '../layout/Loader/Loading';

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const { error, loading, isAuthenticated } = useSelector(state => state.user);
    const location = useLocation();
    const alert = useAlert();
    const navigate = useNavigate();

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const { name, email, password } = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.jpg");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0];

            if (file && !["image/jpeg", "image/jpg"].includes(file.type)) {
                alert.error("Only JPG or JPEG images are allowed");
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const registerSubmit = async (e) => {
  e.preventDefault();
  const myForm = new FormData();

  myForm.set("name", name);
  myForm.set("email", email);
  myForm.set("password", password);

  if (!avatar) {
    const response = await fetch("/Profile.jpg");
    const blob = await response.blob();
    const base64 = await toBase64(blob);
    myForm.set("avatar", base64);
  } else {
    myForm.set("avatar", avatar);
  }

  dispatch(register(myForm));
};


    useEffect(() => {
        if (error && error !== "please login to acess required resources") {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(location.search ? "/shipping" : "/account");
        }
    }, [dispatch, error, alert, isAuthenticated, navigate, location.search]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralform");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralform");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <Fragment>
            {loading ? (
                <Loading />
            ) : (
                <Fragment>
                    <div className='LoginSignUpContainer'>
                        <div className='LoginSignUpBox'>
                            <div>
                                <div className='Login_signUp_toggle'>
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>

                            {/* Login Form */}
                            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                <div className='LoginEmail'>
                                    <MailOutlineIcon />
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className='LoginPassword'>
                                    <LockOpenIcon />
                                    <input
                                        type='password'
                                        placeholder='Password'
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot">Forget Password?</Link>
                                <input type='submit' value="Login" className='loginBtn' />
                            </form>

                            {/* Register Form */}
                            <form className='signUpForm' ref={registerTab} onSubmit={registerSubmit} encType='multipart/form-data'>
                                <div className='signUpName'>
                                    <FaceIcon />
                                    <input
                                        type='text'
                                        placeholder='Name'
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
                                <div id='registerImage'>
                                    <img src={avatarPreview} alt='Avatar Preview' />
                                    <input
                                        type='file'
                                        name='avatar'
                                        
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input type='submit' value='Register' className='signUpBtn' />
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default LoginSignUp;

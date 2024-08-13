import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './SignupLoginBox.module.css';
import AuthButton from '../AuthComponents/AuthButton/AuthButton';
import GoogleButton from '../AuthComponents/GoogleButton/GoogleButton';
import AuthTextField from '../AuthComponents/AuthTextField/AuthTextField';
import RegisterButton from '../AuthComponents/RegisterButton/RegisterButton';
import { sendOtpEmail,findUser,loginEmail,verifyOtp,googleLogin } from '../../http'; // Adjust import paths accordingly
import { useDispatch,useSelector } from 'react-redux';
import { setOtp,setAuth } from '../../store/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';

const SignupLoginBox = ({ isSignup, onToggle, className = "app-container" }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtpValue] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const dispatch = useDispatch();
  const {hash} = useSelector((state)=> state.auth.otp)
  const navigate = useNavigate();
  useEffect(() => {
    let interval;
    if (showOtpField) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpField]);

  const responseGoogle = async (response) => {
    try {
        const { data } = await googleLogin({ token: response.credential });
        dispatch(setAuth(data));
        navigate('/');
    } catch (error) {
        toast.error('Google login failed why');
    }
};

  const handleRegister = async () => {
    console.log(email);
    console.log(password);
    console.log(username);
    if (!email || !password || (isSignup && !username)) {
      toast.error('All fields are required', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark",
      });
      return;
    }

    
    try {
      const { data } = await findUser({ username, email });
      if (data.usernameExists) {
        toast.error('Username already exists', { position: "bottom-center", autoClose: 5000, theme: "dark" });
        return;
      }
      if (data.emailExists) {
        toast.error('Email already exists', { position: "bottom-center", autoClose: 5000, theme: "dark" });
        return;
      }

      if (showOtpField) {
        // Here you would verify the OTP
        await handleVerifyOtp();
      } else {
        const { data } = await sendOtpEmail({ email });
        dispatch(setOtp({ email, hash: data.hash, password }));
        setShowOtpField(true);
        setTimer(30);
        setCanResend(false);
      }
    } catch (error) {
      toast.error('Error finding user', { position: "bottom-center", autoClose: 5000, theme: "dark" });
      console.error('Error finding user', error);
    }
  };

  const handleLogin = async () => {

    if (!email || !password) {
        toast.error('Both fields are required', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
            theme: "dark",
        });
        return;
    }

    try {
        const { data } = await loginEmail({ email, password });

        if (data.auth) {
            dispatch(setAuth(data));
            navigate('/');
        }
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message;
            toast.error(message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 1,
                theme: "dark",
            });
        } else {
            console.error(error);
        }
    }
};

  const handleResendOtp = async () => {
    event.preventDefault(); 
    const { data } = await sendOtpEmail({ email });
    dispatch(setOtp({ email, hash: data.hash, password }));
    setCanResend(false);
  };
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error('Please enter the OTP', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "dark",
      });
      return;
    }

      try {
        const { data } = await verifyOtp({ otp, email, hash, password, name: username }); // Include name in the payload
        if (data.isValid === false) {
          toast.error('Invalid OTP', { position: "bottom-center", autoClose: 5000, theme: "dark" });
        } else {
          dispatch(setAuth(data));
          navigate('/'); // Navigate to home page
        }
      } catch (error) {
        toast.error('Error verifying OTP', { position: "bottom-center", autoClose: 5000, theme: "dark" });
        console.error('Error verifying OTP', error);
      }
  };

  return (
    <div className={[styles.signup, className].join(" ")}>
      <div className={styles.authContentParent}>
        <AuthButton
          text="SignUp"
          color="#000"
          bgColor={isSignup ? "#ffcf3c" : "#fff"}
          onClick={() => onToggle(true)}
        />
        <AuthButton
          text="Login"
          color="#000"
          bgColor={isSignup ? "#fff" : "#ffcf3c"}
          onClick={() => onToggle(false)}
        />
      </div>
      <main className={styles.loginDividerParent}>
        <section className={styles.loginDivider} />
        <div className={styles.welcome}>
          <b className={styles.welcomeToJeecode}>Welcome to JeeCode</b>
        </div>
        <section className={styles.signupForm}>
          <form className={styles.credentials}>
            <div className={styles.usernameInput}>
              <div className={styles.usernameField}>
                <div className={styles.createYourJeecode}>
                  {isSignup ? 'Create Your JeeCode Account' : 'Already have an account?'}
                </div>
              </div>
              <div className={styles.googleLoginParent}>
              <GoogleOAuthProvider clientId="520555599117-1pfcppsid4cvdpk6qu1gcc22orqjcc64.apps.googleusercontent.com">
                <div className={styles.googleLogin}>
                
                <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={() => {
                                toast.error('Google login failed');
                            }}
                            theme="outline"
                            text="Continue with Google"
                        /> 
                </div>
                </GoogleOAuthProvider>
                <div className={styles.separator}>
                  <div className={styles.or}>OR</div>
                </div>
                {isSignup && (
                  <>
                    <div className={styles.usernameField}></div>
                    <div className={styles.jeeCodeUsername}>
                      <div className={styles.jeecodeUsername}>JeeCode Username:</div>
                      <AuthTextField placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                  </>
                )}
                <div className={styles.emailInput}>
                  <div className={styles.email}>Email:</div>
                </div>
                <AuthTextField placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className={styles.jeecodePassword}>JeeCode Password:</div>
                <AuthTextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {showOtpField && (
                  <>
                    <div className={styles.jeeCodeUsername}>
                      <div className={styles.jeecodeUsername}>OTP:</div>
                      <AuthTextField placeholder="Enter OTP" type="text" value={otp} onChange={(e) => setOtpValue(e.target.value)} />
                      <div className={styles.jeecodeUsername}>
                        {timer > 0 ? (
                          <span>Resend OTP in {timer} seconds</span>
                        ) : (
                          <span>
                            Didn't receive the OTP? <button onClick={handleResendOtp} disabled={!canResend}>Resend OTP</button>
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={styles.registerButton}>
              <RegisterButton text={isSignup ? (showOtpField ? "Verify" : "Register") : "Login"} onClick={isSignup ? handleRegister : handleLogin} />
            </div>
          </form>
          <div className={styles.footer}>
            <img
              className={styles.image57Icon}
              loading="lazy"
              alt=""
              src="/images/banner.png"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

SignupLoginBox.propTypes = {
  className: PropTypes.string,
};

export default SignupLoginBox;

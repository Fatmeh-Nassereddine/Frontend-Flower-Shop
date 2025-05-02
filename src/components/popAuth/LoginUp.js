



import React, { useState } from "react";
import "./LoginUp.css";
import { useNavigate } from "react-router";
import Header from '../Header';
import Footer from '../Footer';
import { useAuth } from "../../hooks/AuthContext"; // from context!
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginUp() {
  const [isRegister, setIsRegister] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", address: "" });


  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);


  const { loginUser, registerUser } = useAuth(); // use context
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
    try {
      await loginUser(loginForm.email, loginForm.password); // context will auto redirect
      
      toast.success("Welcome back!");
    } catch (err) {
      
      toast.error(err.message);
    }finally {
      setIsLoggingIn(false); // always stop spinner
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setIsRegistering(true);
    try {
      await registerUser(
        registerForm.name,
        registerForm.email,
        registerForm.password,
        registerForm.address
      );
      
      toast.success("Registered successfully! Please login.");
      setIsRegister(false); // switch back to login form
    } catch (err) {
      toast.error(err.message);
    }finally {
      setIsRegistering(false); // always stop spinner
    }
  };

  return (
    <>
      <Header />
      <section className="log-popup">
        <div className="forms-wrapper">
          <div className={isRegister ? "log-header-left" : "log-header"}>
            <h1 className="indicator-title">Login</h1>
            <h1 className="indicator-title">Register</h1>
          </div>
          <div className={isRegister ? "map-left" : "map"}>
            <div className="depending"></div>
            <button className="destination-1" onClick={() => setIsRegister(false)}>Login</button>
            <button className="destination-2" onClick={() => setIsRegister(true)}>Register</button>
          </div>
          <div className={isRegister ? "log-body-left" : "log-body"}>
            {/* Login Form */}
            <form className="login child" onSubmit={handleLoginSubmit}>
              
              <div className="user-input-wrp">
                <input
                  name="email"
                  type="text"
                  className='inputText'
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
                <span className="floating-label">Email</span>
              </div>
              <div className="user-input-wrp">
                <input
                  name="password"
                  type="password"
                  className='inputText'
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
                <span className="floating-label">Password</span>
              </div>
              <button className="login-button" type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? "Logging in..." : "Login"}</button>
            </form>

            {/* Register Form */}
            <form className="register child" onSubmit={handleRegisterSubmit}>
              
              <div className="user-input-wrp">
                <input
                  name="name"
                  type="text"
                  className='inputText'
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  required
                />
                <span className="floating-label">Name</span>
              </div>
              <div className="user-input-wrp">
                <input
                  name="email"
                  type="text"
                  className='inputText'
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  required
                />
                <span className="floating-label">Email</span>
              </div>
              <div className="user-input-wrp">
                <input
                  name="password"
                  type="password"
                  className='inputText'
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  required
                />
                <span className="floating-label">Password</span>
              </div>
              <div className="user-input-wrp">
                <input
                  name="address"
                  type="text"
                  className='inputText'
                  value={registerForm.address}
                  onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                  required
                />
                <span className="floating-label">Address</span>
              </div>
              <button className="login-button" type="submit" disabled={isRegistering}>
              {isRegistering ? "Registering..." : "Register"}
             </button>
            </form>
          </div>
          <div className="guid">
            <button onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default LoginUp;

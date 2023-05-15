import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from '../axiosClient';
import { useStateContext } from "../contexts/ContextProvider";

const Register = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [errors, setErrors] = useState(null)

  const {setUser, setToken} = useStateContext()

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          password_confirmation: passwordConfirmationRef.current.value
        }
        console.log(payload)
        axiosClient.post('/register', payload)
        .then(({data})=>{
          setUser(data.user)
          setToken(data.token)
        })
        .catch(err=>{
          const response = err.response;
          if(response && response.status === 422){
            console.log(response.data.errors)
            setErrors(response.data.errors)
          }
        })
    };
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="title">Create an account</h1>
            {errors && 
            <div className="alert">
              {Object.keys(errors).map(key=>(
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
            }
            <input ref={nameRef} type="text" placeholder="Full Name" />
            <input ref={emailRef} type="email" placeholder="Email Address" />
            <input ref={passwordRef} type="password" placeholder="Password" />
            <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
            <button type="submit" className="btn btn-block">
                Signup
            </button>
            <p className="message">
                Already registered? <Link to="/login">Sign In</Link>
            </p>
        </form>
    );
};

export default Register;

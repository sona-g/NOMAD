import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { register } from '../../actions/auth';

const Register = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
      try {
        const res = await register(
        {name:name, email:email, password:password}
      );
      console.log("REGISTER USER", res);
      toast.info("Registeration Complete. Please Login");
      navigate("../login", { replace: true });
      } catch (error) {
        console.log(error);
        if(error.response.status === 400) {
            toast.info(error.response.data)
        }
      }
        setName("");
        setEmail("");
        setPassword("");
    }

    const registerForm = () => {
        return(
        <form className='mt-3 text-center' onSubmit={handleSubmit}>
            <div className='form-group mb-3'>
                <label className='form-label'>Your Name</label>
                <input type="text"
                    className="form-control"
                    placeholder="enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Email</label>
                <input type="email"
                    className="form-control"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='form-group mb-3'>
                <label className='form-label'>Password</label>
                <input type="password"
                    className="form-control"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className='btn btn-warning' disabled={!name || !email || !password}>REGISTER</button>
        </form>
        )
    }

    return (
        <>
            {/* <div className="container-fluid bg-light p-3 text-center" >
                <h5>REGISTER</h5>
            </div> */}
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>{registerForm()}</div>
                </div>
            </div>
        </>
    );
};

export default Register;
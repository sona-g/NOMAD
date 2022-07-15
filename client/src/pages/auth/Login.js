import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import { useDispatch } from 'react-redux';

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SEND LOGIN DATA", { email, password });
        try {
            const res = await login(
                { email: email, password: password }
            );
            if (res.data) {
                console.log("SAVE USER IN REDUX & REDIRECT")
                //console.log(res.data)
                //save user and token to local storage
                window.localStorage.setItem("auth", JSON.stringify(res.data));
                //save user and token to redux
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data
                })
            }
            navigate("/", { replace: true });
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                toast.info(error.response.data)
            }
        }
        setEmail("");
        setPassword("");
    }

    const loginForm = () => {
        return (
            <form className='mt-3 text-center' onSubmit={handleSubmit}>
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
                <button className='btn btn-warning' disabled={!email || !password}>LOGIN</button>
            </form>
        )
    }
    return (
        <>
            {/* <div className="container-fluid bg-light p-3 text-center" >
                <h5>LOGIN</h5>
            </div> */}
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3'>{loginForm()}</div>
                </div>
            </div>
        </>
    );
};

export default Login;
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import nomadLogo from '../image/nomad_logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null
    })
    window.localStorage.removeItem("auth")
  }

  return (
    <div className="nav bg-warning text-dark d-flex justify-content-between">
      <Link className="nav-link" to="/"><img style={{width: '10%'}}src={nomadLogo} alt='' /></Link>
      {auth !== null && (
          <Link className="nav-link text-black-50" to="dashboard">Dashboard</Link>
      )}
      {auth !== null && (
        <>
        <Link className="nav-link text-black-50" to="login" onClick={logout}>Logout</Link>
        </>
      )}
      {auth === null && (
        <>
          <Link className="nav-link text-black-50" to="login">Login</Link>
          <Link className="nav-link text-black-50" to="register">Register</Link>
        </>
      )}

    </div>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
    const active = window.location.pathname;
    return (
        <div>
            <ul className='nav nav-tabs'>
                <li className='nav-item'>
                    <Link className={`nav-link text-black-50 ${active === "dashboard" && "active"}`} to="/dashboard">Your Bookings</Link>
                </li>
                <li className='nav-item'>
                    <Link className={`nav-link text-black-50 ${active === "dashboard/seller" && "active"}`} to="/dashboard/seller">Your Hotels</Link>
                </li>
            </ul>
        </div>
    );
};

export default DashboardHeader;
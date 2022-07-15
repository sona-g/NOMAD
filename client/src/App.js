import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/booking/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/Header';
import Dashboard from './pages/userActivity/Dashboard';
import DashboardSeller from './pages/userActivity/DashboardSeller';
import PrivateRoute from './components/PrivateRoute';
import NewHotel from './pages/hotels/NewHotel';
import StripeCallback from './pages/userActivity/StripeCallback';
import EditHotel from './pages/hotels/EditHotel';
import HotelDetail from './pages/hotels/HotelDetail';
import StripeSuccess from './pages/userActivity/StripeSuccess';
import StripeCancel from './pages/userActivity/StripeCancel';
import SearchResult from './pages/userActivity/SearchResult';


function App() {
  return (
    
    <div>
      <BrowserRouter>
      <Header />
      <ToastContainer position="top-center"/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register/>} />
        <Route path="/hotel/:hotelId" element={<HotelDetail/>} />
        <Route path="/searchresult" element={<SearchResult />}/>

        <Route path="/" element={<PrivateRoute />}>

        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="dashboard/seller" element={<DashboardSeller />}/>
        <Route path="hotels/new" element={<NewHotel />}/>
        <Route path="hotel/edit/:hotelId" element={<EditHotel />}/>
        <Route path="stripe/callback" element={<StripeCallback />}/>
        <Route path="stripe/success/:hotelId" element={<StripeSuccess />}/>
        <Route path="stripe/cancel" element={<StripeCancel />}/>
        
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

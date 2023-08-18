import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { BsPerson, BsGraphUp, BsTools } from "react-icons/bs"; 
import "../styles/navbarstyles.css";

export default function Navbar() {
  const navRef = useRef();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  function userLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }
  

  return (
    <header className="header">
      <a className="logo" onClick={() => { navigate('/homepage') }}>BHCVN</a>
      <nav ref={navRef} className="nav-links">
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
        <button href="/#" className="nav-link" onClick={() => { navigate('/profile') }}>
        <BsPerson className="nav-icon" /> Profile 
        </button>
        <button href="/#" className="nav-link">
        <BsGraphUp className="nav-icon" /> Sales 
        </button>
        <button href="/#" className="nav-link" onClick={() => { navigate('/cart') }}>
        <FaShoppingCart className="nav-icon"/> Cart 
        </button>
        <button href="/#" className="nav-link" onClick={() => { navigate('/adminpanel') }}>
        <BsTools className="nav-icon"/> Admin Panel 
        </button>
        <button href="/#" className="nav-link" onClick={userLogout}>
        <FiLogOut className="nav-icon"/> Logout
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}


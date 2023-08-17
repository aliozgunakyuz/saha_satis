import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { BsPerson, BsGraphUp, BsTools } from "react-icons/bs"; // Import icons you need
import "../styles/navbarstyles.css";

export default function Navbar() {
  const navRef = useRef();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className="header">
      <a className="logo">LOGO</a>
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
        <button href="/#" className="nav-link">
        <FaShoppingCart className="nav-icon"/> Cart 
        </button>
        <button href="/#" className="nav-link">
        <BsTools className="nav-icon"/> Admin Panel 
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

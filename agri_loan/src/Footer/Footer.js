import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <div className="footer-container">
        <div className="footer-section">
          <p className="title-card-footer">
            <img className="footer-logo" src="plant.svg" alt="Logo" />
            Crop<span className="footer-title">Credit</span>
          </p>
          <p className="footer-description">India's largest lending platform</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Loan Products</h3>
          <ul>
            <li>Crop Loan</li>
            <li>Digital Gold Loan</li>
            <li>Agri Credit Card</li>
            <li>Farm Mechanisation Loan</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Other Links</h3>
          <ul>
            <li>About</li>
            <li>Career</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul>
            <li className="footer-contact">
              <MdEmail className="footer-icon" /> support@CropCredit.com
            </li>
            <li className="footer-contact">
              <MdPhone className="footer-icon" /> +91 9345556893
            </li>
          </ul>
          <div className="footer-social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedinIn />
          </div>
          <div>
            <h3 className="footer-heading">Visit Our App</h3>
            <img src="/qr.png" alt="QR Code" className="footer-qr-code" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-and-conditions">Terms and Conditions</a>
          <a href="/disclaimer">Disclaimer</a>
        </div>
        <p className="footer-copyright">© 2018-2024 Online CropCredit. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

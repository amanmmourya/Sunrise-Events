import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <FooterWrapper>
            <div className="footer-container">
                <div className="footer-section about">
                    <h3>Sunrise Events</h3>
                    <p className='footer-text'>To grow this to Pan India Production Level</p>
                </div>

                <div className="footer-section links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><NavLink to={"/home"}>Home</NavLink></li>
                        <li><NavLink to={"/services"}>Services</NavLink></li>
                        <li><NavLink to={"/gallery"}>Gallery</NavLink></li>
                        <li><NavLink to={"/contact"}>Contact</NavLink></li>
                    </ul>
                </div>

                <div className="footer-section social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/SunriseEvent.in/"><FaFacebook /></a>
                        <a href="https://www.instagram.com/sunriseevents.in/"><FaInstagram /></a>
                        <FaTwitter />
                        <FaLinkedin />
                    </div>
                </div>

                <div className="footer-section newsletter">
                    <h4>Subscribe to Our Newsletter</h4>
                    <input type="email" placeholder="Enter your email" />
                    <button>Subscribe</button>
                </div>
            </div>

            <div className="footer-bottom">
                <p className='footer-text'>&copy; 2025 Sunrise Events | Terms & Conditions | Privacy Policy</p>
            </div>
        </FooterWrapper>
    );
};

const FooterWrapper = styled.footer`
.footer-text{
color:white;
}
    background-color: #000;
    color: #fff;
    padding: 3vh 5vw;

    .footer-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 2vw;
        margin-bottom: 2vh;
    }

    .footer-section {
        flex: 1 1 20%;
        margin-bottom: 2vh;
    }

    .about h3 {
        font-size: 2.5vh;
        margin-bottom: 1vh;
    }

    .links ul {
        list-style: none;
        padding: 0;
    }

    .links li {
        margin: 0.5vh 0;
        cursor: pointer;
        transition: color 0.3s;
    }

    .links li:hover {
        color: #e0aa3e;
    }

    .social-icons {
        display: flex;
        gap: 1vw;
        font-size: 2.5vh;
        margin-top: 1vh;
        cursor: pointer;
    }

    .social-icons svg:hover {
        color: #e0aa3e;
    }

    .newsletter input {
        padding: 0.5vh 1vw;
        margin-top: 1vh;
        border: none;
        border-radius: 5px;
        width: 80%;
    }

    .newsletter button {
        margin-top: 1vh;
        padding: 0.5vh 2vw;
        background-color: #e0aa3e;
        border: none;
        color: #000;
        border-radius: 5px;
        cursor: pointer;
    }

    .newsletter button:hover {
        background-color: #c7952e;
    }

    .footer-bottom {
        text-align: center;
        border-top: 1px solid #333;
        padding-top: 2vh;
        font-size: 1.5vh;
    }

    @media (max-width: 768px) {
        .footer-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .footer-section {
            flex: 1 1 100%;
            margin-bottom: 3vh;
        }

        .social-icons {
            justify-content: center;
        }
    }
`;

export default Footer;
import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Wrapper = styled.section`
  font-family: 'Playfair Display', serif;
  color: #4a1a1a;


  .contact-section {
    display: flex;
    justify-content: center;
    padding: 4rem 2rem;
  }

  .contact-box {
    display: flex;
    flex-wrap: wrap;
    background: linear-gradient(to right, #fff1f2, #ffffff);
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(255, 192, 203, 0.2);
    padding: 2.5rem;
    max-width: 1000px;
    width: 100%;
    gap: 2rem;
  }

  .left,
  .right {
    flex: 1 1 400px;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #dc2626;
  }

  .info-group {
    margin-bottom: 2rem;
  }

  .info-label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #dc2626;
    font-size: 1.5rem;
  }

  .info-value {
    margin: 0.3rem 0;
    font-size: 1.5rem;
    color: #333;
  }

  .address {
    margin-top: 2rem;
  }

  .social-icons {
    display: flex;
    gap: 1.2rem;
    margin-top: 1rem;
  }

  .social-icons a {
    font-size: 2rem;
    color: #b30059;
    transition: 0.3s;
  }

  .social-icons a:hover {
    color: #ff69b4;
  }

  @media (max-width: 768px) {
    .hero {
      font-size: 2rem;
    }

    .contact-box {
      flex-direction: column;
      padding: 2rem;
    }

    .left, .right {
      width: 100%;
    }
  }
`;

const Contact = () => {
  return (
    <Wrapper>

      <div className="contact-section m-4">
        <div className="contact-box">
          <div className="left">
            <div className="section-title">Contact Information</div>

            <div className="info-group">
              <div className="info-label">For Vendors</div>
              <div className="info-value">📧 Sunriseevents.in@gmail.com</div>
              <div className="info-value">📞 +91 98878 29699</div>
            </div>

            <div className="info-group">
              <div className="info-label">For Customers</div>
              <div className="info-value">📧 Sunriseevents.in@gmail.com</div>
              <div className="info-value">📞 +91 98878 29699</div>
            </div>

            <div className="address">
              <div className="info-label">Office Address</div>
              <div className="info-value">
                Near, 110, Aagam Ochid, Nadani-2, Vesu, Surat,<br />
                Gujarat 395007
              </div>
            </div>
          </div>

          <div className="right">
            <div className="section-title">Follow Us</div>
            <div className="info-value">Stay updated and inspired by our latest wedding stories and offers.</div>
            <div className="social-icons">
              <a href="https://www.instagram.com/sunriseevents.in/" target="_blank" rel="noreferrer" ><FaInstagram color='#dc2626'/></a>
              <a href="https://www.facebook.com/SunriseEvent.in/" target="_blank" rel="noreferrer"><FaFacebook color='#dc2626'/></a>
              <a href="https://twitter.com/sunriseevents" target="_blank" rel="noreferrer"><FaTwitter color='#dc2626' /></a>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;

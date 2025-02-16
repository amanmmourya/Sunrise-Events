import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Wrapper = styled.section`
  padding: 4rem 2rem;
  // background: linear-gradient(135deg, #f9fafb, #e0eafc);


  .contact-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-between;
  }

  .left-contact, .right-contact {
    flex: 1 1 45%;
    background-color: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .large-heading {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .small-heading {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .big-text {
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .social-links {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .social-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .icon {
      font-size: 2rem;
      color: #4f46e5;
    }

    a {
      text-decoration: none;
      color: #333;
      font-size: 1rem;
      font-weight: 500;

      &:hover {
        color: #6366f1;
      }
    }
  }

  @media (max-width: 768px) {
    .contact-container {
      flex-direction: column;
      align-items: center;
    }

    .left-contact, .right-contact {
      width: 100%;
    }
  }
`;

const Contact = () => (
  <Wrapper>
    <div className="contact-container ">
      <div className="left-contact">
        <div className="large-heading">Contact Us to get the best deals</div>
        <div className="contact-info">
          <div className="info-block">
            <div className="small-heading">For Vendors</div>
            <a href="mailto:Sunriseevents.in@gmail.com" className="big-text">Sunriseevents.in@gmail.com</a>
            <div className="big-text">+91 98878 29699</div>
          </div>
          <div className="info-block">
            <div className="small-heading">For Customers</div>
            <a href="mailto:Sunriseevents.in@gmail.com" className="big-text">Sunriseevents.in@gmail.com</a>
            <div className="big-text">+91 98878 29699</div>
          </div>
        </div>
        <div className="small-heading">Address Details</div>
        <div className="big-text">Near, 110, Aagam Ochid, Nadani-2, Vesu, Surat, Gujarat 395007</div>
      </div>
      <div className="right-contact">
        <div className="large-heading">Follow us on</div>
        <div className="social-links">
          <div className="social-item">
            <FaInstagram className="icon" />
            <a href="https://www.instagram.com/sunriseevents.in/">Instagram</a>
          </div>
          <div className="social-item">
            <FaFacebook className="icon" />
            <a href="https://www.facebook.com/SunriseEvent.in/">Facebook</a>
          </div>
          <div className="social-item">
            <FaTwitter className="icon" />
            <a href="https://twitter.com/sunriseevents">Twitter</a>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
);

export default Contact;
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 6rem 2rem;
  // background: linear-gradient(135deg, #ffe6f0, #ffb3c6);
  color: #333;

  .contact-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    font-size:xx-large;
    font-weight:600;
    // text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  iframe {
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    margin-bottom: 2rem;
  }

  form {
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 700px;
    width: 100%;

    input, textarea {
      padding: 1.2rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 1.1rem;
      width: 100%;
    }

    input[type="submit"] {
      background: #DC2626;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #e6005c;
      }
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 2.5rem;
    }

    form {
      padding: 1.5rem;
      max-width: 100%;
    }
  }
`;

const Conact = () => (
  <Wrapper>
    <h2>Feel free to contact us</h2>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.6162324341494!2d78.167748775199!3d26.20915947707354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c426482f001d%3A0x181b55c85765c93d!2sItalian%20Garden!5e0!3m2!1sen!2sin!4v1730277914206!5m2!1sen!2sin" width="100%" height="450" loading="lazy" allowFullScreen="" referrerPolicy="no-referrer-when-downgrade"></iframe>
    <div className="contact-container">
      <form action="https://formspree.io/f/mwpklkvn" method="POST">
        <input type="text" name="username" placeholder="Your Name" required />
        <input type="email" name="Email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" rows="6" required></textarea>
        <input type="submit" value="Send Message" />
      </form>
    </div>
  </Wrapper>
);

export default Conact;

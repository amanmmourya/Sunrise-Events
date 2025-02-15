import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4rem 0;
  text-align: center;

  h2 {
    font-size: 5rem;
    margin-bottom: 2rem;
    font-weight:500;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    margin-top: 2rem;
  }

  iframe {
    border: 0;
    width: 90%;
    height: 350px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .contact-form {
    width: 90%;
    max-width: 500px;
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      input,
      textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
      }

      input[type='submit'] {
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }
`;

function Conact() {
  return (
    <Wrapper>
      <h2 className='feel-free'>Feel free to contact us</h2>
      <div className="container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.6162324341494!2d78.167748775199!3d26.20915947707354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c426482f001d%3A0x181b55c85765c93d!2sItalian%20Garden!5e0!3m2!1sen!2sin!4v1730277914206!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="contact-form">
          <form action="https://formspree.io/f/mwpklkvn" method="POST">
            <input
              type="text"
              name="username"
              placeholder="Your Name"
              autoComplete="off"
              required
            />
            <input
              type="email"
              name="Email"
              placeholder="Your Email"
              autoComplete="off"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

export default Conact;

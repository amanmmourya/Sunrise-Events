import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';

const Contact = () => {
    return (
        <Wrapper>
            <div className="contact-container">
                <div className="left-contact">
                    <div className="large-heading">Contact Us to get the best deals</div>

                    <div className="contact-info">
                        <div className="info-block">
                            <div className="small-heading">For Vendors</div>
                            <a href="mailto:Sunriseevents.in@gmail.com"><div className="big-text">Sunriseevents.in@gmail.com</div></a>
                            <div className="big-text">+91 98878 29699 </div>
                        </div>
                        <div className="info-block">
                            <div className="small-heading">For Customers</div>
                            <a href="mailto:Sunriseevents.in@gmail.com"><div className="big-text">Sunriseevents.in@gmail.com</div></a>
                            <div className="big-text">+91 98878 29699 </div>
                        </div>
                    </div>

                    <div className="small-heading">Address Details</div>
                    <div className="big-text">Near, 110, Aagam Ochid, Nadani-2, Vesu, Surat, Gujarat 395007</div>
                </div>

                <div className="right-contact">
                    <div className="large-heading">Follow us on</div>
                    <div className="social-links">
                        <div className="social-item">
                            <FaInstagram size={42} className="icon" />
                            <a href="https://www.instagram.com/sunriseevents.in/" className='social'>Instagram</a>
                        </div>
                        <div className="social-item">
                            <FaFacebook size={42} className="icon" />
                            <a href="https://www.facebook.com/SunriseEvent.in/" className='social'>Facebook</a>
                        </div>
                        <div className="social-item">
                            <span className='font-extrabold text-5xl mt-3 mr-7'>JD</span>
                            <span className='social cursor-pointer'><a href="https://www.justdial.com/Surat/Sunrise-Events-Vesu/0261PX261-X261-180424130057-N1N2_BZDET?auto=1&trkid=5457861600&term=sunrise%20events" className='social'>Just Dial</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
.social{
font-size:larger;
}
    .contact-container {
        display: flex;
        flex-wrap: wrap;
        background-color: #efdfdf;
        padding: 5vh 2vw;
        gap: 3vw;
    }

    .left-contact, .right-contact {
        flex: 1 1 45%;
        padding: 2vh;
    }

    .large-heading {
        font-size: 3vh;
        margin-bottom: 2vh;
        font-weight: 600;
        color: #870f0f;
    }

    .small-heading {
        font-size: 2vh;
        font-weight: 700;
    }

    .big-text {
        font-size: 2vh;
        margin: 1vh 0;
    }

    .contact-info {
        display: flex;
        gap: 2vw;
        margin: 2vh 0;
    }

    .info-block {
        flex: 1;
    }

    .social-links {
        margin-top: 2vh;
    }

    .social-item {
        display: flex;
        align-items: center;
        margin: 1vh 0;

        .icon {
            margin-right: 1vw;
        }
    }

    @media (max-width: 768px) {
        .contact-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .contact-info {
            flex-direction: column;
            align-items: center;
        }

        .social-item {
            justify-content: center;
        }
    }

    @media (max-width: 480px) {
        .large-heading {
            font-size: 2.5vh;
        }

        .big-text, .small-heading {
            font-size: 1.5vh;
        }
    }
`;

export default Contact;

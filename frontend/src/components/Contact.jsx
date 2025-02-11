import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import '../style/home.css'
import styled from 'styled-components';

const Contact = () => {
    return (
        <Wrapper>
        <div className='flex justify-start items-start bg-[#efdfdf] p-10'>
            <div className='left-contact w-[50vw] space-y-5'>
                <div className='large-heading ml-10 text-2xl font-medium text-[#870f0f]'>
                Contact Us to get the best deals
                </div>

                <div className='ml-10 space-x-5 '>
                    <div className='inline-block'>
                        <div className='small-heading font-medium'>For Vendors</div>
                        <div className='big-text'>sunrisevents01@gmail.com</div>
                        <div className='big-text'>+91 7854239892</div>
                    </div>
                    <div className='inline-block'>
                        <div className='small-heading font-medium'>For Customers</div>
                        <div className='big-text'>sunrisevents01@gmail.com</div>
                        <div className='big-text'>+91 7854239892</div>
                    </div>
                    
                </div>
                <div className='small-heading ml-10 font-medium'>Address Details</div>
                <div className='big-text ml-10'>Near, 110, Aagam Ochid, Nadani-2, Vesu, Surat, Gujarat 395007</div>
            </div>
            <div className='right-contact ml-[5vw] w-[40vw]'>
                <div className='large-heading font-medium text-2xl mb-5 text-[#870f0f]'>
                Follow us on
                </div >
                    <div className="instagram flex space-y-2">
                        <FaInstagram size={28} className='mx-2 big-text1'/><div className='big-text inline-block'>Insta id</div>
                    </div>
                    <div className="facebook flex space-y-2">
                        <FaFacebook size={28} className='mx-2 big-text1'/><div className='big-text inline-block'>Facebook id</div>
                    </div>
                    <div className="twitter flex space-y-2">
                        <FaTwitter size={28} className='mx-2 big-text1 '/><div className='big-text inline-block'>Twitter id</div>
                    
                    </div>
                <div>

                </div>
            </div>
            {/* <div className=' mobile-c w-full flex justify-center items-center '>
                <div className="mobile-sr h-96 w-96 "></div>
            </div> */}



        </div>
        </Wrapper>
    )
}
const Wrapper=styled.section`
.large-heading{
font-size:3vh;
margin-bottom:2vh;
font-weight:600
}
.small-heading{
font-size:2vh;
font-weight:700;
}
.big-text{
font-size:2vh;
padding:1vh;
}
.big-text1{
font-size:42;
width:4vh;
}
.left-contact{
padding:10vh;
}
.right-contact{
padding:10vh;
}
.mobile-c{
margin:10vh
}
`

export default Contact
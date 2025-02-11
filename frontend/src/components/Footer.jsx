
import React from 'react'
import styled from 'styled-components'
const Footer = () => {
    return (
        <>
            <Wrapper>
            <div className='flex justify-around bg-black text-white h-[8vh] text-lg'>

                <div className="leftbar flex justify-center items-center space-x-7">
                    <div className='item_ '>&copy; 2025</div>
                    <div className='item_ '>SunriseEvents</div>
                </div>
                <span className="rightbar flex justify-center items-center space-x-10">
                    <div className='item_ ' >Terms & Coditions</div>
                    <div className='item_ '>Privacy Policy</div>
                </span>
            </div>
            </Wrapper>
        </>

    )
}
const Wrapper=styled.section`
.item_{
margin-left:3vh
}
`
export default Footer
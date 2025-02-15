import React from 'react';
import { User, Settings, HelpCircle, LogIn, Shield } from 'lucide-react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

const Profile = (props) => {
    const closeProfile=()=>{
        props.settoShow(false);
    }
    
  return (
    <Wrapper>
    <div className="w-[40vh] h-[60vh] absolute top-0 right-0 bg-white shadow-xl rounded-xl p-4 flex flex-col justify-start items-start space-y-4 border border-gray-300">
      {/* Profile Info */}
      <div className='big3 absolute top-1 right-3 hover:bg-[#4a4a4a] hover:text-white h-14 w-14 flex justify-center items-center bg-[#808080a3] rounded-full cursor-pointer' onClick={closeProfile}>X</div>
      <div className="flex items-center space-x-3 border-b pb-3 w-full">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
        <div>
          <div className="big3 text-lg font-semibold floating"><div className='big3 text-lg font-semibold'>Your Name</div></div>
          <p className="big2 text-sm text-gray-500">yourname@example.com</p>
        </div>
      </div>

      {/* Menu Options */}
      <div className="w-full flex flex-col space-y-3">
        <button className="flex items-center space-x-3 hover:bg-gray-100 w-full p-2 rounded-md">
          <Shield className="big1 w-5 h-5 text-blue-600" />
          <NavLink to={"/adminlogin"}><span className="big1 text-sm font-medium">Sign in as Admin</span></NavLink>
        </button>

        <button className="flex items-center space-x-3 hover:bg-gray-100 w-full p-2 rounded-md">
          <User className="big1 w-5 h-5 text-green-600" />
          <span className="big1 text-sm font-medium">Your Profile</span>
        </button>
        <NavLink to={"/settingmenu"}>
        <button className="flex items-center space-x-3 hover:bg-gray-100 w-full p-2 rounded-md">
          <Settings className="big1 w-5 h-5 text-yellow-600" />
          <span className="big1 text-sm font-medium">Settings</span>
        </button>
        </NavLink>
        <NavLink to={"/help"}>
        <button className="flex items-center space-x-3 hover:bg-gray-100 w-full p-2 rounded-md">
          <HelpCircle className="big1 w-5 h-5 text-purple-600" />
          <span className="big1 text-sm font-medium" >Help</span>
        </button>
        </NavLink>
      </div>

      {/* Logout */}
      <div className="mt-auto w-full">
        <button className="flex items-center space-x-3 hover:bg-red-100 w-full p-2 rounded-md text-red-600 font-semibold">
          <LogIn className="w-5 h-5" />
          <NavLink to={"/home"}><span className='big2'>Log Out</span></NavLink>
        </button>
      </div>
    </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
.big1{
font-size:larger;
}
.big2{
font-size:larger;
}
.big3{
font-size:x-large;
}
`
export default Profile;

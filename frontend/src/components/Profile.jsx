import React, { useContext } from 'react';
import { User, Settings, HelpCircle, LogIn } from 'lucide-react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { GlobalStyle } from '../GlobalStyle';
import { useGlobalContext } from '../Context';

const Profile = (props) => {
    const closeProfile = () => {
        props.settoShow(false);
    };

    const {profileInfo} =useGlobalContext();
    console.log(profileInfo);



    return (
        <>
        <GlobalStyle/>
        <Wrapper>
            <div className="profile-container">
                <div className='close-button' onClick={closeProfile}>X</div>
                <div className="profile-info">
                    <div className="avatar">A</div>
                    <div>
                        <div className='name'>{profileInfo.name}</div>
                        <p className="email">{profileInfo.email}</p>
                    </div>
                </div>

                <div className="menu">
                <NavLink to={profileInfo.role === "admin" ? "/admin" : "/profile"}>
    <button className="menu-item">
        <User className="icon text-green-600" />
        <span>{profileInfo.role === "admin" ? "Admin" : "Profile"}</span>
    </button>
</NavLink>

                    <NavLink to={"/setting"}>
                        <button className="menu-item">
                            <Settings className="icon text-yellow-600" />
                            <span>Settings</span>
                        </button>
                    </NavLink>
                    <NavLink to={"/help"}>
                        <button className="menu-item">
                            <HelpCircle className="icon text-purple-600" />
                            <span>Help</span>
                        </button>
                    </NavLink>
                </div>

                <div className="logout">
                    <button className="logout-button">
                        <LogIn className="icon" />
                        <NavLink to={"/home"}><span>Log Out</span></NavLink>
                    </button>
                </div>
            </div>
        </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
  .profile-container {
    position: absolute;
    top: 0;
    right: 0;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    width: 90vw;
    max-width: 400px;
    height: 80vh;
    border: 1px solid #ccc;
    

    @media (max-width: 600px) {
      width: 100vw;
      height: 100vh;
      top: 0;
      right: 0;
      border-radius: 0;
    }
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: rgba(128, 128, 128, 0.6);
    color: white;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #4a4a4a;
    }
  }

  .profile-info {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
    margin-bottom: 1rem;

    .avatar {
      width: 4rem;
      height: 4rem;
      background-color: #f87171;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      margin-right: 1rem;
    }

    .name {
      font-size: 3rem;
      font-weight: 600;
    }

    .email {
      font-size: 1.5rem;
      color: #6b7280;
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: background 0.3s;

      &:hover {
        background-color: #f3f4f6;
      }

      .icon {
        width: 1.25rem;
        height: 1.25rem;
      }

      span {
        font-size: 2rem;
        font-weight: 500;
      }
    }
  }

  .logout {
    margin-top: auto;

    .logout-button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
      color: #dc2626;
      font-weight: 600;
      background-color: #fee2e2;
      transition: background 0.3s;

      &:hover {
        background-color: #fecaca;
      }

      .icon {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
`;

export default Profile;
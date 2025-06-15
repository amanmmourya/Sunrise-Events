import React from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobalStyle } from '../GlobalStyle';
import { useGlobalContext } from '../Context';

const Profile = ({ settoShow }) => {
  const navigate = useNavigate();
  const { setProfileInfo, profileInfo } = useGlobalContext();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://sunrise-events-wty9.onrender.com/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Logout failed");

      localStorage.removeItem("token");
      localStorage.removeItem("myemail");
      localStorage.removeItem("myname");
      setProfileInfo();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const name = localStorage.getItem("myname") || "Guest";
  const email = localStorage.getItem("myemail") || "guest@example.com";
  const role = profileInfo?.role || "user";

  return (
    <>
      {/* <GlobalStyle /> */}
      <Wrapper>
        <>
        <div className="profile-container">
          <div className="close-button" onClick={() => settoShow(false)}>✕</div>

          <div className="profile-info">
            <div className="avatar">{name[0]?.toUpperCase() || "A"}</div>
            <div>
              <div className="name">{name}</div>
              <p className="email">{email}</p>
            </div>
          </div>

          <div className="menu">
            <NavLink to={role === "admin" ? "/admin" : "/profilepage"} className="menu-item">
              <User className="icon text-green-600" />
              <span onClick={() => settoShow(false)}>{role === "admin" ? "Admin" : "Profile"}</span>
            </NavLink>
            <NavLink to="/setting" className="menu-item">
              <Settings className="icon text-yellow-600" />
              <span onClick={() => settoShow(false)}>Settings</span>
            </NavLink>
            <NavLink to="/help" className="menu-item">
              <HelpCircle className="icon text-purple-600" />
              <span onClick={() => settoShow(false)}>Help</span>
            </NavLink>
          </div>

          <div className="logout">
            <button className="logout-button" onClick={handleLogout}>
              <LogOut className="icon" />
              <span onClick={() => settoShow(false)}>Log Out</span>
            </button>
          </div>
        </div>
        </>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
.profile-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  width: 90vw;
  max-width: 360px;
  height: auto;
  border: 1px solid #e5e7eb;
  z-index: 50;

  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    border-radius: 0;
    padding: 2rem 1.5rem;
  }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.25rem;
  background: rgba(100, 100, 100, 0.15);
  color: #000;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.25);
  }
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;

  .avatar {
    width: 4rem;
    height: 4rem;
    background-color: #f43f5e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    font-weight: bold;
    flex-shrink: 0;
  }

  .name {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
  }

  .email {
    font-size: 0.95rem;
    color: #6b7280;
    word-break: break-all;
  }
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    color: #1f2937;
    font-size: 1.1rem;
    font-weight: 500;
    transition: background 0.3s;

    &:hover {
      background-color: #f9fafb;
    }

    .icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}

.logout {
  // margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;

  .logout-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    background-color: #fee2e2;
    color: #b91c1c;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    width: 100%;
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

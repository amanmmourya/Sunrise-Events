import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../Context";
import { motion } from "framer-motion";

const SettingMenu = () => {
  const { selectedButton, setSelectedButton } = useGlobalContext();
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const { profileInfo } = useGlobalContext();
  const name = localStorage.getItem("myname") || "Unknown";
  const role = profileInfo?.role ? profileInfo.role : "User";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleButton = (button) => {
    setSelectedButton(button);
  };

  const menuButtons = [
    { id: 'button1', label: 'Edit Profile' },
    { id: 'button2', label: 'Change Password' },
    { id: 'button3', label: 'Notifications' },
    { id: 'button4', label: 'Booking History' },
    { id: 'button5', label: 'Payment History' }
  ];

  return (
    <StyledAdminBox
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ContentWrapper>
        <ProfileSection>
          <AvatarWrapper
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <FaUserCircle size={80} />
          </AvatarWrapper>
          <GreetingSection>
            <Greeting>{getGreeting()}</Greeting>
            <Name>{name}</Name>
            <Role>{role}</Role>
          </GreetingSection>
        </ProfileSection>

        <Divider />

        <InfoSection>
          <InfoItem>
            <InfoLabel>Date:</InfoLabel>
            <InfoValue>{currentDate}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Time:</InfoLabel>
            <InfoValue>{currentTime}</InfoValue>
          </InfoItem>
        </InfoSection>

        <QuickActions>
          {menuButtons.map((button) => (
            <ActionButton
              key={button.id}
              onClick={() => handleButton(button.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              selected={selectedButton === button.id}
            >
              {button.label}
            </ActionButton>
          ))}
        </QuickActions>
      </ContentWrapper>
    </StyledAdminBox>
  );
};

const StyledAdminBox = styled(motion.div)`
  background: #ffffff;
  color: #000000;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
              0 10px 15px rgba(160, 0, 27, 0.1);
  border: 1px solid #a0001b;
  width: 300px;
  margin: 1rem;

  @media (max-width: 740px) {
    width: 100%;
    margin: 0.5rem;
    padding: 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
`;

const AvatarWrapper = styled(motion.div)`
  color: #e0aa3e;
  background: rgba(224, 170, 62, 0.1);
  border-radius: 50%;
  padding: 0.5rem;
  border: 2px solid #e0aa3e;
`;

const GreetingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Greeting = styled.span`
  font-size: 0.875rem;
  color: #e0aa3e;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #910000;
  margin: 0;
`;

const Role = styled.span`
  font-size: 0.875rem;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(224, 170, 62, 0.2);
  margin: 0.5rem 0;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: rgba(224, 170, 62, 0.1);
  border-radius: 0.5rem;
`;

const InfoLabel = styled.span`
  color: #e0aa3e;
  font-size: 0.875rem;
`;

const InfoValue = styled.span`
  color: #900101;
  font-size: 0.875rem;
`;

const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const ActionButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: ${props => props.selected ? '#a0001b' : 'rgba(160, 0, 27, 0.1)'};
  // color: ${props => props.selected ? '#ffffff' : '#e0aa3e'};
  border: 1px solid ${props => props.selected ? '#a0001b' : '#e0aa3e'};
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #a0001b;
    color: #ffffff;
    border-color: #a0001b;
  }

  @media (max-width: 740px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
`;

export default SettingMenu;
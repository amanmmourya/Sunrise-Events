import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useGlobalContext } from "../Context";
import { User, BarChart2, Users, Calendar } from "lucide-react";

const MenuBox = () => {
  const { selectedButton, setSelectedButton, profileInfo } = useGlobalContext();
  const name = profileInfo?.name || "Admin";
  const role = profileInfo?.role || "Administrator";
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const menuItems = [
    { id: 'button1', label: 'Revenue', icon: BarChart2 },
    { id: 'button2', label: 'Customers', icon: Calendar },
    { id: 'button3', label: 'Appointments', icon: Users }
  ];

  return (
    <StyledMenuBox
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <ProfileSection>
        <AvatarWrapper
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <User size={64} strokeWidth={1.5} />
        </AvatarWrapper>
        <GreetingContainer>
          <Greeting>{getGreeting()},</Greeting>
          <Name>{name}</Name>
          <Role>{role}</Role>
        </GreetingContainer>
      </ProfileSection>

      <Divider />

      <InfoSection>
        <InfoItem>
          <Label>Date</Label>
          <Value>{currentDate}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Time</Label>
          <Value>{currentTime}</Value>
        </InfoItem>
      </InfoSection>

      <MenuSection>
        {menuItems.map(({ id, label, icon: Icon }) => (
          <MenuItem
            key={id}
            selected={selectedButton === id}
            onClick={() => setSelectedButton(id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon size={20} />
            <span>{label}</span>
          </MenuItem>
        ))}
      </MenuSection>
    </StyledMenuBox>
  );
};

const StyledMenuBox = styled(motion.div)`
  background: linear-gradient(135deg, #200601 0%, #980803 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05),
              0 10px 15px rgba(219, 39, 119, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* height: fit-content; */

  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    padding: 1.5rem;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    flex: 1;
    min-width: 300px;
  }
`;

const AvatarWrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const GreetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Greeting = styled.span`
  font-size: 1.875rem;
  opacity: 0.9;
`;

const Name = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
`;

const Role = styled.span`
  font-size: 1.875rem;
  opacity: 0.8;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0.5rem 0;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 1024px) {
    flex: 1;
    flex-direction: row;
    min-width: 300px;
    justify-content: space-around;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const Label = styled.span`
  font-size: 1.2rem;
  opacity: 0.8;
`;

const Value = styled.span`
  font-size: 1.275rem;
  font-weight: 500;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 1024px) {
    flex: 1;
    flex-direction: row;
    min-width: 300px;
    justify-content: space-around;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const MenuItem = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${props => props.selected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.575rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 1024px) {
    width: auto;
  }
`;

export default MenuBox;
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context";
import { User, Calendar, BarChart2, Clock } from "lucide-react";

const AdminBox = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const { profileInfo } = useGlobalContext();

  const name = profileInfo?.name || "Admin";
  const role = profileInfo?.role || "Administrator";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleAppointments = () => {
    navigate("/admin/appointments");
  };

  const handleAnalytics = () => {
    navigate("/view-analytics");
  };

  return (
    <StyledAdminBox
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
        <InfoItem
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Calendar size={20} />
          <InfoText>
            <Label>Date</Label>
            <Value>{currentDate}</Value>
          </InfoText>
        </InfoItem>
        <InfoItem
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Clock size={20} />
          <InfoText>
            <Label>Time</Label>
            <Value>{currentTime}</Value>
          </InfoText>
        </InfoItem>
      </InfoSection>

      <ActionSection>
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAppointments}
        >
          <Calendar size={20} />
          Manage Appointments
        </ActionButton>
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAnalytics}
        >
          <BarChart2 size={20} />
          View Analytics
        </ActionButton>
      </ActionSection>
    </StyledAdminBox>
  );
};

const StyledAdminBox = styled(motion.div)`
  background: linear-gradient(135deg, #200601 0%, #980803 100%);
  color: #f7f4f4;
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
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;
`;

const Role = styled.span`
  font-size: 1.575rem;
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
  gap: 1rem;

  @media (max-width: 1024px) {
    flex: 1;
    flex-direction: row;
    min-width: 300px;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 1.25rem;
  opacity: 0.8;
`;

const Value = styled.span`
  font-size: 1.275rem;
  font-weight: 500;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 1024px) {
    flex: 1;
    min-width: 300px;
  }
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.475rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export default AdminBox;
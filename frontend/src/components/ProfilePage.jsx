import React from 'react';
import { useGlobalContext } from '../Context';
import styled from 'styled-components';

const ProfilePage = () => {
    const { profileInfo } = useGlobalContext();
  
    if (!profileInfo) {
      return <h2>Loading...</h2>; // Prevents accessing `profileInfo.name` when `null`
    }
  
    return (
      <Container>
        <ProfileCard>
          <Avatar>
            {profileInfo?.name ? profileInfo.name[0].toUpperCase() : 'U'}
          </Avatar>
          <UserInfo>
            <h2>{profileInfo?.name || 'Unknown User'}</h2>
            <p>{profileInfo?.role ? profileInfo.role.toUpperCase() : 'N/A'}</p>
          </UserInfo>
          <Details>
            <DetailItem><strong>Username:</strong> {profileInfo?.name || 'N/A'}</DetailItem>
            <DetailItem><strong>Email:</strong> {profileInfo?.email || 'N/A'}</DetailItem>
            <DetailItem><strong>Account Created:</strong> {profileInfo?.createdAt ? new Date(profileInfo.createdAt).toLocaleDateString() : 'N/A'}</DetailItem>
            <DetailItem><strong>Last Login:</strong> {profileInfo?.lastLogin ? new Date(profileInfo.lastLogin).toLocaleString() : 'N/A'}</DetailItem>
          </Details>
        </ProfileCard>
      </Container>
    );
  };
  

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
`;

const ProfileCard = styled.div`
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: #850000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 50%;
  margin: 0 auto 10px;
`;

const UserInfo = styled.div`
  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 5px 0;
  }
  p {
    font-size: 1rem;
    color: #555;
  }
`;

const Details = styled.div`
  margin-top: 15px;
  text-align: left;
`;

const DetailItem = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 5px 0;
  strong {
    color: #000;
  }
`;

export default ProfilePage;

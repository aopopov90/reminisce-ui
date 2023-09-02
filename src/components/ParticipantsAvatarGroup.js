import React, { useState, useEffect } from 'react';
import { API_URL } from '../config/config';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import { stringAvatar } from '../utils/avatarUtils';

const ParticipantAvatarGroup = ({ sessionId }) => {
    const [participationsData, setParticipationsData] = useState([]);

    useEffect(() => {
        const fetchParticipations = async () => {
            try {
                const response = await axios.get(`${API_URL}/participations/${sessionId}`);
                setParticipationsData(response.data);
            } catch (error) {
                console.error('Error fetching participations data: ', error);
            }
        }

        fetchParticipations();
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px', marginBottom: '5px' }}>
            <AvatarGroup max={5}>
            {participationsData.map((participation) => (
                <Avatar {...stringAvatar(`${participation.participantName}`)} />
            ))}
            </AvatarGroup>
        </div>
    );
}

export default ParticipantAvatarGroup;
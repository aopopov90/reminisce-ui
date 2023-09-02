import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useAuth } from './AuthContext';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { stringAvatar } from '../utils/avatarUtils';

const ActiveUserAvatar = () => {
    const { authState, authDispatch } = useAuth(); 
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        authDispatch({ type: 'CLEAR_TOKEN' }); 
        authDispatch({ type: 'CLEAR_USER_INFO' }); 
        handleClose();
    };

    return (
        <Stack direction="row" spacing={2}>
        <IconButton onClick={handleClick}>
          <Avatar {...stringAvatar(`${authState.user.email}`)} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{ width: '500px' }} // Adjust the width as needed
        >
          <List>
            <ListItem>
              <ListItemText
                secondary={authState.user.email}
              />
            </ListItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </List>
        </Menu>
      </Stack>
    );
};

export default ActiveUserAvatar;
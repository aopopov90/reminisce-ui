import * as React from 'react';
import { API_URL } from '../config/config';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const AddSessionParticipantDialog = ({ sessionId }) => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const onEmailChange = (e) => setEmail(e.target.value);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAddParticipant = async () => {
        try {
          const response = await axios.post(`${API_URL}/participations/${sessionId}/add`, [email]);
        //   setSessions((prevSessions) => [...prevSessions, response.data]);
          setEmail('');
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <List>
                {['Add participant'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={handleClickOpen}>
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add participant</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a participant to this session, please enter their email address here.
                        The participants will be able to add new participants.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={onEmailChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddParticipant();
                            }
                          }}
                        value={email}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddParticipant}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddSessionParticipantDialog;
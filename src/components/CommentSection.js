import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const CommentSection = ({ sessionData, categoryId, onSubmit }) => {
  const categoryComments = sessionData.comments.filter(comment => comment.categoryId === categoryId);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    position: 'relative', // Set the position of the item container to relative
    marginBottom: theme.spacing(2), // Add some margin between items
  }));

  const ThumbUpButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute', // Set the position of the thumb up button to absolute
    bottom: '-35%', // Position it 50% outside the container
    right: theme.spacing(3), // Adjust the distance from the right edge
  }));

  const LikesCounter = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: '-20%',
    right: theme.spacing(1), // Adjust the distance to align with ThumbUpButton
    display: 'flex',
    alignItems: 'center', // Vertically center the counter with the icon
  }));

  return (
    <Stack spacing={2}>
      {categoryComments.map((comment) => (
        <Item 
          key={comment.id}
        >
          {comment.text}
          <ThumbUpButton edge="end" onClick={() => onSubmit(comment.id)}>
            <ThumbUpIcon fontSize="small"/>
          </ThumbUpButton>
          <LikesCounter>
            {comment.reactions.length}
          </LikesCounter>
        </Item>
      ))}
    </Stack>
  );
};

export default CommentSection;

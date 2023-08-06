import React from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const CommentSection = ({ sessionData, categoryId }) => {
  const categoryComments = sessionData.comments.filter(comment => comment.categoryId === categoryId);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

  return (
    <Stack spacing={2}>
      {categoryComments.map((comment) => (
        <Item key={comment.id}>{comment.text}</Item>
      ))}
    </Stack>
  );
};

export default CommentSection;

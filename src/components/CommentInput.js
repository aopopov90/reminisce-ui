import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const CommentInput = ({ label, color, categoryId, value, onChange, onSubmit }) => {
  return (
    <TextField
      label={label}
      color={color}
      focused
      value={value}
      onChange={(e) => onChange(categoryId, e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSubmit(categoryId);
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton edge="end" onClick={() => onSubmit(categoryId)}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CommentInput;

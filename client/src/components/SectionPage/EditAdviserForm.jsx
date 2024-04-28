import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import * as React from 'react'
import { useState } from 'react';
import axios from 'axios'

export const EditAdviserForm = ({ sectionName }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editedAdviser, setAdviser] = React.useState('')

  const handleEdit = async () => {
    try {
      const response = await axios.put(`/editAdviser/${sectionName}`, { newAdviser: editedAdviser });
      window.location.reload()
    } catch (error) {
        console.error('Error updating adviser:', error);
    }
  }

  return (
    <>
      <Button sx={{ ml: 1 }} onClick={handleOpen} variant="outlined">Edit Adviser</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
              event.preventDefault();
          },
        }}
      >
        <DialogTitle>Edit Adviser</DialogTitle>
        <DialogContent>
          <TextField 
            value={editedAdviser}
            onChange={(e) => setAdviser(e.target.value)}
            placeholder='Enter Adviser Name'
            autoFocus
            fullWidth
          />
          <DialogActions>
            <Button sx={{ backgroundColor: '#f34c4c', mt: 1, '&:hover': { backgroundColor: 'red' } }} variant='contained' onClick={handleClose}>Cancel</Button>
            <Button sx={{ mt: 1 }} variant='contained' onClick={handleEdit}>Save</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
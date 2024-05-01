import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import * as React from 'react'
import { useState } from 'react';

export function EditSectionName({ name }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [updatedName, setUpdatedName] = useState(name.slice(3, name.length))
  const [grade, setGrade] = useState('')

  const handleSubmit = async () => {
    const newName = `${grade}-${updatedName.toLocaleUpperCase().trim()}`
    try {
      const res = await axios.put('/editSectionName', { name, newName })
      if(res.status === 200){
        window.history.back()

      }
    } catch (e) {
      console.error(e)
    }
  }

  return(
    <>
      <Button
        onClick={handleOpen}
        variant='outlined'
        sx={{ ml: 1 }}
      >
        Edit Section Name
      </Button>

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
        <DialogTitle>
          Edit Section Name
        </DialogTitle>
        <DialogContent>
          <InputLabel id="demo-simple-select-label">Grade</InputLabel>
            <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={grade}
                label="Grade"
                onChange={(e) => setGrade(e.target.value)}
                fullWidth
                required
            >
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
          </Select>

          <TextField
            autoFocus
            margin="dense"
            id="sectionName"
            label="Section Name"
            type="text"
            fullWidth
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            autoComplete='off'
          />

          <DialogActions sx={{ mt: '2px' }}>
            <Button onClick={handleClose}>Close</Button>
            <Button variant='contained' onClick={handleSubmit}>Save</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
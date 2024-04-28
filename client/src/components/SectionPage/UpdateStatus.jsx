import * as React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export function UpdateStatus({ recordID }) {
  const [newStatus, setStatus] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleUpdate = async () => {
    console.log(recordID);
    try {
      // const res = await axios.post('/updateStatus', { recordID , newStatus })
      const res = await fetch(`http://localhost:3000/updateStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ recordID, newStatus })
      })
      
      if(res.ok){
        window.location.reload()
      }
    } catch (e) {
      console.error(e)
    }
  };


  return(
    <>
      
      <Button onClick={handleOpen} variant='contained'>Update Case Status</Button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Case Status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the new status for the case:
          </DialogContentText>
          <InputLabel id="case-status-label">Case Status</InputLabel>
          <Select
            labelId="case-status-label"
            id="case-status"
            value={newStatus}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
              <MenuItem value={"Under Review"}>Under Review</MenuItem>
              <MenuItem value="On Hold">On Hold</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
              <MenuItem value="Appeal Pending">Appeal Pending</MenuItem>
              <MenuItem value="Dismissed">Dismissed</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>
          
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary" variant="contained">
              Update
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
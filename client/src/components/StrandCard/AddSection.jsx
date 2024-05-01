import { PlusCircleTwoTone } from '@ant-design/icons'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material'
import axios from 'axios';
import * as React from 'react'
import { useState } from 'react';

async function createSection(section, strand1) {
  const sectionName = section.toUpperCase()
  const strand = strand1.replaceAll(' ', '').trim()
  try {
    await axios.post('/addSection', {
     sectionName, strand
    })
    window.location.reload()
  } catch (e) {
    console.error(e)
  }
}

export const AddSection = ({ strand }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [sectionName, setSectionName] = useState('')
  const [grade, setGrade] = useState('')


  const handleCreateSection = () => {
    const section = `${grade}-${sectionName}`
    createSection(section, strand)
    handleClose();
  };


  return (
    <>
      <Tooltip title={<><h6>Add a New Section</h6></>}>
        <Button sx={{ ml: -2 }} onClick={handleOpen}>
            <PlusCircleTwoTone />
        </Button>
      </Tooltip>


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
          Create New Section in {strand}
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
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            autoComplete='off'
          /> 

          <DialogActions sx={{ mt: 1 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant='contained' onClick={handleCreateSection}>Create</Button>
          </DialogActions>
        </DialogContent>
        

      </Dialog>
    </>
  )
}
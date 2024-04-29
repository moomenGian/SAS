import { PlusCircleTwoTone } from '@ant-design/icons'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip } from '@mui/material'
import * as React from 'react'
import { useState } from 'react';

export const AddSection = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [sectionName, setSectionName] = useState('')


  const handleCreateSection = () => {
    console.log('Section Name:', sectionName);
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
          Create New Section
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="sectionName"
            label="Section Name"
            type="text"
            fullWidth
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
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
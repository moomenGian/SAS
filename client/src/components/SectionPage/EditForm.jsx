import * as React from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

export function EditForm() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return(
    <>
      <Button 
        onClick={handleOpen}
        variant='contained'
      >
        EDIT
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
        <DialogTitle>EDIT RECORD</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
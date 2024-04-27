import { Dialog, DialogTitle } from '@mui/material';
import * as React from 'react'
import { Button, DialogActions } from '@mui/material';

export function DeleteConfirmation({ record }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/delete/${record.id}` , { method: 'DELETE'})

      if(res.ok){
        window.location.reload()
        console.log('deleted successfully');
      }else{
        alert('failed to delete record')
        console.error('failed to delete error')
      }
    } catch (e) {
      alert('failed to delete record')
      console.error(e)
    }
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='contained'
        className='deleteBtn'
      >
        Delete Record
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
        <DialogTitle>Are you sure you want to delete this record?</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button variant='contained' onClick={handleDelete}>Yes</Button>
        </DialogActions>
        
      </Dialog>
    </>
  )
}
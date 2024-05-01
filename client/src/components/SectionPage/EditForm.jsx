import * as React from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import './SectionPage.css'
import { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import { DeleteConfirmation } from './deleteConfirmation';


export function EditForm({ record }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updatedRecord, setUpdatedRecord] = useState(record);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecord({ ...updatedRecord, [name]: value });
    console.log(name, value);
  };

  const handleSubmit = async () => {
    console.log(JSON.stringify(updatedRecord, null , 2));
    try {
      const res = await fetch(`http://localhost:3000/edit/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRecord)
      })

      if(res.ok){
        console.log('updated succesfully');
        window.location.reload()
      }else{
        alert('failed editing record!')
        console.error('failed to edit record')
      }
    } catch (e) {
      alert('failed editing record!')
      console.error(e)
    }
  }



  return(
    <>

      <Tooltip title="Edit Violation Details">
        <Button
          onClick={handleOpen}
          variant='contained'
        >
          EDIT
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
        <DialogTitle>EDIT RECORD DETAILS</DialogTitle>

        <DialogContent>
          <TextField className='mt-1' name="violator" label="Name" value={updatedRecord.violator} onChange={handleChange} fullWidth autoComplete='off'/>
          <InputLabel id="demo-simple-select-label">Violation</InputLabel>
          <Select 
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='violation'
              value={updatedRecord.violation}
              label="Violation"
              onChange={handleChange}
              fullWidth
              required
          >
              <MenuItem value={'Smoking/Vaping'}>Smoking/Vaping</MenuItem>
              <MenuItem value={'Tardiness/Truancy'}>Tardiness/Truancy</MenuItem>
              <MenuItem value={'Disruptive Behavior'}>Disruptive Behavior</MenuItem>
              <MenuItem value={'Cheating/Plagiarism'}>Cheating/Plagiarism</MenuItem>
              <MenuItem value={'Vandalism'}>Vandalism</MenuItem>
              <MenuItem value={'Bullying/Harassment'}>Bullying/Harassment</MenuItem>
              <MenuItem value={'Possession of Contraband'}>Possession of Contraband</MenuItem>
              <MenuItem value={'Insubordination'}>Insubordination</MenuItem>
              <MenuItem value={'Dress Code Violations'}>Dress Code Violations</MenuItem>
              <MenuItem value={'Skipping Detention'}>Skipping Detention</MenuItem>
              <MenuItem value={'Forgery'}>Forgery</MenuItem>
              <MenuItem value={'Misuse of Technology'}>Misuse of Technology</MenuItem>
              <MenuItem value={'Gambling'}>Gambling</MenuItem>
              <MenuItem value={'Disrespectful Behavior'}>Disrespectful Behavior</MenuItem>
              <MenuItem value={'Theft'}>Theft</MenuItem>
              <MenuItem value={'Fighting'}>Disruptive Behavior</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
          </Select>
          <TextField
              id="outlined-multiline-static"
              label="Violation Description"
              multiline
              rows={4}
              name='violationDescription'
              value={updatedRecord.violationDescription}
              onChange={handleChange}
              fullWidth
              required
              autoComplete='off'
          />
          <TextField autoComplete='off' name="witness" label="Witness" value={updatedRecord.witness} onChange={handleChange} fullWidth />
          <TextField name="date" label="Date (MM-DD-YYYY)" value={updatedRecord.date} onChange={handleChange} fullWidth />

            
        </DialogContent>
        
        <DialogActions className='bruh'>
          {/* <Button className='deleteBtn' variant='contained' onClick={handleDelete}>Delete Record</Button> */}
          <DeleteConfirmation record={record}/>
          <div>
            <Button onClick={handleClose}>Close</Button>
            <Button variant='contained' onClick={handleSubmit}>Save</Button>
          </div>
          
          
        </DialogActions>
      </Dialog>
    </>
  )
}
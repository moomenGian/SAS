import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export function CaseHistoryForm({ caseID }) {
  const [open, setOpen] = React.useState(false);
  const [event_date, setDate] = React.useState(dayjs().format('MM-DD-YYYY'))
  const [eventDescription, setEventDescription] = React.useState('');
  const [initiator, setInitiator] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const logAll = () => console.log(caseID, event_date, eventDescription, initiator, notes);

  const handleSave = async () => {
    try {
      await axios.post('/createHistory', {
        caseID,
        event_date,
        eventDescription,
        initiator,
        notes
      });
      handleClose();
      window.location.reload()
    } catch (error) {
      console.error('Error saving history event:', error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained">Add New Event</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter details for the new history event:
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{mt: 1}} components={['DatePicker']}>
                  <DatePicker className='datepicker' label="Date" value={dayjs()} onChange={(newValue) => setDate(newValue.format('MM-DD-YYYY')) } />
              </DemoContainer>
          </LocalizationProvider>
          <TextField
            autoFocus
            margin="dense"
            id="eventDescription"
            label="Event Description"
            fullWidth
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            id="initiator"
            label="Action By:"
            fullWidth
            value={initiator}
            onChange={(e) => setInitiator(e.target.value)}
          />
          <TextField
            margin="dense"
            id="notes"
            label="Details"
            fullWidth
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        
          <DialogActions sx={{ mt: 1 }}>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

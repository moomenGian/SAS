import { Card, CardContent, CardHeader, Button } from '@mui/material'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { CaseDetails } from './CaseDetails';
import { useGetHistory } from '../../../Hooks/useGetHistory';

export function CaseStatusPage() {
  const { caseID } = useParams()
  const [history, setHistory] = useState([])
  const [caseDetails, setCaseData] = useState(
    {
        violator: 'John Doe',
        violationType: 'Smoking/Vaping',
        description: 'Caught smoking in school premises.',
        date: '2024-04-25',
        status: 'Open',
    }
  );

  useEffect(() => {
    
    const fetchCaseData = async () => {
      try {
        const response = await axios.get(`/getRecord/${caseID}`);
        setCaseData(response.data);
        setHistory( await useGetHistory(caseID) )
        
          
      } catch (error) {
        console.error('Error fetching case data:', error);
      }
    };
    fetchCaseData();
  }, [caseID]);
  
  
  const redirectToPrint = () => {
    location.href = `http://localhost:5173/printCase/${caseID}`
  }
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={redirectToPrint}>
          Print
        </Button>
        <Button sx={{ m: 3, display: 'flex', mr: 4 }} variant='contained' onClick={() => window.history.back()}>
          Back
        </Button> 
      </div>
      
      <div style={{ marginTop: '50px' }}>
        <CaseDetails caseDetails={caseDetails} caseID={caseID}/>
        
        <Box mt={4} sx={{ width: 'max-content', mx: 'auto', mb: '70px' }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }} gutterBottom>Case Status History</Typography>
          <Paper elevation={5} >
            <List sx={{p:0}}>
              {history[0] ?
                history.map((event, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h5" gutterBottom>
                            <strong>Date:</strong> {event.event_date}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="h5" gutterBottom>
                              <strong>Event:</strong>{' '}
                              {event.eventDescription}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                              <strong>Action By:</strong> {event.initiator}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                              <strong>Details:</strong> {event.notes}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < history.length - 1 && <Divider />}
                  </React.Fragment>
                ))
                :
                <Paper elevation={3} style={{ padding: '20px', margin: '0' }}>
                  <Typography variant="h6">No History Found</Typography>
                  <Typography variant="body1">
                    This case does not have any history yet.
                  </Typography>
                </Paper>
                }
            </List>
          </Paper>
        </Box>
      </div>
      
    </div>
  )
}
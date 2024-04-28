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
        
        // setHistory(useGetHistory(caseID))
        
      } catch (error) {
        console.error('Error fetching case data:', error);
      }
    };
    fetchCaseData();
  }, [caseID]);


  // const history = [
  //   {
  //     event_date: '2024-04-15',
  //     event_description: 'Case opened',
  //     initiator: 'Administrator',
  //     notes: 'Initial case creation',
  //   },
  //   {
  //     event_date: '2024-04-20',
  //     event_description: 'Assigned to investigator',
  //     initiator: 'Case Manager',
  //     notes: 'Assigned to Investigator Smith for further investigation',
  //   },
  //   {
  //     event_date: '2024-04-25',
  //     event_description: 'Under review',
  //     initiator: 'Investigator',
  //     notes: 'Reviewing evidence and witness testimonies',
  //   },
  //   {
  //     event_date: '2024-05-02',
  //     event_description: 'Case closed',
  //     initiator: 'Administrator',
  //     notes: 'Case resolved, violator issued warning',
  //   },
  // ];
  

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{ m: 3, display: 'flex' }} variant='contained' onClick={() => window.history.back()}>
          Back
        </Button>
      </div>
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
                            <strong>Description:</strong>{' '}
                            {event.event_description}
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            <strong>Initiator:</strong> {event.initiator}
                          </Typography>
                          <Typography variant="h5" gutterBottom>
                            <strong>Notes:</strong> {event.notes}
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
      
    </>
  )
}
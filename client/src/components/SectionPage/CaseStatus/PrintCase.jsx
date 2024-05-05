import * as React from 'react'
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { CaseDetails } from './CaseDetails';
import { useGetHistory } from '../../../Hooks/useGetHistory';
import { useReactToPrint } from 'react-to-print'
import header from '../../../assets/header2.jpg' 

export function PrintCase() {
    const { caseID } = useParams()
    const [history, setHistory] = React.useState([])
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
    
    const caseRef = React.useRef();
  
    const handlePrint = useReactToPrint({
      content: () => caseRef.current,
    });
    
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
         <Button onClick={handlePrint}>
            Print
          </Button>
          <Button sx={{ m: 3, display: 'flex', mr: 4 }} variant='contained' onClick={() => window.history.back()}>
            Back
          </Button> 
          
        </div>
        <Typography variant='h3' sx={{ textAlign: 'center' }}>Print Case Details</Typography>
        <div ref={caseRef}>
            <img src={header} style={{ width: '-webkit-fill-available' }}/>
          
            <Card sx={{ mx: 'auto' }}>
                <Typography sx={{ textAlign: 'center' }} variant='h3'>Case Status</Typography>
                <Typography sx={{ textAlign: 'center' }} variant='h5'>{caseDetails.status ? caseDetails.status : 'Status Undefined'}</Typography>
                <CardContent>
                <table>
                    <tbody>
                        <tr>
                        <th style={{ borderTopLeftRadius: '15px' }}><Typography variant='h5'>Date of Incident</Typography></th>
                        <th><Typography variant='h5'>Violator</Typography></th>
                        <th><Typography variant='h5'>Violation</Typography></th>
                        <th><Typography variant='h5'>Violation Description</Typography></th>
                        <th style={{ borderTopRightRadius: '15px' }}><Typography variant='h5'>Reporting Officer/Witness</Typography></th>

                        
                        </tr>
                        <tr>
                            <td><Typography variant='h5'>{new Date(caseDetails.date).toLocaleDateString()}</Typography></td>
                            <td><Typography variant='h5'>{caseDetails.violator}</Typography></td>
                            <td><Typography variant='h5'>{caseDetails.violation}</Typography></td>
                            <td><Typography variant='h5'>{caseDetails.violationDescription}</Typography></td>
                            <td><Typography variant='h5'>{caseDetails.witness}</Typography></td>
                        </tr> 
                    </tbody>
                    </table>

                </CardContent>
            </Card>






          
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
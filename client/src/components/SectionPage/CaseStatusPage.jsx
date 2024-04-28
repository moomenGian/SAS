import { Card, CardContent, CardHeader, Button } from '@mui/material'
import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { EditForm } from './EditForm';

export function CaseStatusPage() {
  const { caseID } = useParams()
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
        console.log(caseDetails);
      } catch (error) {
        console.error('Error fetching case data:', error);
      }
    };
    fetchCaseData();
  }, [caseID]);


  return (
    <>
      <h1>case status page</h1>
      <Card>
        <CardHeader sx={{ textAlign: 'center' }} title="Case Status" subheader={'open'} />
        <CardContent>
          {/* <Typography variant="body1"><strong>Violator:</strong> {caseDetails.violator}</Typography>
          <Typography variant="body1"><strong>Violation:</strong> {caseDetails.violation}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {caseDetails.violationDescription}</Typography>
          <Typography variant="body1"><strong>Date:</strong> {new Date(caseDetails.date).toLocaleDateString()}</Typography> */}
          <table>
              <tbody>
                <tr>
                  <td>Date of Incident:</td>
                  <td>{new Date(caseDetails.date).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td>Violation Type:</td>
                  <td>{caseDetails.violation}</td>
                </tr>
                <tr>
                  <td>Violator:</td>
                  <td>{caseDetails.violator}</td>
                </tr>
                <tr>
                  <td>Description:</td>
                  <td>{caseDetails.violationDescription}</td>
                </tr>
                <tr>
                  <td>Reporting Officer/Witness:</td>
                  <td>{caseDetails.witness}</td>
                </tr>
              </tbody>
            </table>

          {caseDetails.violation && <EditForm record={caseDetails}/>}
          <Button variant="contained" sx={{ mr: 0 }}>Update Status</Button> 
          <Button variant="contained">Assign Actions</Button>

          <Typography variant="h6" sx={{ mt: 2 }}>Case History</Typography>
        </CardContent>
      </Card>
      {/* <Link to={'/Home'}>Back</Link> */}
      <Button onClick={() => window.history.back()}>
        Back
      </Button>
    </>
  )
}
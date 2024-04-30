import { Button, Card, CardContent, Typography } from '@mui/material'
import * as React from 'react'
import { UpdateStatus } from '../updateStatus'
import { EditForm } from '../EditForm'
import { CaseHistoryForm } from './CaseHistoryForm'

export function CaseDetails({ caseDetails, caseID }) {
  return (
    <>
      <Card sx={{ mx: 'auto' }}>
        {/* <CardHeader sx={{ textAlign: 'center'}} title="Case Status" subheader={caseDetails.status} /> */}
        <Typography sx={{ textAlign: 'center' }} variant='h2'>Case Status</Typography>
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

          {caseDetails.violation && <div style={ {marginBottom: '8px'} }><EditForm record={caseDetails}/></div>}
          <div style={{marginBottom: '8px'}}>
            <UpdateStatus recordID={caseID}/>
          </div>
          {/* <Button variant="contained" sx={{ mb: 1 }}>Update Status</Button> 
          <Button variant="contained">Assign Actions</Button> */}
          <CaseHistoryForm caseID={caseID}/>

        </CardContent>
      </Card>
    </>
  )
}
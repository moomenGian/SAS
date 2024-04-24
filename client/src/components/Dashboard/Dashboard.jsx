import Navbar from '../Navbar/Navbar'
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import './Dashboard.scss'
import { getSectionViolations } from './SectionViolationsChart'
import { MostCommitedViolationsChart } from './ViolationsChart';
import { Card, Box, CardContent, Typography } from '@mui/material';



function Dashboard() {
    const [violationNumbers, setViolationNumbers] = useState([0]);
    const [sections, setSections] = useState(['null']);
    const maxSectionsToShow = 8; 

    useEffect(() => {
        async function fetchData() {
            const { violationNumbers, sections } = await getSectionViolations();
            setViolationNumbers(violationNumbers);
            setSections(sections.slice(0, maxSectionsToShow));
            console.log(JSON.stringify(await getSectionViolations(), null, 2));
        }

        fetchData();
    }, []);
    
    return(
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1 px-0">
                        <Navbar />
                    </div>
                    <div className="col-11 px-0 chartsContainer">
                        
                        <Card variant='outlined'>
                            <CardContent>
                                <BarChart
                                    width={650}
                                    height={300}
                                    series={[
                                        { data: violationNumbers, label: 'Section With The Most Violations', id: 'pvId' },
                                    ]}
                                    xAxis={[{ data: sections, scaleType: 'band' }]}
                                    className='barChart'
                                />
                            </CardContent>
                        </Card>
                        <Card variant='outlined' className='violationChart'>
                            <CardContent>
                                <Typography variant='h4'>
                                    Most Commited Violations
                                </Typography>
                                <MostCommitedViolationsChart />
                            </CardContent>
                        </Card>
                        
                    </div>
                </div>
            </div>
            
    </>
    )
}

export default Dashboard
import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import './SectionPage.css'
import { Link } from 'react-router-dom'
import { RecordForm } from "./RecordForm"
import { Button, Input, TextField, Tooltip } from "@mui/material"
import { useParams } from "react-router-dom"
import { EditForm } from "./EditForm"
import { EditAdviserForm } from "./EditAdviserForm"
import { EditSectionName } from "./editSectionName"



async function fetchSectionDatas(sectionName, setData) {

    try {
        const response = await fetch(`http://localhost:3000/api/sections/${sectionName}`)
        
        if(response.status === 404){
            console.log('section has no records')
            return
        }

        const dataFetched = await response.json()
        setData(dataFetched)
    } catch (error) {
        console.error(error);
    }
}


function Content({Strand, sectionName}) {
    //replace the % from the section name url
    const formattedSecName = sectionName.replaceAll(' ','')
    

    const [ data,setData ] = useState(null)

    useEffect(() => {
        fetchSectionDatas(formattedSecName, setData)
    }, [formattedSecName])
    

    let adviser
    if(data){
        const { adviser: extractedAdviser } = data[0][formattedSecName]
        adviser = extractedAdviser
    }
    
    let violations = [];

    const fetchViolations = async () => {
        if (data) {
            await Promise.all(data.map(async (element, index) => {
                let e = Object.values(element)[0].violations[0];
                violations.push(e);
            }));
        }
    };
    fetchViolations()

    return (
        <>
            <h1 className="header">STUDENT VIOLATION RECORDS 
                <Link to={'/Home'} className="d-flex flex-row-reverse btn text-primary">Back</Link>  
            </h1>

            <div className="sectionInfo">
                <h2>
                    {Strand} / {sectionName} / {adviser ? adviser : '<Adviser not found>'} 
                    <EditAdviserForm sectionName={formattedSecName}/>
                    <EditSectionName name={formattedSecName}/>
                </h2>
                <p>Total Violations: {violations ? violations.length : 0}</p>
            </div>
            <table>
                    <thead>
                        <tr>
                            <th style={{ borderTopLeftRadius: '15px' }}>
                                NAME
                            </th>
                            <th>
                                VIOLATION
                            </th>
                            <th>
                                VIOLATION DESCRIPTION
                            </th>
                            <th>
                                REPORTING OFFICER/ WITNESS
                            </th>
                            <th>
                                DATE
                            </th>
                            <th style={{ borderTopRightRadius: '15px' }}>
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {violations.length === 0 ? (
                            <tr>
                                <td colSpan={6}>No Records Found</td>
                            </tr>
                        ) : (
                            violations.map(record => {
                                const date = new Date(record.date).toLocaleDateString() 
                                return (
                                    <tr key={`${record.id}`}>
                                        <td>{record.violator}</td>
                                        <td>{record.violation}</td>
                                        <td>{record.violationDescription}</td>
                                        <td>{record.witness}</td>
                                        <td>{date}</td>
                                        <td style={{ alignContent: 'center', height: '68px' }} className="actionBtns">
                                            <EditForm record={record}/>
                                            <Tooltip title={'View more details'}>
                                                <Button
                                                    variant="contained"
                                                >   
                                                    <Link className="viewBtn" style={{color: 'white'}} to={`/CaseStatus/${record.id}`}>VIEW</Link>
                                                </Button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                        <tr colSpan={5}>
                             <td colSpan={6}><RecordForm adviser1={
                                adviser
                            } section_name={formattedSecName}/> {/*<AddRecordBtn section_Name={formattedSecName}/>*/}</td> 
                        </tr>
                    </tbody>
                    
            </table>
        </>
    )
}



function SectionPage() {
    let { Strand,sectionName } = useParams()
    Strand = Strand.slice(1)

    return ( 
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1 px-0">
                        <Navbar />
                    </div>
                    <div className="col-11 px-0">
                        <Content sectionName={sectionName} Strand={Strand} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionPage
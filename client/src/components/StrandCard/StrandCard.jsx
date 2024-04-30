import { Link } from 'react-router-dom'
import './StrandCard.css'
import { AddSection } from './AddSection'
import { Typography } from '@mui/material'

function StrandCard({ Strand, Sections}) {
    return(
        <>
            <div className="Card">
                <div className='card-content'>
                    <div className='d-flex justify-content-between px-3'>
                        <h6>
                            {Strand} 
                            <AddSection strand={Strand}/>
                        </h6>
                        <h6 className='violation-header'>Violations</h6>
                    </div>
                    

                    <div className="card-box">
                        
                        {   
                            Sections.length ? 
                                Sections.map((section, index) => (
                                    <Link key={`${section.sectionName} - ${index}`} 
                                        to={`/section/:${Strand}/${section.sectionName}`}
                                    >
                                        <div key={index} className='d-flex px-2 justify-content-between main'>
                                            <p className='text-center mb-0 text-nowrap' >{section.sectionName}</p>
                                            <p className='text-center violation mb-0' >{section.violation}</p>
                                        </div>
                                    </Link>
                                )) 
                            :
                            <Typography sx={{ textAlign: 'center', marginBlock: 'revert' }} variant='h6'>
                                No Record.
                            </Typography>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default StrandCard
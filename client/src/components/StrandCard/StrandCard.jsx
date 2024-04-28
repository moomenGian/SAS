import { Link } from 'react-router-dom'
import './StrandCard.css'
import {PlusCircleTwoTone} from '@ant-design/icons'
import { Button, Tooltip } from '@mui/material'

function StrandCard({ Strand, Sections}) {
    return(
        <>
            <div className="Card">
                <div className='card-content'>
                    <div className='d-flex justify-content-between px-3'>
                        <h6>
                            {Strand} 
                            <Tooltip title={<><h6>Add a New Section</h6></>}>
                                <Button sx={{ ml: -2 }}>
                                    <PlusCircleTwoTone />
                                </Button>
                            </Tooltip>
                        </h6>
                        <h6 className='violation-header'>Violations</h6>
                    </div>
                    

                    <div className="card-box">
                        
                        { Sections.map((section, index) => (
                            <Link key={section.name} 
                                  to={`/section/:${Strand}/${section.name}`}
                            >
                                <div key={`${section.name}-${index}`} className='d-flex px-2 justify-content-between main'>
                                    <p className='text-center mb-0 text-nowrap' >{section.name}</p>
                                    <p className='text-center violation mb-0' >{section.violation}</p>
                                </div>
                            </Link>
                        )) }

                    </div>
                </div>
            </div>
        </>
    )
}

export default StrandCard
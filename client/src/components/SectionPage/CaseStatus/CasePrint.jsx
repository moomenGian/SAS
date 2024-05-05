import { Button } from '@mui/material';

import { CaseStatusPage } from './CaseStatusPage';

export function CasePrint() {
    

    return (
        <>
            <Button sx={{ mr: 4 }} onClick={handlePrint}>
                Print
            </Button>
            <div ref={caseRef} style={{display: 'hidden'}}>
            </div>
        </>

        
    )
}
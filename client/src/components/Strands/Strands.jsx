import { useGetSections } from "../../Hooks/useGetSections";
import StrandCard from "../StrandCard/StrandCard"
import './Strands.css'
import { useState, useEffect } from "react";


async function getNumOfViolations(sectionName) {


    try {
        const response = await fetch(`http://localhost:3000/api/sections/${sectionName}`)
        
        if(response.status === 404){
            return null
        }

        const dataFetched = await response.json()
        return dataFetched.length
    } catch (error) {
        console.error(error)
    }
}


async function getViolationCountAndUpdate(sections, setSectionData) {
    const updatedData = await Promise.all(
        sections.map(async section => {
            const violationCount = await getNumOfViolations(section.sectionName.replaceAll(' ', ''));
            return { ...section, violation: violationCount ?? 0 };
        })
    )

    setSectionData(updatedData)
}



function Strands() {    

    const [STEMSections, setSTEMSections] = useState('')
    const [ABMSections, setABMSections] = useState('')
    const [HUMSSSections, setHUMSSSections] = useState('')
    const [ICTSections, setICTSections] = useState('')
    const [AUTOSections, setAUTOSections] = useState('')
    const [BAPSections, setBAPSections] = useState('')
    const [EIMSections, setEIMSections] = useState('')
    const [GFDSections, setGFDSections] = useState('')

    const strands = [
        'STEM', 'ABM', 'HUMSS', 'TVL - ICT', 'TVL - BAP', 'TVL - AUTOMOTIVE', 'TVL - EIM', 'TVL - GFD'
    ]

    const sectionSetters = [
        setSTEMSections,
        setABMSections,
        setHUMSSSections,
        setICTSections,
        setBAPSections,
        setAUTOSections,
        setEIMSections,
        setGFDSections
    ]

    useEffect(() => {

        strands.forEach(async (strand, index) => {
                const sections = await useGetSections(strand)
                sectionSetters[index](sections)
                getViolationCountAndUpdate(sections, sectionSetters[index])
        })

    }, [])

    return(
        <>
            <div className="s">
                <StrandCard Strand={'STEM'} Sections={ STEMSections }/>
                <StrandCard Strand={'ABM'} Sections={ ABMSections }/>
                <StrandCard Strand={'HUMSS'} Sections={ HUMSSSections }/>
                <StrandCard Strand={'TVL - ICT'} Sections={ ICTSections }/>
                <StrandCard Strand={'TVL - BAP'} Sections={ BAPSections }/>
                <StrandCard Strand={'TVL - AUTOMOTIVE'} Sections={ AUTOSections }/>
                <StrandCard Strand={'TVL - EIM'} Sections={EIMSections}/>
                <StrandCard Strand={'TVL - GFD'} Sections={GFDSections} />
            </div>
        </>
    )
}

export default Strands
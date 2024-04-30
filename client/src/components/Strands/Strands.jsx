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

    

    const [STEMSections, setSTEMSections] = useState([
        { sectionName: 'No Records'}
    ])

    const [ABMSections, setABMSections] = useState([
        { sectionName: 'No Records'}
    ])

    const [HUMSSSections, setHUMSSSections] = useState([
        { sectionName: 'No Records'}
    ])

    const [ICTSections, setICTSections] = useState([
        { sectionName: 'No Records'}
    ])
    
    const [AUTOSections, setAUTOSections] = useState('')

    const [BAPSections, setBAPSections] = useState('')

    const STRANDS = ['STEM', 'ABM', 'HUMSS', 'TVL - ICT', 'TVL - BAP', 'TVL - AUTO']

    useEffect(() => {
        const fetchData = async () => {
            const STEMSections = await useGetSections('STEM');
            setSTEMSections(STEMSections);
            getViolationCountAndUpdate(STEMSections, setSTEMSections);

            const ABMSections = await useGetSections('ABM');
            setABMSections(ABMSections);
            getViolationCountAndUpdate(ABMSections, setABMSections);

            const HUMSSSections = await useGetSections('HUMSS');
            setHUMSSSections(HUMSSSections);
            getViolationCountAndUpdate(HUMSSSections, setHUMSSSections);

            const ICTSections = await useGetSections('TVL - ICT');
            setICTSections(ICTSections);
            getViolationCountAndUpdate(ICTSections, setICTSections);

            const BAPSections = await useGetSections('TVL - BAP');
            setBAPSections(BAPSections);
            getViolationCountAndUpdate(BAPSections, setBAPSections);

            const AUTOSections = await useGetSections('TVL - AUTO');
            setAUTOSections(AUTOSections);
            getViolationCountAndUpdate(AUTOSections, setAUTOSections);
        }
        fetchData()
    }, [])

    


    // const [STEMData, setSTEMData] = useState([
    //     { name: '11 - EUCLID', violation: 0 },//Jericho Sim
    //     { name: '11 - DESCARTES', violation: 0 },//Jennifer Ricohermoso
    //     { name: '12 - GALILEI', violation: 0 },//Gerald Martos
    //     { name: '12 - EINSTEIN', violation: 0 }//Cyra Mae Baybay
    // ]);

    // useEffect(() => {
    //     getViolationCountAndUpdate(STEMData, setSTEMData)
    // }, [])

    
    // const [ABMData, setABMData] = useState([
    //     { name: '11 - MAXWELL', violation: 0 },// Aldren Lorica
    //     { name: '11 - FIEDLER', violation: 0 },// Ma.Clara Gaborni
    //     { name: '11 - FORD', violation: 0 },// Bernabe Jr. Rabot
    //     { name: '12 - PACIOLI', violation: 0 },//Marissa Cristobal
    //     { name: '12 - DRUCKER', violation: 0 }//Rodel Occiano
    // ]);

    // useEffect(() => {
    //     getViolationCountAndUpdate(ABMData, setABMData)
    // }, [])


    // const [HUMMSData, setHUMMSData] = useState([
    //     { name: '11 - LOVE', violation: 0 },//Jeffrie Ditablan
    //     { name: '11 - HOPE', violation: 0 },//Robey Bugayon
    //     { name: '12 - FAITH', violation: 0 },//Marigold Defensor
    //     { name: '12 - AMITY', violation: 0 },//Jenny Darang
    //     { name: '12 - INTEGRITY', violation: 0 }//Roy Discutido
    // ])

    // useEffect(() => {
    //     getViolationCountAndUpdate(HUMMSData, setHUMMSData)
    // }, [])


    // const [BAPData, setBapData] = useState([
    //     { name: '11 - CROISSANT', violation: 0 },//Jesselin Apigo
    //     { name: '11 - MUFFIN', violation: 0 },//Evelyn Felicia
    //     { name: '12 - BATONNET', violation: 0 },//Alexis Maravillas
    //     { name: '12 - CHIFFONADE', violation: 0 },//Cenecia Moreno
    //     { name: '12 - JULLIENNE', violation: 0 }//Judy Francisco
    // ], [])

    // useEffect(() => {
    //     getViolationCountAndUpdate(BAPData, setBapData)
    // }, [])


    // const [AUTOData, setAutoData] = useState([
    //     { name: '11 - JAGUAR', violation: 0 },//Ricardo Hinanay
    //     { name: '11 - AUDI', violation: 0 },// John Ray Obina
    //     { name: '12 - PORSCHE', violation: 0 },//Anabelle Peralta
    //     { name: '12 - BMW', violation: 0 }//Dexter Rejano
    // ], [])

    // useEffect(() => {
    //     getViolationCountAndUpdate(AUTOData, setAutoData)
    // }, [])


    return(
        <>
            <div className="s">
                <StrandCard Strand={'STEM'} Sections={ STEMSections }/>
                <StrandCard Strand={'ABM'} Sections={ ABMSections }/>
                <StrandCard Strand={'HUMMS'} Sections={ HUMSSSections }/>
                <StrandCard Strand={'TVL - ICT'} Sections={ ICTSections }/>
                <StrandCard Strand={'TVL - BAP'} Sections={ BAPSections }/>
                <StrandCard Strand={'TVL - AUTOMOTIVE'} Sections={ AUTOSections }/>
            </div>
        </>
    )
}

export default Strands
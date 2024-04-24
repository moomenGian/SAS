import { getAllRecords } from "../../Hooks/getAllRecords"


async function validateData(){
    const data = await getAllRecords();

    const countOccurrences = Object.values(data).reduce((acc, sectionObj) => {
        const sectionName = Object.keys(sectionObj)[0]; // Extract the section name
        acc[sectionName] = (acc[sectionName] || 0) + 1;
        return acc;
      }, {});
      
    
    return countOccurrences
}

export async function getSectionViolations(){
    const data = await validateData()
      
      // Sort section names based on the number of violations in descending order
      const sortedSections = Object.keys(data).sort((a, b) => data[b] - data[a]);
      
      // Extract violation numbers and section names
      const violationNumbers = sortedSections.map(sectionName => data[sectionName]);
      const sections = sortedSections;
      
      
      return { violationNumbers, sections };
} 
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { getAllRecords } from '../../Hooks/getAllRecords';
import './Dashboard.scss'




const rawdata = await getAllRecords()


const violationCounts = {};

rawdata.forEach(item => {
    const violations = item[Object.keys(item)[0]].violations; // Extract violations array
    violations.forEach(violation => {
        const { violation: violationName } = violation;
        if (violationCounts[violationName]) {
            violationCounts[violationName]++;
        } else {
            violationCounts[violationName] = 1;
        }
    });
});
// Convert violationCounts object to an array of objects
const aggregatedData = Object.entries(violationCounts).map(([violation, count]) => ({
    violation,
    count,
}));

// Sort aggregatedData by count in descending order
// aggregatedData.sort((a, b) => b.count - a.count);

const data = aggregatedData.map(({ violation, count }, index) => ({
    label: violation,
    value: count
}));


  
const pieSizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
};


export function MostCommitedViolationsChart(){
    return (
        <>
            <PieChart
                series={[
                    {
                    outerRadius: 80,
                    data,
                    arcLabel: getArcLabel,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: 14,
                    },
                }}
                {...pieSizing}
                className='pieChart'
            />
        </>
    )
}
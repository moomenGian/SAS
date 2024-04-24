import { Chart,
         CategoryScale,
         BarElement,
         LinearScale,
         Title,
         Tooltip,
         Legend } from 'chart.js'

import { Bar } from 'react-chartjs-2'

Chart.register(
    BarElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
          position: 'top',
        },
        title: {
        display: true,
        text: 'Alam mo ba girl',
        },
    },
};

const labels = ['12 - CARMACK', '12 - BERNERS LEE', '12 - GALIGEI', '11 - RUBY', '11 - VOLT', '11  - JAGUAR', '12  - PACIOLI'];
const l = [1,2,3,4,5,6,7]

export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: l.map((i) => i * 2),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

export default function ChartchartTest() {
    
    return(
        <>
            <Bar style={{marginInline: 50}} options={options} data={data}></Bar>
        </>
    )
}
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display:false
    },
    title: {
      display: true,
      text: 'Biểu đồ tiêu thụ điện',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: '',
      data: [100, 200,300, 400, 200, 500, 1000, 100,500, 100, 1400, 500 ],
      borderColor: 'rgb(255,159,67)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function Chart({chartName}:{chartName: string}) {
  return <Line options={{
  responsive: true,
  plugins: {
    legend: {
      display:false
    },
    title: {
      display: true,
      text: chartName,
    },
  },
}} data={data} />;
}

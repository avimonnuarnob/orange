/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
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
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function OverView({ data }) {
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    if (data) {
      const labels = [];
      const d = [];
      data.list.forEach((el) => {
        d.push(el.main.temp);
        labels.push(el.dt_txt);
      });

      setChartData({
        labels,
        datasets: [
          {
            label: 'Weather data for individual date time',
            data: d,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    }
  }, [data]);

  return (
    <>
      {chartData ? (
        <div style={{ width: '100%', height: '100%' }}>
          <Line options={options} data={chartData} />{' '}
        </div>
      ) : null}
    </>
  );
}

export default OverView;

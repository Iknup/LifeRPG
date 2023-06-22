import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const PieChart = ({ chartData }) => {
  return (
    <Pie
      data={chartData}
      options={{
        plugins: { legend: { display: false } },
        elements: { arc: { borderWidth: 0 } },
      }}
    />
  );
};

export default PieChart;

import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import styled from '@emotion/styled';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  padding: 1rem 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0.5rem;
  justify-content: center;
  align-items: center;
`;

const ButtonPosition = styled.div`
  padding: 0 0.25rem;
`;

const Button = styled.button`
  width: 6rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  background-color: rgba(83, 92, 83, 0.65);
  color: #ffffff;
`;

const ChartWrapperBar = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const ChartWrapperDiagram = styled.div`
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 650px) {
    transform: scale(0.9);
  }
`;

interface ChartProps {
  data: number[];
}

const LABELS = [
  'start letter',
  'start letters',
  'end letter',
  'letter times',
  'repeat letters',
];

const COLORS = [
  'rgba(83, 92, 83, .65)',
  'rgba(154,205,50, .85)',
  'rgba(34, 139, 143, .65)',
  'rgba(60, 179, 113, .35)',
  'rgba(173,255,47, .65)',
];

const OPTIONS = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' as const },
    title: { display: true, text: 'Dictionary count of words' },
  },
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  const [isBarChartVisible, setIsBarChartVisible] = useState(true);

  // пересчитываем данные только когда изменится props.data
  const chartData = useMemo(
    () => ({
      labels: LABELS,
      datasets: [
        {
          label: 'Search letters into the Dictionary',
          data,
          backgroundColor: COLORS,
        },
      ],
    }),
    [data]
  );

  return (
    <Container>
      <ButtonWrapper>
        <ButtonPosition>
          <Button onClick={() => setIsBarChartVisible(true)}>Bar</Button>
        </ButtonPosition>
        <ButtonPosition>
          <Button onClick={() => setIsBarChartVisible(false)}>Diagram</Button>
        </ButtonPosition>
      </ButtonWrapper>

      {isBarChartVisible ? (
        <ChartWrapperBar>
          <Bar options={OPTIONS} data={chartData} />
        </ChartWrapperBar>
      ) : (
        <ChartWrapperDiagram>
          <Doughnut data={chartData} />
        </ChartWrapperDiagram>
      )}
    </Container>
  );
};

export default Chart;

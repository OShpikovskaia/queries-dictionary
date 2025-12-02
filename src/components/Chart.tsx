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

const Button = styled.button<{ active: boolean }>`
  width: 6rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 2px solid #333;
  background-color: ${({ active }) =>
    active ? 'rgba(83, 92, 83, 0.9)' : 'rgba(83, 92, 83, 0.65)'};
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.1s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
`;


// const ChartWrapperBar = styled.div`
//   max-width: 700px;
//   margin: 0 auto;
// `;

// const ChartWrapperDiagram = styled.div`
//   max-width: 500px;
//   margin: 0 auto;

//   @media (max-width: 650px) {
//     transform: scale(0.9);
//   }
// `;
const ChartWrapperBar = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 0.5rem;
`;

const ChartWrapperDiagram = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 0.5rem;
`;

const ChartArea = styled.div`
  position: relative;
  width: 100%;
  height: 260px; /* базовая высота для мобилки */

  @media (min-width: 600px) {
    height: 320px;
  }

  @media (min-width: 900px) {
    height: 380px;
  }
`;


const LegendWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const LegendColor = styled.span<{ color: string }>`
  width: 1.5rem;
  height: 0.8rem;
  border-radius: 2px;
  background-color: ${({ color }) => color};
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
  maintainAspectRatio: false as const,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Dictionary count of words' },
  },
};

const Chart: React.FC<ChartProps> = ({ data }) => {
  const [isBarChartVisible, setIsBarChartVisible] = useState(true);

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
          <Button onClick={() => setIsBarChartVisible(true)} active={isBarChartVisible}>Bar</Button>
        </ButtonPosition>
        <ButtonPosition>
          <Button onClick={() => setIsBarChartVisible(false)} active={!isBarChartVisible}>Diagram</Button>
        </ButtonPosition>
      </ButtonWrapper>

      {isBarChartVisible ? (
        <ChartWrapperBar>
          <ChartArea>
            <Bar options={OPTIONS} data={chartData} />
          </ChartArea>
        </ChartWrapperBar>
      ) : (
        <ChartWrapperDiagram>
          <ChartArea>
            <Doughnut options={OPTIONS} data={chartData} />
          </ChartArea>
        </ChartWrapperDiagram>
      )}
      <LegendWrapper>
        {LABELS.map((label, index) => (
          <LegendItem key={label}>
            <LegendColor color={COLORS[index]} />
            <span>{label}</span>
          </LegendItem>
        ))}
      </LegendWrapper>
    </Container>
  );
};

export default Chart;

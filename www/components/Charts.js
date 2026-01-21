'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const colors = {
  fc: {
    bar: 'rgba(16, 185, 129, 0.7)',
    border: '#10b981',
  },
  rrule: {
    bar: 'rgba(107, 114, 128, 0.5)',
    border: '#6b7280',
  },
};

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index',
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#71717a',
        font: { family: 'monospace', size: 11 },
        boxWidth: 12,
        padding: 16,
      },
    },
    tooltip: {
      backgroundColor: '#18181b',
      borderColor: '#3f3f46',
      borderWidth: 1,
      titleColor: '#fafafa',
      bodyColor: '#a1a1aa',
      titleFont: { family: 'monospace', size: 12 },
      bodyFont: { family: 'monospace', size: 11 },
      padding: 10,
    },
  },
  scales: {
    x: {
      ticks: { color: '#71717a', font: { family: 'monospace', size: 10 } },
      grid: { color: '#27272a', drawBorder: false },
    },
    y: {
      ticks: { color: '#71717a', font: { family: 'monospace', size: 10 } },
      grid: { color: '#27272a', drawBorder: false },
    },
  },
};

export function RecurrenceChart({ data }) {
  if (!data || data.length === 0) return <div className="text-zinc-500">No data</div>;

  const chartData = {
    labels: data.map(d => d.scenario),
    datasets: [
      {
        label: 'ForceCalendar',
        data: data.map(d => d.forceCalendar),
        backgroundColor: colors.fc.bar,
        borderColor: colors.fc.border,
        borderWidth: 1,
      },
      {
        label: 'rrule',
        data: data.map(d => d.rrule),
        backgroundColor: colors.rrule.bar,
        borderColor: colors.rrule.border,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    ...baseOptions,
    indexAxis: 'y',
    scales: {
      ...baseOptions.scales,
      x: {
        ...baseOptions.scales.x,
        title: {
          display: true,
          text: 'ops/sec',
          color: '#71717a',
          font: { family: 'monospace', size: 10 },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

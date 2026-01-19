'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const fcColor = 'rgb(59, 130, 246)';
const fcColorLight = 'rgba(59, 130, 246, 0.7)';
const fullColor = 'rgb(245, 158, 11)';
const fullColorLight = 'rgba(245, 158, 11, 0.7)';

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#9ca3af',
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#9ca3af' },
      grid: { color: '#374151' },
    },
    y: {
      ticks: { color: '#9ca3af' },
      grid: { color: '#374151' },
    },
  },
};

export function RenderingChart({ data }) {
  const chartData = {
    labels: data.map(d => `${d.events.toLocaleString()} events`),
    datasets: [
      {
        label: 'ForceCalendar',
        data: data.map(d => d.forceCalendar),
        backgroundColor: fcColorLight,
        borderColor: fcColor,
        borderWidth: 2,
      },
      {
        label: 'FullCalendar',
        data: data.map(d => d.fullCalendar),
        backgroundColor: fullColorLight,
        borderColor: fullColor,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Rendering Performance (ops/sec) - Higher is Better',
        color: '#fff',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export function MemoryChart({ data }) {
  const chartData = {
    labels: data.map(d => `${d.events.toLocaleString()} events`),
    datasets: [
      {
        label: 'ForceCalendar',
        data: data.map(d => d.forceCalendar),
        borderColor: fcColor,
        backgroundColor: fcColorLight,
        tension: 0.3,
      },
      {
        label: 'FullCalendar',
        data: data.map(d => d.fullCalendar),
        borderColor: fullColor,
        backgroundColor: fullColorLight,
        tension: 0.3,
      },
    ],
  };

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Memory Usage (KB) - Lower is Better',
        color: '#fff',
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export function RecurrenceChart({ data }) {
  const chartData = {
    labels: data.map(d => d.scenario),
    datasets: [
      {
        label: 'ForceCalendar',
        data: data.map(d => d.forceCalendar),
        backgroundColor: fcColorLight,
        borderColor: fcColor,
        borderWidth: 2,
      },
      {
        label: 'FullCalendar (rrule)',
        data: data.map(d => d.fullCalendar),
        backgroundColor: fullColorLight,
        borderColor: fullColor,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    ...commonOptions,
    indexAxis: 'y',
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Recurrence Expansion (ops/sec) - Higher is Better',
        color: '#fff',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export function BundleSizeChart({ data }) {
  const chartData = {
    labels: ['ForceCalendar', 'FullCalendar'],
    datasets: [
      {
        label: 'Bundle Size (KB)',
        data: [data.forceCalendar.total, data.fullCalendar.total],
        backgroundColor: [fcColorLight, fullColorLight],
        borderColor: [fcColor, fullColor],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Total Bundle Size (KB) - Lower is Better',
        color: '#fff',
      },
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

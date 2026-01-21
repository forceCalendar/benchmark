'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
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
  LogarithmicScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const colors = {
  fc: {
    line: '#10b981',
    fill: 'rgba(16, 185, 129, 0.1)',
    bar: 'rgba(16, 185, 129, 0.7)',
  },
  full: {
    line: '#6b7280',
    fill: 'rgba(107, 114, 128, 0.1)',
    bar: 'rgba(107, 114, 128, 0.5)',
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
      displayColors: true,
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

export function RenderingChart({ data }) {
  if (!data || data.length === 0) return <div className="text-zinc-500">No data</div>;

  const chartData = {
    labels: data.map(d => d.events?.toLocaleString() || d.eventCount?.toLocaleString()),
    datasets: [
      {
        label: '@forcecalendar/core',
        data: data.map(d => d.forceCalendar),
        backgroundColor: colors.fc.bar,
        borderColor: colors.fc.line,
        borderWidth: 1,
      },
      {
        label: '@fullcalendar/core',
        data: data.map(d => d.fullCalendar),
        backgroundColor: colors.full.bar,
        borderColor: colors.full.line,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    ...baseOptions,
    scales: {
      ...baseOptions.scales,
      y: {
        ...baseOptions.scales.y,
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

export function MemoryChart({ data }) {
  if (!data || data.length === 0) return <div className="text-zinc-500">No data</div>;

  const chartData = {
    labels: data.map(d => d.events?.toLocaleString() || d.eventCount?.toLocaleString()),
    datasets: [
      {
        label: '@forcecalendar/core',
        data: data.map(d => d.forceCalendar),
        borderColor: colors.fc.line,
        backgroundColor: colors.fc.fill,
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: colors.fc.line,
      },
      {
        label: '@fullcalendar/core',
        data: data.map(d => d.fullCalendar),
        borderColor: colors.full.line,
        backgroundColor: colors.full.fill,
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: colors.full.line,
      },
    ],
  };

  const options = {
    ...baseOptions,
    scales: {
      ...baseOptions.scales,
      y: {
        ...baseOptions.scales.y,
        title: {
          display: true,
          text: 'KB',
          color: '#71717a',
          font: { family: 'monospace', size: 10 },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export function RecurrenceChart({ data }) {
  if (!data || data.length === 0) return <div className="text-zinc-500">No data</div>;

  const chartData = {
    labels: data.map(d => d.scenario || d.name),
    datasets: [
      {
        label: '@forcecalendar/core',
        data: data.map(d => d.forceCalendar),
        backgroundColor: colors.fc.bar,
        borderColor: colors.fc.line,
        borderWidth: 1,
      },
      {
        label: 'rrule',
        data: data.map(d => d.fullCalendar),
        backgroundColor: colors.full.bar,
        borderColor: colors.full.line,
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

export function BundleSizeChart({ data }) {
  if (!data) return <div className="text-zinc-500">No data</div>;

  const fcPkgs = data.forceCalendar || {};
  const fullPkgs = data.fullCalendar || {};

  const chartData = {
    labels: ['Total Size'],
    datasets: [
      {
        label: '@forcecalendar/core',
        data: [fcPkgs.total || 0],
        backgroundColor: colors.fc.bar,
        borderColor: colors.fc.line,
        borderWidth: 1,
      },
      {
        label: '@fullcalendar/* stack',
        data: [fullPkgs.total || 0],
        backgroundColor: colors.full.bar,
        borderColor: colors.full.line,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    ...baseOptions,
    scales: {
      ...baseOptions.scales,
      y: {
        ...baseOptions.scales.y,
        title: {
          display: true,
          text: 'KB',
          color: '#71717a',
          font: { family: 'monospace', size: 10 },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

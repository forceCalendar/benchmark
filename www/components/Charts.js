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

const palette = {
  fc: {
    bg: 'rgba(16, 185, 129, 0.65)',
    border: 'rgba(16, 185, 129, 0.9)',
  },
  other: {
    bg: 'rgba(100, 116, 139, 0.45)',
    border: 'rgba(100, 116, 139, 0.7)',
  },
};

function makeBaseOptions(overrides = {}) {
  return {
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
          color: '#64748b',
          font: { family: "'JetBrains Mono', monospace", size: 11, weight: '500' },
          boxWidth: 10,
          boxHeight: 10,
          padding: 20,
          useBorderRadius: true,
          borderRadius: 2,
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#1e293b',
        borderWidth: 1,
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        titleFont: { family: "'JetBrains Mono', monospace", size: 12, weight: '600' },
        bodyFont: { family: "'JetBrains Mono', monospace", size: 11 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 4,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#475569',
          font: { family: "'JetBrains Mono', monospace", size: 10 },
        },
        grid: { color: 'rgba(30, 41, 59, 0.5)', drawBorder: false },
      },
      y: {
        ticks: {
          color: '#475569',
          font: { family: "'JetBrains Mono', monospace", size: 10 },
        },
        grid: { color: 'rgba(30, 41, 59, 0.5)', drawBorder: false },
      },
    },
    ...overrides,
  };
}

export function BundleSizeChart({ fcTotal, fullTotal }) {
  if (!fcTotal || !fullTotal) return null;

  const data = {
    labels: ['ForceCalendar', 'FullCalendar'],
    datasets: [
      {
        data: [fcTotal / 1024, fullTotal / 1024],
        backgroundColor: [palette.fc.bg, palette.other.bg],
        borderColor: [palette.fc.border, palette.other.border],
        borderWidth: 1,
        borderRadius: 6,
        barPercentage: 0.5,
      },
    ],
  };

  const options = makeBaseOptions({
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.raw.toFixed(0)} KB`,
        },
        backgroundColor: '#0f172a',
        borderColor: '#1e293b',
        borderWidth: 1,
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        titleFont: { family: "'JetBrains Mono', monospace", size: 12, weight: '600' },
        bodyFont: { family: "'JetBrains Mono', monospace", size: 11 },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#475569',
          font: { family: "'JetBrains Mono', monospace", size: 10 },
          callback: (v) => `${v} KB`,
        },
        grid: { color: 'rgba(30, 41, 59, 0.5)', drawBorder: false },
      },
      y: {
        ticks: {
          color: '#94a3b8',
          font: { family: "'JetBrains Mono', monospace", size: 11, weight: '500' },
        },
        grid: { display: false },
      },
    },
  });

  return <Bar data={data} options={options} />;
}

export function RecurrenceChart({ data }) {
  if (!data || data.length === 0) return null;

  const shortLabels = data.map(d => {
    return d.scenario
      .replace(' for ', '/')
      .replace(' (MWF)', '')
      .replace(' (15th)', '')
      .replace(' (1825 occurrences)', '');
  });

  const chartData = {
    labels: shortLabels,
    datasets: [
      {
        label: 'ForceCalendar',
        data: data.map(d => d.forceCalendar),
        backgroundColor: palette.fc.bg,
        borderColor: palette.fc.border,
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
      },
      {
        label: 'rrule',
        data: data.map(d => d.rrule),
        backgroundColor: palette.other.bg,
        borderColor: palette.other.border,
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.7,
      },
    ],
  };

  const options = makeBaseOptions({
    indexAxis: 'y',
    scales: {
      x: {
        ticks: {
          color: '#475569',
          font: { family: "'JetBrains Mono', monospace", size: 10 },
          callback: (v) => {
            if (v >= 1000000) return `${(v / 1000000).toFixed(0)}M`;
            if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
            return v;
          },
        },
        grid: { color: 'rgba(30, 41, 59, 0.5)', drawBorder: false },
        title: {
          display: true,
          text: 'ops/sec (higher is better)',
          color: '#475569',
          font: { family: "'JetBrains Mono', monospace", size: 10 },
        },
      },
      y: {
        ticks: {
          color: '#94a3b8',
          font: { family: "'JetBrains Mono', monospace", size: 10, weight: '500' },
        },
        grid: { display: false },
      },
    },
  });

  return <Bar data={chartData} options={options} />;
}

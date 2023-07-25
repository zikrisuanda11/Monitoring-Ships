import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const Chartjs = ({ charts, label, yLabel }) => {
  const labels = charts ? charts.map((chart) => chart.tanggal) : [];
  const data = charts ? charts.map((chart) => chart.value) : [];

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            fill: true,
            borderColor: 'rgb(79, 70, 229)',
            tension: 0.1,
            backgroundColor: 'rgb(175, 172, 230)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: yLabel,
            },
          },
        },
      },
    });

    // Hapus dan buat chart baru saat data berubah
    return () => {
      newChart.destroy();
    };
  }, [charts, label, yLabel]);

  return <canvas ref={chartRef} />;
};

export default Chartjs;

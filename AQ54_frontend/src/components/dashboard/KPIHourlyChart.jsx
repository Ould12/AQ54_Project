import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Liste des métriques disponibles
const metricsOptions = [
  { label: 'PM2.5 (µg/m³)', key: 'PM2.5' },
  { label: 'PM10 (µg/m³)', key: 'PM10' },
  { label: 'NO2 (µg/m³)', key: 'NO2' },
  { label: 'CO (mg/m³)', key: 'CO' },
  { label: 'O3 (µg/m³)', key: 'O3' },
  { label: 'RH (%)', key: 'RH' },
  { label: 'Temp. Ext. (°C)', key: 'Temp. Ext.' },
  { label: 'Temp. Int. (°C)', key: 'Temp. Int.' }
];

const KPIHourlyChart = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState('PM2.5'); // Par défaut : PM2.5

  // Formatte les données pour le graphique avec les capteurs SMART188 et SMART189
  const formattedData = Object.entries(data).map(([time, metrics]) => {
    const SMART188Value = metrics.SMART188?.[selectedMetric]?.value;
    const SMART189Value = metrics.SMART189?.[selectedMetric]?.value;

    return {
      time: new Date(time).getHours() + 'H', // Affiche l'heure uniquement
      SMART188: SMART188Value !== undefined ? SMART188Value : 0,
      SMART189: SMART189Value !== undefined ? SMART189Value : 0
    };
  });

  return (
    <div>
      {/* Sélection des métriques */}
      <div className="flex justify-center space-x-4 mb-4">
        {metricsOptions.map(option => (
          <button
            key={option.key}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${selectedMetric === option.key ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setSelectedMetric(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Graphique à barres */}
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Utilisation de palettes de couleurs harmonieuses */}
          <Bar dataKey="SMART188" fill="#7dbf74" name="SMART188" barSize={40} />  {/* Vert pastel */}
          <Bar dataKey="SMART189" fill="#f38181" name="SMART189" barSize={40} />  {/* Rose pastel */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KPIHourlyChart;

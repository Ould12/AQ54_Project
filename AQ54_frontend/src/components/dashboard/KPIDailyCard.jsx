import React from 'react';

const KPIDailyCard = ({ date, data }) => (
  <div className="flex flex-col gap-4 mb-6">
    <h2 className="text-lg font-semibold mb-4">Données journalières pour le {date}</h2>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(data).map(([sensor, metrics]) => (
        <div key={sensor} className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-xl font-semibold mb-2">{sensor}</h3>
          {Object.entries(metrics).map(([metric, values]) => (
            <div key={metric} className="flex justify-between text-gray-600">
              <span>{metric}</span>
              <span>{values.value} {values.unite}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default KPIDailyCard;

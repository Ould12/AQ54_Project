import React, { useEffect, useState } from 'react';
import KPIHourlyChart from '../components/dashboard/KPIHourlyChart';
import KPIDailyCard from '../components/dashboard/KPIDailyCard';
import axios from 'axios';

const Dashboard = () => {
  const [dailyData, setDailyData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);

  const apiUrl = 'http://localhost:5000/capteur-metrics/getCapteurMetricsAveragesByPeriod';

  const getDates = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    return {
      startDate: formatDate(yesterday),
      endDate: formatDate(today),
    };
  };

  useEffect(() => {
    const { startDate, endDate } = getDates();

    const fetchHourlyData = async () => {
      try {
        const response = await axios.post(apiUrl, {
          period: 'hour',
          startDate,
          endDate,
        });
        setHourlyData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données horaires', error);
      }
    };

    const fetchDailyData = async () => {
      try {
        const response = await axios.post(apiUrl, {
          period: 'day',
          startDate,
          endDate,
        });
        setDailyData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données journalières', error);
      }
    };

    fetchHourlyData();
    fetchDailyData();
  }, []);

  return (
    <div className="p-8 space-y-6">  {/* Ajout de l'espacement fluide */}
      {hourlyData && (
        <>
          <h2 className="text-lg font-semibold mb-4">Données par heure</h2>
          <KPIHourlyChart data={hourlyData} />
        </>
      )}

      {dailyData && Object.entries(dailyData).map(([date, sensors]) => (
        <KPIDailyCard key={date} date={date} data={sensors} />
      ))}
    </div>
  );
};

export default Dashboard;

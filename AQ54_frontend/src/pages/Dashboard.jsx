import React, { useEffect, useState } from 'react';
import KPIHourlyChart from '../components/dashboard/KPIHourlyChart';
import KPIDailyCard from '../components/dashboard/KPIDailyCard';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  const [dailyData, setDailyData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(true); // Loader state

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
      } finally {
        setLoading(false);
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

  // Messages popup pour les données manquantes
  useEffect(() => {
    if (!loading && (!hourlyData || Object.keys(hourlyData).length === 0)) {
      toast.info("Aucune donnée horaire disponible pour le moment. Merci de patienter jusqu'à la prochaine mise à jour.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (!loading && (!dailyData || Object.keys(dailyData).length === 0)) {
      toast.info("En attente de données journalières. Les mises à jour sont effectuées chaque jour.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [loading, hourlyData, dailyData]);

  return (
    <div className="p-8 space-y-6">
      <ToastContainer />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <>
          {hourlyData && Object.keys(hourlyData).length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-4">Données par heure</h2>
              <KPIHourlyChart data={hourlyData} />
            </>
          )}
          {dailyData && Object.keys(dailyData).length > 0 && (
            Object.entries(dailyData).map(([date, sensors]) => (
              <KPIDailyCard key={date} date={date} data={sensors} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;

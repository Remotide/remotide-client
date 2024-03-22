import React, { useState, useEffect } from "react";
import { Loading, Label, Input } from "@/components";
import { useFetchStats } from "@/actions";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Stats = () => {
  const { data: stats, isFetching } = useFetchStats();
  const [labels, setLabels] = useState([]);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [talents, setTalents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalTalents, setTotalTalents] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);

  useEffect(() => {
    if (stats) {
      const filteredStats = stats.filter(
        (item) =>
          (!startDate || new Date(item.date) >= new Date(startDate)) &&
          (!endDate || new Date(item.date) <= new Date(endDate))
      );

      setLabels(filteredStats.map((item) => item.date));
      setUsers(filteredStats.map((item) => item.usersRegistered));
      setJobs(filteredStats.map((item) => item.jobsCreated));
      setTalents(filteredStats.map((item) => item.talentstatus));
      setCompanies(filteredStats.map((item) => item.companystatus));

      setTotalUsers(
        filteredStats.reduce((total, item) => total + item.usersRegistered, 0)
      );
      setTotalJobs(
        filteredStats.reduce((total, item) => total + item.jobsCreated, 0)
      );
      setTotalTalents(
        filteredStats.reduce((total, item) => total + item.talentstatus, 0)
      );
      setTotalCompanies(
        filteredStats.reduce((total, item) => total + item.companystatus, 0)
      );
    }
  }, [stats, isFetching, startDate, endDate]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Users Registered",
        data: users,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "Jobs Created",
        data: jobs,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
      },
      {
        label: "Talents Registered",
        data: talents,
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
      },
      {
        label: "Companies Registered",
        data: companies,
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.2)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-50 w-full p-10">
      <p className="font-bold text-6xl text-black">Dashboard</p>
      <p className="font-light text-3xl text-gray-500">
        Summary of remotide's performance
      </p>
      <div className="flex justify-between mb-4">
        <div>
          <Label htmlFor="startDate">Start Date:</Label>
          <Input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date:</Label>
          <Input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-gray-700 font-bold">Total Users</p>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-gray-700 font-bold">Total Jobs</p>
          <p className="text-3xl font-bold">{totalJobs}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-gray-700 font-bold">Total Talents</p>
          <p className="text-3xl font-bold">{totalTalents}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-gray-700 font-bold">Total Companies</p>
          <p className="text-3xl font-bold">{totalCompanies}</p>
        </div>
      </div>
      {!isFetching ? (
        <div className="m-4 bg-white rounded shadow w-full">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Stats;

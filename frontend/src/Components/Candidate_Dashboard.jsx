import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Text,
  Select,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const CandidateDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [score, setScore] = useState({ completed: 0, total: 0 });
  const [candidateId, setCandidateId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user._id) {
      setCandidateId(user._id);
    }
  }, []);

  useEffect(() => {
    if (candidateId) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/tasks/candidate/${candidateId}`
          );
          setTasks(response.data);
          calculateScore(response.data);
        } catch (error) {
          console.error('Error fetching tasks:', error.message);
        }
      };
      fetchTasks();
    }
  }, [candidateId]);

  const calculateScore = (tasks) => {
    const completedTasks = tasks.filter((task) => task.status === 'done');
    const totalCompletedScore = completedTasks.reduce((acc, task) => acc + task.points, 0);
    const totalScore = tasks.reduce((acc, task) => acc + task.points, 0); // Total points for all tasks
    setScore({ completed: totalCompletedScore, total: totalScore });
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
        status: newStatus,
      });
      const updatedTask = response.data;

      const updatedTasks = tasks.map((task) =>
        task._id === updatedTask._id ? { ...task, status: updatedTask.status } : task
      );
      setTasks(updatedTasks);
      calculateScore(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error.message);
    }
  };

  const barChartData = [
    { name: 'Pending', value: tasks.filter((task) => task.status === 'pending').length },
    { name: 'Completed', value: tasks.filter((task) => task.status === 'done').length },
  ];

  const pieChartData = [
    { name: 'Pending', value: tasks.filter((task) => task.status === 'pending').length },
    { name: 'Completed', value: tasks.filter((task) => task.status === 'done').length },
  ];

  const COLORS = ['#FF8042', '#00C49F'];

  return (
    <Grid templateColumns="3fr 2fr" gap={6} p={8} >
      {/* Left Section with Kanban-like columns */}
      <GridItem>
        {/* Display Scores */}
        <Box
          borderWidth={2}
          borderColor="blue.300"
          borderRadius="md"
          p={4}
          bg="blue.50"
          mb={6}
          textAlign="center"
        >
          <Heading fontSize="lg" color="black.500" mb={4}>
            Candidate Score Overview
          </Heading>
          <Text fontSize="xl" fontWeight="bold" color="red.700">
            Your Goal: {score.total}
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="green.700" mt={2}>
            Completed: {score.completed}
          </Text>
        </Box>

        <Grid templateColumns="1fr 1fr" gap={6}>
          {/* Pending Tasks Column */}
          <GridItem>
            <Box
              borderWidth={2}
              borderColor="orange.300"
              borderRadius="md"
              p={4}
              bg="orange.50"
              shadow="md"
              height="100%"
            >
              <Heading fontSize="lg" color="red.500" mb={4} textAlign="center">
                Pending Tasks
              </Heading>
              <Box
                maxHeight="350px"
                overflowY="auto"
                display="flex"
                flexDirection="column"
              >
                {tasks
                  .filter((task) => task.status === 'pending')
                  .slice(0, 3) // Show only the first 3 tasks
                  .map((task) => (
                    <Box
                      key={task._id}
                      p={4}
                      borderWidth={1}
                      borderColor="orange.200"
                      bg="orange.100"
                      borderRadius="md"
                      mb={4}
                    >
                      <Text fontWeight="bold" color="orange.600">
                        {task.title}
                      </Text>
                      <Text mt={2} color="orange.700">
                        {task.description}
                      </Text>
                      <Text mt={2} color="orange.700">
                        Points: {task.points}
                      </Text>
                      <Select
                        mt={4}
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                        bg="white"
                      >
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                      </Select>
                    </Box>
                  ))}
              </Box>
            </Box>
          </GridItem>

          {/* Completed Tasks Column */}
          <GridItem>
            <Box
              borderWidth={2}
              borderColor="green.300"
              borderRadius="md"
              p={4}
              bg="green.50"
              shadow="md"
              height="100%"
            >
              <Heading fontSize="lg" color="green.500" mb={4} textAlign="center">
                Completed Tasks
              </Heading>
              <Box
                maxHeight="350px"
                overflowY="auto"
                display="flex"
                flexDirection="column"
              >
                {tasks
                  .filter((task) => task.status === 'done')
                  .slice(0, 3) // Show only the first 3 tasks
                  .map((task) => (
                    <Box
                      key={task._id}
                      p={4}
                      borderWidth={1}
                      borderColor="green.200"
                      bg="green.100"
                      borderRadius="md"
                      mb={4}
                    >
                      <Text fontWeight="bold" color="green.600">
                        {task.title}
                      </Text>
                      <Text mt={2} color="green.700">
                        {task.description}
                      </Text>
                      <Text mt={2} color="green.700">
                        Points: {task.points}
                      </Text>
                    </Box>
                  ))}
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </GridItem>

      {/* Right Section with Charts */}
      <GridItem>
        {/* Bar Chart */}
        <Box
          borderWidth={2}
          width="35em"
          borderColor="purple.300"
          borderRadius="md"
          p={4}
          bg="purple.50"
          mb={6}
          maxHeight="40vh"
        >
          <Heading fontSize="lg" color="black.500" mb={4}>
            Task Overview
          </Heading>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 2" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#6a5acd" />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Pie Chart */}
        <Box
          borderWidth={2}
          borderColor="teal.300"
          borderRadius="md"
          p={4}
          bg="teal.50"
        >
          <Heading fontSize="lg" color="black.500" mb={2}>
            Task Distribution
          </Heading>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default CandidateDashboard;

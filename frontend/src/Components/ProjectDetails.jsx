import React, { useEffect, useState } from 'react'; 
import { Box, Button, Heading, Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Textarea, Select, useDisclosure, Grid, Card, CardBody, Badge } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending', points: 10, assigned_to: '' });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const projectResponse = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
        const tasksResponse = await axios.get(`http://localhost:5000/api/tasks/projects/${projectId}`);
        const candidatesResponse = await axios.get('http://localhost:5000/api/users/candidates');
  
        setCandidates(candidatesResponse.data);
  
        // Sorting tasks by updatedAt (latest first)
        const sortedTasks = tasksResponse.data.data || [];
        sortedTasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // Sort by latest updated task
        setTasks(sortedTasks);
  
        setProject(projectResponse.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
        toast({
          title: 'Failed to fetch project details.',
          description: error.response?.data?.message || 'An unexpected error occurred.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjectDetails();
  }, [projectId]);
  
  const handleCreateTask = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/tasks`, {
        ...newTask,
        project_id: projectId,
        status: 'pending',
      });

      const createdTask = response.data.task;
      if (createdTask && createdTask.title) {
        setTasks((prevTasks) => [...prevTasks, createdTask]);
        toast({
          title: 'Task Created',
          description: 'New task has been created successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setNewTask({ title: '', description: '', status: 'pending', points: 10, assigned_to: '' });
      } else {
        toast({
          title: 'Task Creation Failed',
          description: 'Task data is invalid.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Task Creation Failed',
        description: error.response?.data?.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Text>Loading project details...</Text>;
  }

  if (!project) {
    return <Text>Project not found. Please check the project ID.</Text>;
  }

  return (
    <Box p={8} maxW="container.md" mx="auto" fontFamily="Poppins,sans-serif">
      <Heading mb={4} textAlign="center">{project.title}</Heading>
      <Text mb={6} textAlign="center">{project.description}</Text>

      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button colorScheme="teal" onClick={onOpen}>
          Create New Task
        </Button>
      </Box>

      <Heading size="md" mb={4}>Tasks</Heading>
      {tasks.length === 0 ? (
        <Text>No tasks available for this project.</Text>
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
          {tasks.map((task) => (
            task && task.title ? (
              <Card key={task._id} borderWidth="1px" borderRadius="lg" p={4} bg="white" boxShadow="sm">
                <CardBody>
                  <Text fontSize="lg" fontWeight="bold">{task.title}</Text>
                  <Text mb={2}>{task.description}</Text>
                  <Badge colorScheme={task.status === 'done' ? 'green' : 'yellow'}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                  <Text mt={2}>Assigned to: {task.assigned_to ? candidates.find(candidate => candidate._id === task.assigned_to)?.username : 'Not Assigned'}</Text>
                </CardBody>
              </Card>
            ) : (
              <Text key={task._id}>Invalid Task Data</Text>
            )
          ))}
        </Grid>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              mb={3}
            />
            <Textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              mb={3}
            />
            <Select
              value={newTask.assigned_to}
              onChange={(e) => setNewTask({ ...newTask, assigned_to: e.target.value })}
              mb={3}
            >
              <option value="">Select Candidate</option>
              {candidates.map((candidate) => (
                <option key={candidate._id} value={candidate._id}>
                  {candidate.username}
                </option>
              ))}
            </Select>
            <Input
              type="number"
              placeholder="Task Points"
              value={newTask.points}
              onChange={(e) => setNewTask({ ...newTask, points: e.target.value })}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button colorScheme="teal" onClick={handleCreateTask}>Create Task</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProjectDetails;

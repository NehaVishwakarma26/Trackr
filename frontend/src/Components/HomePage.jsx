import React from 'react';
import { Box, Flex, Button, Text,Image, Heading, VStack, Container, SimpleGrid, Icon, HStack, Progress } from '@chakra-ui/react';
import { FaCheckCircle, FaTasks, FaClipboardList, FaUserCircle } from 'react-icons/fa'; // Updated icons
import img from '../assets/images/image.png'
import { useNavigate } from 'react-router-dom';
// Hero Section with a call to action
const HeroSection = () => {
  return (
    <Box bg="blue.600" color="white" py={20}>
      <Container maxW="container.xl">
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <VStack align="start" spacing={6} maxW="lg">
            <Heading as="h1" size="2xl" fontWeight="bold" letterSpacing="wide">
              Project Scheduler & Tracker
            </Heading>
            <Text fontSize="xl" maxW="lg">
              Keep track of projects, assign tasks, update statuses, and monitor progress in real-time. A streamlined way to manage your team.
            </Text>
            <Button bg="teal.500" color="white" size="lg" mt={6} _hover={{ bg: 'teal.400' }} as="a" href="/login">
              Get Started Now
            </Button>
          </VStack>
          <Box maxW="lg">
            <Image src={img}  alt="App screenshot" width="60em" height="20em" borderRadius="lg"/>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

// Admin Section with modern UI
const AdminSection = () => {
    const navigate= useNavigate();
  return (
    <Box py={24} bg="gray.100">
      <Container maxW="container.xl">
        <Heading as="h3" size="xl" textAlign="center" mb={12}>
          Admin Dashboard
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <VStack
            bg="white"
            boxShadow="lg"
            borderRadius="lg"
            padding={8}
            spacing={6}
            align="start"
            _hover={{ transform: 'scale(1.05)', boxShadow: '2xl', transition: 'all 0.2s' }}
          >
            <Icon as={FaClipboardList} w={10} h={10} color="teal.600" />
            <Heading size="lg">Create & Manage Projects</Heading>
            <Text fontSize="lg" color="gray.600">
              Create new projects, add tasks, and assign them to candidates. Manage project progress and track overall completion.
            </Text>
            <Button colorScheme="teal" size="md" onClick={()=>{navigate('/login')}}>Create Project</Button>
          </VStack>
          <VStack
            bg="white"
            boxShadow="lg"
            borderRadius="lg"
            padding={8}
            spacing={6}
            align="start"
            _hover={{ transform: 'scale(1.05)', boxShadow: '2xl', transition: 'all 0.2s' }}
          >
            <Icon as={FaTasks} w={10} h={10} color="green.600" />
            <Heading size="lg">Assign Tasks to Candidates</Heading>
            <Text fontSize="lg" color="gray.600">
              Easily assign tasks to candidates, set deadlines, and monitor their progress in real-time.
            </Text>
            <Button colorScheme="green" size="md"  onClick={()=>{navigate('/login')}}>Assign Tasks</Button>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// Candidate Section with modern UI
const CandidateSection = () => {
    const navigate= useNavigate();

  return (
    <Box py={24} bg="gray.50">
      <Container maxW="container.xl">
        <Heading as="h3" size="xl" textAlign="center" mb={12}>
          Candidate Dashboard
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <VStack
            bg="white"
            boxShadow="lg"
            borderRadius="lg"
            padding={8}
            spacing={6}
            align="start"
            _hover={{ transform: 'scale(1.05)', boxShadow: '2xl', transition: 'all 0.2s' }}
          >
            <Icon as={FaUserCircle} w={10} h={10} color="blue.600" />
            <Heading size="lg">View Assigned Projects</Heading>
            <Text fontSize="lg" color="gray.600">
              View and track all the projects assigned to you. Stay updated on your tasks and progress.
            </Text>
            <Button colorScheme="blue" size="md" onClick={()=>{navigate('/login')}}>View Projects</Button>
          </VStack>
          <VStack
            bg="white"
            boxShadow="lg"
            borderRadius="lg"
            padding={8}
            spacing={6}
            align="start"
            _hover={{ transform: 'scale(1.05)', boxShadow: '2xl', transition: 'all 0.2s' }}
          >
            <Icon as={FaCheckCircle} w={10} h={10} color="orange.600" />
            <Heading size="lg">Update Task Status</Heading>
            <Text fontSize="lg" color="gray.600">
              Update the status of your tasks as you complete them, and monitor your progress in real-time.
            </Text>
            <Button colorScheme="orange" size="md" onClick={()=>{navigate('/login')}}>Update Status</Button>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

// Main HomePage component that combines the Hero, Admin, and Candidate sections
const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <AdminSection />
      <CandidateSection />
    </Box>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Grid, 
  Heading, 
  Spinner, 
  Text, 
  useToast, 
  VStack, 
  HStack, 
  Divider, 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // For deletion
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const admin = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:5000/api/admin/projects?adminId=${admin._id}`);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Failed to fetch projects.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const deleteProject = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${selectedProject._id}`);
      toast({
        title: 'Project deleted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setProjects((prev) => prev.filter((p) => p._id !== selectedProject._id)); // Remove deleted project
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Failed to delete the project.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    }
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh" fontFamily="Poppins,sans-serif">
      <Heading mb={6} fontSize="2xl" color="teal.600" textAlign="center">
        Admin Dashboard
      </Heading>
      {loading ? (
        <VStack spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text fontSize="lg" color="gray.600">
            Loading projects...
          </Text>
        </VStack>
      ) : (
        <Grid 
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))" 
          gap={6} 
          px={[2, 4, 6]} // Responsive padding
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <Box
                key={project._id}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                bg="white"
                boxShadow="md"
                cursor="pointer"
                transition="transform 0.2s ease, box-shadow 0.2s ease"
                onClick={() => handleProjectClick(project._id)}
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: 'lg',
                  bg: 'teal.50',
                }}
              >
                <HStack justify="space-between" mb={4}>
                  <Text fontSize="xl" fontWeight="bold" color="teal.600">
                    {project.title}
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="solid"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(project);
                    }}
                  >
                    Delete
                  </Button>
                </HStack>
                <Divider />
                <Text mt={4} fontSize="md" color="gray.700" noOfLines={3}>
                  {project.description || 'No description available.'}
                </Text>
              </Box>
            ))
          ) : (
            <Text fontSize="lg" color="gray.600" textAlign="center">
              No projects available. Please create one.
            </Text>
          )}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={undefined}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete the project "
              {selectedProject?.title}"? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                colorScheme="red" 
                onClick={deleteProject} 
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AdminDashboard;

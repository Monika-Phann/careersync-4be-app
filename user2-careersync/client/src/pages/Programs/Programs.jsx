import { useMemo, useState, useEffect } from 'react'
import { Container, Typography, CircularProgress, Box } from '@mui/material'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai'; // 1. Import useAtom
import { authAtom } from '../../store/authAtom'; // 2. Import authAtom
import axiosInstance from '../../api/axiosInstance'


import SectionHeading from '../../components/UI/SectionHeading/SectionHeading'
import Badge from '../../components/UI/Badge/Badge'
import Button from '../../components/UI/Button/Button'
import Card from '../../components/UI/Card/Card'

import {
  Section,
  FilterRow,
  FilterChip,
  ProgramGrid,
  ProgramCardContent,
  ProgramImage,
} from './Programs.styles'

const API_URL = 'https://api-4be.ptascloud.online/api';

function Programs({ defaultCategory = 'All Industries' }) {
  const [auth] = useAtom(authAtom); // 3. Initialize auth state
  const [activeCategory, setActiveCategory] = useState(defaultCategory)
  const [programs, setPrograms] = useState([])
  const [industries, setIndustries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  // Fetch industries from admin section
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axiosInstance.get('/api/industries')
        const industryNames = response.data.map(industry => industry.industry_name)
        setIndustries(industryNames)
      } catch (err) {
        console.error('Error fetching industries:', err)
        setIndustries([])
      }
    }

    fetchIndustries()
  }, [])

  useEffect(() => {
    const getPrograms = async () => {
      try {
        setLoading(true)
        // Fetch positions from backend API
        const response = await axiosInstance.get('/api/positions')
        const positionsData = response.data || []
        
        // Transform positions into program format
        const programsData = positionsData.map((position) => ({
          id: position.id,
          title: position.position_name,
          category: position.industry_name || 'General',
          description: position.description || 'Explore this career path with our expert mentors.',
          image: position.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
          positionId: position.id,
        }))
        
        setPrograms(programsData)
      } catch (err) {
        console.error('Error fetching programs:', err)
        setError('Failed to fetch programs')
        setPrograms([])
      } finally {
        setLoading(false)
      }
    }

    getPrograms()
  }, [])

  // Create categories array with "All Industries" first, then fetched industries
  const categories = useMemo(() => {
    return ['All Industries', ...industries]
  }, [industries])

  const filteredPrograms = useMemo(() => {
    // If no industries are created, don't show any programs
    if (industries.length === 0) return []
    
    // Filter programs to only show those whose category matches an existing industry
    const availableCategories = new Set(industries)
    const validPrograms = programs.filter((item) => availableCategories.has(item.category))
    
    if (activeCategory === 'All Industries') return validPrograms
    return validPrograms.filter((item) => item.category === activeCategory)
  }, [programs, activeCategory, industries])

  if (loading) {
    return (
      <Section sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Section>
    )
  }
  if (error) {
    return (
      <Section><Container><Typography color="error">{error}</Typography></Container></Section>
    )
  }

  return (
    <Section
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          title="Shadowing Programs"
          subtitle="Experience real-world careers firsthand. Shadow professionals and find your perfect career path through immersive programs"
        />

        <FilterRow>
          {categories.length > 1 ? (
            categories.map((category) => (
              <FilterChip
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </FilterChip>
            ))
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center', py: 3 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                No industry created yet
              </Typography>
            </Box>
          )}
        </FilterRow>

        <ProgramGrid>
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((item) => (
              <Card key={item.id}>
                <ProgramCardContent>
                  <Badge>{item.category}</Badge>
                  <ProgramImage src={item.image} alt={item.title} />
                  <Typography variant="h4" sx={{ mt: 2, fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', my: 2 }}>
                    {item.description}
                  </Typography>
                  <Button 
                    variant="secondary" 
                    fullWidth
                    onClick={() => {
                      // Navigate to mentors page filtered by category (industry)
                      if (auth.isAuthenticated) {
                        navigate(`/mentors?category=${encodeURIComponent(item.category)}`);
                      } else {
                        navigate('/signin');
                      }
                    }}
                  >
                    View Available Mentors
                  </Button>
                </ProgramCardContent>
              </Card>
            ))
          ) : (
            <Typography sx={{ gridColumn: '1/-1', textAlign: 'center', py: 5, color: 'text.secondary' }}>
              {industries.length === 0 ? 'No industry created yet' : 'No programs found in this category.'}
            </Typography>
          )}
        </ProgramGrid>
      </Container>
    </Section>
  )
}

export default Programs
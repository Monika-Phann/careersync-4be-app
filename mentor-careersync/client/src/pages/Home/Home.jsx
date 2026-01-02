import React, { useState, useEffect } from 'react'
import { Grid, Box, CircularProgress, Typography, Alert } from '@mui/material'
import {
  ComposedChart,
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import StatCard from '../../components/UI/StatCard/StatCard'
import ChartCard from '../../components/UI/ChartCard/ChartCard'
import ScheduleCard from '../../components/UI/ScheduleCard/ScheduleCard'
import { getDashboardSummary, getTrends, getWeeklyPerformance } from '../../api/dashboardApi'
import { getMyMentorProfile } from '../../api/mentorApi'
import { getUserData } from '../../utils/auth'
import { HomeStyles } from './Home.styles'

function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [summary, setSummary] = useState(null)
  const [trends, setTrends] = useState([])
  const [weeklyPerformance, setWeeklyPerformance] = useState([])
  const [todaysSchedule, setTodaysSchedule] = useState([])
  const [mentorId, setMentorId] = useState(null)

  useEffect(() => {
    // Get mentor ID from user data or fetch from API
    const fetchMentorId = async () => {
      try {
        const userData = getUserData()
        let mentor = null
        
        // Try to get mentor ID from localStorage first
        if (userData?.Mentor?.id) {
          setMentorId(userData.Mentor.id)
          return
        } else if (userData?.mentor?.id) {
          setMentorId(userData.mentor.id)
          return
        }

        // If not in localStorage, fetch from API
        const response = await getMyMentorProfile()
        mentor = response.mentor || response
        
        if (mentor?.id) {
          setMentorId(mentor.id)
        } else {
          setError('Mentor ID not found. Please log in again.')
          setLoading(false)
        }
      } catch (err) {
        setError('Failed to load mentor profile. Please try logging in again.')
        setLoading(false)
      }
    }

    fetchMentorId()
  }, [])

  useEffect(() => {
    if (!mentorId) return

    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch summary, trends, and weekly performance in parallel
        const [summaryData, trendsData, weeklyData] = await Promise.all([
          getDashboardSummary(mentorId),
          getTrends(mentorId),
          getWeeklyPerformance(mentorId).catch(() => ({ weekly: [] })),
        ])

        setSummary(summaryData)
        setTrends(trendsData || [])
        
        // Transform weekly performance data to match frontend expectations
        // Backend returns: { weekly: [{ day, completed, cancelled }] }
        // Frontend expects: [{ day, completed, incomplete, canceled }]
        const transformedWeekly = (weeklyData?.weekly || []).map(item => ({
          day: item.day,
          completed: item.completed || 0,
          incomplete: item.incomplete || 0, // Backend doesn't provide this, set to 0
          canceled: item.cancelled || item.canceled || 0,
        }))
        setWeeklyPerformance(transformedWeekly)
        
        // Initialize today's schedule as empty array
        // TODO: Implement API endpoint to fetch today's schedule
        setTodaysSchedule([])
      } catch (err) {
        setError(
          err.response?.data?.error ||
            'Failed to load dashboard data. Please try again later.'
        )
        // Fallback to empty data
        setSummary({
          bookings: { total: 0, growth: 0 },
          revenue: { total: 0, growth: 0 },
          certifications: { total: 0, growth: 0 },
        })
        setTrends([])
        setWeeklyPerformance([])
        setTodaysSchedule([])
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [mentorId])

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Loading dashboard data...</Typography>
      </Box>
    )
  }

  if (error && !summary) {
    return (
      <Box sx={HomeStyles.container}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Box>
    )
  }

  return (
    <Box sx={HomeStyles.container}>
      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Bookings"
            value={summary?.bookings?.total || 0}
            change={summary?.bookings?.growth || 0}
            icon="calendar"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Revenue"
            value={summary?.revenue?.total || 0}
            change={summary?.revenue?.growth || 0}
            icon="dollar"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Certifications"
            value={summary?.certifications?.total || 0}
            change={summary?.certifications?.growth || 0}
            icon="certificate"
          />
        </Grid>

        {/* Revenue & Bookings Trend Chart */}
        <Grid item xs={12}>
          <ChartCard title="Revenue & Bookings Trend">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={trends}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#42a5f5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#42a5f5" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#666666" />
                <YAxis
                  yAxisId="left"
                  label={{ value: 'Bookings', angle: -90, position: 'insideLeft' }}
                  stroke="#666666"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: 'Revenue ($)', angle: 90, position: 'insideRight' }}
                  stroke="#666666"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="bookings"
                  stroke="#42a5f5"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBookings)"
                  name="Bookings"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#030C2B"
                  strokeWidth={2}
                  name="Revenue ($)"
                  dot={{ fill: '#030C2B', r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Weekly Performance Chart */}
        <Grid item xs={12} md={6}>
          <ChartCard title="Weekly Performance" height={300}>
            {(() => {
              // Check if weekly performance data is empty or all values are 0
              const hasData = weeklyPerformance && weeklyPerformance.length > 0
              const hasNonZeroData = hasData && weeklyPerformance.some(
                item => (item.completed || 0) > 0 || (item.incomplete || 0) > 0 || (item.canceled || 0) > 0
              )

              if (!hasData || !hasNonZeroData) {
                return (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      color: '#666',
                    }}
                  >
                    <Typography variant="body1">
                      No performance data available this week
                    </Typography>
                  </Box>
                )
              }

              return (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="day" stroke="#666666" />
                    <YAxis stroke="#666666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="canceled" stackId="a" fill="#9e9e9e" name="Canceled" />
                    <Bar dataKey="completed" stackId="a" fill="#42a5f5" name="Completed" />
                    <Bar dataKey="incomplete" stackId="a" fill="#424242" name="Incomplete" />
                  </BarChart>
                </ResponsiveContainer>
              )
            })()}
          </ChartCard>
        </Grid>

        {/* Today's Schedule */}
        <Grid item xs={12} md={6}>
          <ScheduleCard title="Today's Schedule" items={todaysSchedule} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home


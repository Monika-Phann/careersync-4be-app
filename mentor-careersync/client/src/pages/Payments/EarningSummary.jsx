import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  FilterList as FilterListIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { EarningSummaryStyles } from './EarningSummary.styles'
import { getMyEarnings } from '../../services/bookingApi'

function EarningSummary() {
  const [earningsData, setEarningsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getMyEarnings()
        setEarningsData(data)
      } catch (err) {
        console.error('Error fetching earnings:', err)
        setError(err.response?.data?.message || err.message || 'Failed to load earnings')
      } finally {
        setLoading(false)
      }
    }

    fetchEarnings()
  }, [])

  // Filter recent payments based on search query
  const filteredPayments = earningsData?.recentPayments?.filter(payment =>
    payment.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (!earningsData) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">No earnings data available</Alert>
      </Box>
    )
  }
  return (
    <Box sx={EarningSummaryStyles.container}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={4}>
          <Card sx={EarningSummaryStyles.summaryCard}>
            <CardContent>
              <Box sx={EarningSummaryStyles.summaryTopRow}>
                <Typography variant="body2" sx={EarningSummaryStyles.cardLabel}>
                  Total&apos;s Earning
                </Typography>
                <Box sx={EarningSummaryStyles.summaryIconBox}>
                  <MoneyIcon sx={EarningSummaryStyles.summaryIcon} />
                </Box>
              </Box>
              <Typography variant="h4" sx={EarningSummaryStyles.cardValue}>
                ${earningsData.mentorEarnings || '0.00'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={EarningSummaryStyles.summaryCard}>
            <CardContent>
              <Box sx={EarningSummaryStyles.summaryTopRow}>
                <Typography variant="body2" sx={EarningSummaryStyles.cardLabel}>
                  Last Month&apos;s Earning
                </Typography>
                <Box sx={EarningSummaryStyles.summaryIconBox}>
                  <MoneyIcon sx={EarningSummaryStyles.summaryIcon} />
                </Box>
              </Box>
              <Typography variant="h4" sx={EarningSummaryStyles.cardValue}>
                ${earningsData.lastMonthEarnings || '0.00'}
              </Typography>
              <Typography variant="body2" sx={EarningSummaryStyles.cardSubtext}>
                {new Date().toLocaleDateString('en-US', { month: 'long' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={EarningSummaryStyles.summaryCard}>
            <CardContent>
              <Box sx={EarningSummaryStyles.summaryTopRow}>
                <Typography variant="body2" sx={EarningSummaryStyles.cardLabel}>
                  Today&apos;s Earning
                </Typography>
                <Box sx={EarningSummaryStyles.summaryIconBox}>
                  <MoneyIcon sx={EarningSummaryStyles.summaryIcon} />
                </Box>
              </Box>
              <Typography variant="h4" sx={EarningSummaryStyles.cardValue}>
                ${earningsData.todayEarnings || '0.00'}
              </Typography>
              <Typography variant="body2" sx={EarningSummaryStyles.cardSubtext}>
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Income Statistics Chart */}
        <Grid item xs={12}>
          <Card sx={EarningSummaryStyles.chartCard}>
            <CardContent>
              <Typography variant="h6" sx={EarningSummaryStyles.chartTitle}>
                Income Statistics
              </Typography>
              <Typography
                variant="body2"
                sx={EarningSummaryStyles.chartSubtitle}
              >
                Your earnings over the last 30 days
              </Typography>
              <Box sx={EarningSummaryStyles.chartContainer}>
                {earningsData.chartData && earningsData.chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={earningsData.chartData}>
                      <defs>
                        <linearGradient id="earningsFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1E88E5" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#1E88E5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="date" stroke="#666666" />
                      <YAxis
                        stroke="#666666"
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                        }}
                        formatter={(value) => `$${value.toFixed(2)}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="earnings"
                        stroke="#1E88E5"
                        strokeWidth={2}
                        fill="url(#earningsFill)"
                        dot={false}
                        activeDot={{ r: 4, fill: '#1E88E5' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                    <Typography variant="body2" color="text.secondary">
                      No earnings data available for the last 30 days
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Filters Row */}
        <Grid item xs={12}>
          <Card sx={EarningSummaryStyles.filtersCard}>
            <CardContent sx={EarningSummaryStyles.filtersContent}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                sx={EarningSummaryStyles.filtersButton}
              >
                Filters
              </Button>
              <TextField
                placeholder="Search by student name..."
                size="small"
                sx={EarningSummaryStyles.filtersSearchField}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={EarningSummaryStyles.searchIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                startIcon={<CalendarIcon />}
                sx={EarningSummaryStyles.filtersDateButton}
              >
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Payments */}
        <Grid item xs={12}>
          <Card sx={EarningSummaryStyles.paymentsCard}>
            <CardContent>
              <Box sx={EarningSummaryStyles.paymentsHeader}>
                <Box>
                  <Typography variant="h6" sx={EarningSummaryStyles.sectionTitle}>
                    Recent Payments
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={EarningSummaryStyles.sectionSubtitle}
                  >
                    Latest user payments
                  </Typography>
                </Box>
              </Box>

              <Box sx={EarningSummaryStyles.paymentsList}>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <Box key={payment.id} sx={EarningSummaryStyles.paymentItem}>
                      <Box sx={EarningSummaryStyles.paymentLeft}>
                        <Avatar sx={EarningSummaryStyles.avatar}>
                          {payment.student.initials}
                        </Avatar>
                        <Box>
                          <Typography sx={EarningSummaryStyles.studentName}>
                            {payment.student.name}
                          </Typography>
                          <Typography sx={EarningSummaryStyles.bookingId}>
                            {payment.bookingId}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={EarningSummaryStyles.paymentRight}>
                        <Chip label={payment.date} size="small" sx={EarningSummaryStyles.dateChip} />
                        <Typography sx={EarningSummaryStyles.amount}>
                          ${payment.amount % 1 === 0 ? payment.amount : payment.amount.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      {searchQuery ? 'No payments found matching your search' : 'No recent payments available'}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EarningSummary
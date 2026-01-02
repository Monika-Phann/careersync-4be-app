import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {
  adminMentorsListAtom,
  adminMentorsFilteredAtom,
  adminMentorsRefreshAtom,
  pendingMentorsCountAtom,
  approvedMentorsCountAtom,
  rejectedMentorsCountAtom,
} from '../../atoms/mentorAtoms'
import { useAuth } from '../../context/AuthContext'

const MentorList = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedTab, setSelectedTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [refreshTrigger, setRefreshTrigger] = useAtom(adminMentorsRefreshAtom)
  
  // Check if user is admin
  useEffect(() => {
    if (user?.role_name !== 'admin') {
      navigate('/')
    }
  }, [user, navigate])

  const mentors = useAtomValue(adminMentorsListAtom)
  const filtered = useAtomValue(adminMentorsFilteredAtom)
  const pendingCount = useAtomValue(pendingMentorsCountAtom)
  const approvedCount = useAtomValue(approvedMentorsCountAtom)
  const rejectedCount = useAtomValue(rejectedMentorsCountAtom)

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success'
      case 'pending':
        return 'warning'
      case 'rejected':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved'
      case 'pending':
        return 'Pending'
      case 'rejected':
        return 'Rejected'
      default:
        return status
    }
  }

  const getFilteredMentors = () => {
    let mentorsToShow = []
    switch (selectedTab) {
      case 0:
        mentorsToShow = filtered.all
        break
      case 1:
        mentorsToShow = filtered.pending
        break
      case 2:
        mentorsToShow = filtered.approved
        break
      case 3:
        mentorsToShow = filtered.rejected
        break
      default:
        mentorsToShow = filtered.all
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return mentorsToShow.filter(mentor => {
        const fullName = `${mentor.first_name || ''} ${mentor.last_name || ''}`.toLowerCase()
        const email = (mentor.User?.email || '').toLowerCase()
        return fullName.includes(query) || email.includes(query)
      })
    }

    return mentorsToShow
  }

  const displayMentors = getFilteredMentors()

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Mentor Management
        </Typography>
        <Button variant="outlined" onClick={handleRefresh}>
          Refresh
        </Button>
      </Box>

      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label={`All (${filtered.all.length})`} />
        <Tab label={`Pending (${pendingCount})`} />
        <Tab label={`Approved (${approvedCount})`} />
        <Tab label={`Rejected (${rejectedCount})`} />
      </Tabs>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {Array.isArray(mentors) && mentors.length === 0 ? (
        <Alert severity="info">No mentors found. Loading...</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayMentors.map((mentor) => (
                <TableRow key={mentor.id} hover>
                  <TableCell>
                    {mentor.first_name} {mentor.last_name}
                  </TableCell>
                  <TableCell>{mentor.User?.email || 'N/A'}</TableCell>
                  <TableCell>{mentor.position?.position_name || 'N/A'}</TableCell>
                  <TableCell>{mentor.industry?.industry_name || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusLabel(mentor.approval_status)}
                      color={getStatusColor(mentor.approval_status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {mentor.created_at
                      ? new Date(mentor.created_at).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/admin/mentors/${mentor.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {displayMentors.length === 0 && searchQuery && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No mentors found matching your search.
        </Alert>
      )}
    </Box>
  )
}

export default MentorList


import { atom } from 'jotai'
import { getAllMentors, getMentorById, approveMentor, rejectMentor } from '../services/adminMentorService'
import { registerMentor } from '../services/mentorService'

// ============================================
// MENTOR REGISTRATION ATOMS (Public)
// ============================================

/**
 * Mentor registration form data atom
 */
export const mentorRegisterAtom = atom({
  // Personal Info
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  
  // Professional Info
  industry: '',
  position: '',
  jobTitle: '',
  expertiseAreas: '',
  yearsOfExperience: '',
  company: '',
  linkedIn: '',
  about: '',
  
  // Files
  profilePicture: null,
  mentorDocuments: [],
  
  // Education
  education: []
})

/**
 * Mentor registration loading state
 */
export const mentorRegisterLoadingAtom = atom(false)

/**
 * Mentor registration error state
 */
export const mentorRegisterErrorAtom = atom(null)

/**
 * Mentor registration success state
 */
export const mentorRegisterSuccessAtom = atom(false)

// ============================================
// ADMIN MENTOR MANAGEMENT ATOMS
// ============================================

/**
 * Refresh trigger for mentors list
 */
export const adminMentorsRefreshAtom = atom(0)

/**
 * All mentors atom (fetched from API with refresh support)
 */
export const adminMentorsAtom = atom(async (get) => {
  await get(adminMentorsRefreshAtom) // Trigger refresh when this changes
  const result = await getAllMentors()
  if (result.success) {
    return result.data || []
  }
  return []
})

/**
 * Mentors list (alias for adminMentorsAtom)
 */
export const adminMentorsListAtom = atom((get) => get(adminMentorsAtom))

/**
 * Filtered mentors by status
 */
export const adminMentorsFilteredAtom = atom(
  (get) => {
    const mentors = get(adminMentorsListAtom)
    return {
      all: mentors,
      pending: mentors.filter(m => m.approval_status === 'pending'),
      approved: mentors.filter(m => m.approval_status === 'approved'),
      rejected: mentors.filter(m => m.approval_status === 'rejected')
    }
  }
)

/**
 * Selected mentor detail atom
 */
export const adminMentorDetailAtom = atom(null)

/**
 * Loading state for mentor detail
 */
export const adminMentorDetailLoadingAtom = atom(false)

/**
 * Action loading state (approve/reject)
 */
export const adminMentorActionLoadingAtom = atom(false)

/**
 * Action error state
 */
export const adminMentorActionErrorAtom = atom(null)

// ============================================
// DERIVED ATOMS
// ============================================

/**
 * Pending mentors count
 */
export const pendingMentorsCountAtom = atom(
  (get) => {
    const filtered = get(adminMentorsFilteredAtom)
    return filtered.pending.length
  }
)

/**
 * Approved mentors count
 */
export const approvedMentorsCountAtom = atom(
  (get) => {
    const filtered = get(adminMentorsFilteredAtom)
    return filtered.approved.length
  }
)

/**
 * Rejected mentors count
 */
export const rejectedMentorsCountAtom = atom(
  (get) => {
    const filtered = get(adminMentorsFilteredAtom)
    return filtered.rejected.length
  }
)


import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { getUserProfile, updateUserProfile, changePassword, getUserBookings, getUserCertificates } from '../api/userService'

// ============================================
// Profile Atoms
// ============================================

// Base profile atom (not persisted)
export const userProfileAtom = atom(null)

// Loading state for profile operations
export const profileLoadingAtom = atom(false)

// Error state for profile operations
export const profileErrorAtom = atom(null)

// Async atom to fetch profile
export const fetchProfileAtom = atom(
  null,
  async (get, set) => {
    set(profileLoadingAtom, true)
    set(profileErrorAtom, null)
    try {
      const result = await getUserProfile()
      if (result.success) {
        set(userProfileAtom, result.data)
        return result.data
      } else {
        set(profileErrorAtom, result.message)
        throw new Error(result.message)
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to load profile'
      set(profileErrorAtom, errorMessage)
      throw error
    } finally {
      set(profileLoadingAtom, false)
    }
  }
)

// Async atom to update profile
export const updateProfileAtom = atom(
  null,
  async (get, set, profileData) => {
    set(profileLoadingAtom, true)
    set(profileErrorAtom, null)
    try {
      const result = await updateUserProfile(profileData)
      if (result.success) {
        // Update the profile atom with new data
        set(userProfileAtom, result.data)
        return result.data
      } else {
        set(profileErrorAtom, result.message)
        throw new Error(result.message)
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to update profile'
      set(profileErrorAtom, errorMessage)
      throw error
    } finally {
      set(profileLoadingAtom, false)
    }
  }
)

// ============================================
// Security Atoms
// ============================================

export const passwordLoadingAtom = atom(false)
export const passwordErrorAtom = atom(null)
export const passwordSuccessAtom = atom(null)

// Async atom to change password
export const changePasswordAtom = atom(
  null,
  async (get, set, passwordData) => {
    set(passwordLoadingAtom, true)
    set(passwordErrorAtom, null)
    set(passwordSuccessAtom, null)
    try {
      const result = await changePassword(passwordData)
      if (result.success) {
        set(passwordSuccessAtom, result.message || 'Password changed successfully')
        return result
      } else {
        set(passwordErrorAtom, result.message)
        throw new Error(result.message)
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to change password'
      set(passwordErrorAtom, errorMessage)
      throw error
    } finally {
      set(passwordLoadingAtom, false)
    }
  }
)

// ============================================
// Bookings Atoms
// ============================================

export const bookingsAtom = atom([])
export const bookingsLoadingAtom = atom(false)
export const bookingsErrorAtom = atom(null)

// Async atom to fetch bookings
export const fetchBookingsAtom = atom(
  null,
  async (get, set) => {
    set(bookingsLoadingAtom, true)
    set(bookingsErrorAtom, null)
    try {
      const result = await getUserBookings()
      if (result.success) {
        set(bookingsAtom, result.data || [])
        return result.data
      } else {
        set(bookingsErrorAtom, result.message)
        throw new Error(result.message)
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to load bookings'
      set(bookingsErrorAtom, errorMessage)
      throw error
    } finally {
      set(bookingsLoadingAtom, false)
    }
  }
)

// ============================================
// Certificates Atoms
// ============================================

export const certificatesAtom = atom([])
export const certificatesLoadingAtom = atom(false)
export const certificatesErrorAtom = atom(null)

// Async atom to fetch certificates
export const fetchCertificatesAtom = atom(
  null,
  async (get, set) => {
    set(certificatesLoadingAtom, true)
    set(certificatesErrorAtom, null)
    try {
      const result = await getUserCertificates()
      if (result.success) {
        set(certificatesAtom, result.data || [])
        return result.data
      } else {
        set(certificatesErrorAtom, result.message)
        throw new Error(result.message)
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to load certificates'
      set(certificatesErrorAtom, errorMessage)
      throw error
    } finally {
      set(certificatesLoadingAtom, false)
    }
  }
)


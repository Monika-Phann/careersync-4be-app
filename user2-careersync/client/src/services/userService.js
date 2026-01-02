import axiosInstance from '../api/axiosInstance'

function getErrorMessage(error, fallbackMessage) {
  if (error?.code === 'ERR_NETWORK' || error?.message === 'Network Error') {
    return 'Cannot connect to server. Please make sure the backend server is running on https://api-4be.ptascloud.online'
  }
  
  const errorData = error?.response?.data
  if (errorData) {
    if (errorData.message) return errorData.message
    if (errorData.error) return errorData.error
    if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      return errorData.errors.map(e => e.message || e).join(', ')
    }
  }
  
  return error?.message || fallbackMessage
}

function ok(data, message) {
  return { success: true, data, message: message || '' }
}

function fail(message, data) {
  return { success: false, data: data || null, message: message || '' }
}

export async function getProfile() {
  try {
    const res = await axiosInstance.get('/api/user/profile')
    
    console.log('getProfile - Full backend response:', JSON.stringify(res.data, null, 2))
    
    // Transform backend response to frontend format
    const accUser = res.data.AccUser || {}
    
    // Use profile_image_url if backend provides it, otherwise construct it
    const profileImageUrl = accUser.profile_image_url || 
      (accUser.profile_image ? `https://api-4be.ptascloud.online/uploads/${accUser.profile_image}` : null)
    
    console.log('getProfile - AccUser data:', accUser)
    console.log('getProfile - profile_image:', accUser.profile_image)
    console.log('getProfile - profile_image_url:', accUser.profile_image_url)
    console.log('getProfile - Final constructed image URL:', profileImageUrl)
    
    // Verify the URL is accessible
    if (profileImageUrl) {
      console.log('Image URL to test:', profileImageUrl)
    }
    
    // Transform gender: "male" -> "Male", "female" -> "Female"
    const capitalizeFirst = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : ''
    
    // Transform status: "student" -> "Student", "professional" -> "Working", "institution" -> "Institution"
    // Database enum: ['student', 'professional', 'institution']
    // Frontend display: "Student", "Working", "Institution"
    const transformStatus = (status) => {
      if (!status) return ''
      const lower = status.toLowerCase()
      if (lower === 'student') return 'Student'
      if (lower === 'professional') return 'Working'
      if (lower === 'institution') return 'Institution'
      // Legacy: if somehow "working" is in DB, treat as "professional"
      if (lower === 'working') return 'Working'
      return capitalizeFirst(status)
    }
    
    const transformedGender = capitalizeFirst(accUser.gender || '')
    const transformedStatus = transformStatus(accUser.types_user || '')
    
    console.log('Profile transformation:', {
      rawGender: accUser.gender,
      transformedGender: transformedGender,
      rawStatus: accUser.types_user,
      transformedStatus: transformedStatus
    })
    
    const profileData = {
      id: res.data.id,
      email: res.data.email,
      role: res.data.role_name,
      firstName: accUser.first_name || '',
      lastName: accUser.last_name || '',
      phone: accUser.phone || '',
      dob: accUser.dob || '',
      gender: transformedGender,
      status: transformedStatus,
      institution: accUser.institution_name || '',
      avatar: profileImageUrl,
      profileImage: profileImageUrl
    }
    
    return ok(profileData, 'Profile loaded successfully')
  } catch (error) {
    return fail(getErrorMessage(error, 'Failed to load profile'), error?.response?.data)
  }
}

export async function updateProfile(data) {
  try {
    const hasFile = data.profileImage instanceof File
    
    let payload
    let config = {}
    
    if (hasFile) {
      const formData = new FormData()
      
      // Map frontend field names to backend expected names
      Object.keys(data).forEach(key => {
        if (key === 'profileImage' && data[key] instanceof File) {
          formData.append('profileImage', data[key])
        } else if (key === 'firstName') {
          formData.append('firstname', data[key])
        } else if (key === 'lastName') {
          formData.append('lastname', data[key])
        } else if (key === 'status') {
          // Transform status: "Student" -> "student", "Working" -> "professional"
          // Database enum only accepts: 'student', 'professional', 'institution'
          const transformStatusForDB = (status) => {
            if (!status) return ''
            const lower = status.toLowerCase()
            if (lower === 'student') return 'student'
            if (lower === 'working') return 'professional' // Map "working" to "professional"
            if (lower === 'professional') return 'professional'
            if (lower === 'institution') return 'institution'
            return lower
          }
          const dbStatus = transformStatusForDB(data[key])
          formData.append('currentstatus', dbStatus)
        } else if (key === 'gender') {
          // Transform gender: "Male" -> "male", "Female" -> "female"
          const lowercaseGender = data[key] ? data[key].toLowerCase() : ''
          formData.append('gender', lowercaseGender)
        } else if (key === 'institution') {
          formData.append('institution', data[key])
        } else if (data[key] != null && key !== 'avatar' && key !== 'profileImage') {
          formData.append(key, data[key])
        }
      })
      
      payload = formData
      config = {}
    } else {
      // Transform gender: "Male" -> "male", "Female" -> "female"
      const lowercaseGender = data.gender ? data.gender.toLowerCase() : ''
      
      // Transform status: "Student" -> "student", "Working" -> "professional"
      // Database enum only accepts: 'student', 'professional', 'institution'
      const transformStatusForDB = (status) => {
        if (!status) return ''
        const lower = status.toLowerCase()
        if (lower === 'student') return 'student'
        if (lower === 'working') return 'professional' // Map "working" to "professional"
        if (lower === 'professional') return 'professional'
        if (lower === 'institution') return 'institution'
        return lower
      }
      const dbStatus = transformStatusForDB(data.status)
      
      payload = {
        firstname: data.firstName,
        lastname: data.lastName,
        phone: data.phone,
        gender: lowercaseGender,
        dob: data.dob,
        currentstatus: dbStatus,
        institution: data.institution
      }
    }
    
    const res = await axiosInstance.put('/api/user/profile', payload, config)
    console.log('updateProfile - Full backend response:', JSON.stringify(res.data, null, 2))
    // Backend now returns { message, data } where data contains the updated profile
    const responseData = res.data?.data || res.data
    console.log('updateProfile - Extracted data:', JSON.stringify(responseData, null, 2))
    return ok(responseData, res.data?.message || 'Profile updated successfully')
  } catch (error) {
    return fail(getErrorMessage(error, 'Failed to update profile'), error?.response?.data)
  }
}


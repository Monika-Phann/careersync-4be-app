import axiosInstance from '../api/axiosInstance'; 

/* ========================================================
   AUTH SERVICES
======================================================== */

export const postLogin = async (credentials) => {
    // 1. MOCK DATA (Delete/Comment this block when backend is ready)
    return { 
        user: { id: 1, name: 'Test Student', role: 'student' }, 
        token: 'mock-jwt-token' 
    };

    // 2. REAL BACKEND INTEGRATION (Uncomment to use)
    /*
    const response = await axiosInstance.post('/auth/signin', credentials);
    return response.data; 
    */
};

export const postStudentRegister = async (formData) => {
    // 1. MOCK DATA
    return { message: "Registration successful" };

    // 2. REAL BACKEND INTEGRATION
    /*
    const response = await axiosInstance.post('/auth/register/student', formData);
    return response.data;
    */
};

export const postMentorRegister = async (formData) => {
    // 1. MOCK DATA
    return { message: "Mentor registration submitted" };

    // 2. REAL BACKEND INTEGRATION
    /*
    const response = await axiosInstance.post('/auth/register/mentor', formData);
    return response.data;
    */
};

/* ========================================================
   PASSWORD & ACCOUNT SERVICES
======================================================== */

export const postForgotPassword = async (emailPayload) => {
    // 1. MOCK DATA
    return { message: "Reset link sent to your email" };

    // 2. REAL BACKEND INTEGRATION
    /*
    const response = await axiosInstance.post('/auth/password/forgot', emailPayload);
    return response.data;
    */
};

export const postResetPassword = async (resetData) => {
    // 1. MOCK DATA
    return { message: "Password updated successfully" };

    // 2. REAL BACKEND INTEGRATION
    /*
    const response = await axiosInstance.post('/auth/password/reset', resetData);
    return response.data;
    */
};

/* ========================================================
   CONTENT & PROGRAM SERVICES
======================================================== */

export const fetchProgramsList = async () => {
    // 1. MOCK DATA (Returns instantly to fill your UI)
    return [
        { 
            id: 1, 
            title: "Software Engineering Shadowing", 
            category: "Information Technology",
            description: "Observe a senior developer's daily workflow at a top firm.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
        },
        { 
            id: 2, 
            title: "Investment Banking 101", 
            category: "Banking & Finance",
            description: "Learn about deal structuring and high-finance meetings.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
        }
    ];

    // 2. REAL BACKEND INTEGRATION
    /*
    const response = await axiosInstance.get('/programs');
    return response.data;
    */
};

export const fetchProgramsByCategory = async (category) => {
    // 1. MOCK LOGIC (Filters the mock list locally)
    const all = await fetchProgramsList();
    if (category === 'All Industries') return all;
    return all.filter(p => p.category === category);

    // 2. REAL BACKEND INTEGRATION
    /*
    const response = await axiosInstance.get('/programs', { 
        params: { category: category } 
    });
    return response.data;
    */
};

export const fetchAboutDetails = async () => {
    // 1. MOCK DATA
    return { 
        title: "About CareerSync", 
        description: "Connecting the next generation of professionals with industry leaders." 
    };

    // 2. REAL BACKEND INTEGRATION
    /*
    const response = await axiosInstance.get('/content/about');
    return response.data;
    */
};

/* ========================================================
   CONTACT & MISC
======================================================== */

export const postContactMessage = async (formData) => {
    // 1. MOCK DATA
    return { status: "success", message: "Message received" };

    // 2. REAL BACKEND INTEGRATION
    /*
    const response = await axiosInstance.post('/contact', formData);
    return response.data;
    */
};
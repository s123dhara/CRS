import axios from "axios";
// Create API instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // Important for cookie-based auth    
});

const createJob = async (formData, user) => {
    try {
        const { data } = await api.post('/recruiter/job/add', { formData, user });
        return {
            status: data.status,
            message: data.message,
        };
    } catch (error) {
        console.error('error:', error.message);
        return {
            status: false,
            message: error.message,
        };
    }
};

const fetchJobByCompanyId = async (user) => {
    try {
        const { data } = await api.post('/recruiter/jobs', { user });
        return {
            status: data.status,
            jobs: data.jobs,
        };
    } catch (error) {
        console.error('error:', error.message);
        return {
            status: false,
            message: error.message,
        };
    }
}

const fetchJobByJobId = async (job_id) => {
    try {
        const { data } = await api.get(`/recruiter/job/edit/${job_id}`);
        return {
            status: data.status,
            job: data.job,
        };
    } catch (error) {
        console.error('error:', error.message);
        return {
            status: false,
            message: error.message,
        };
    }
}

const updateJobByJobId = async (job_id, formData) => {
    try {
        const { data } = await api.post(`/recruiter/job/edit/${job_id}`, { formData });
        return {
            status: data.status,
            job: data.job,
            message: data.message,
        };
    } catch (error) {
        console.error('error:', error.message);
        return {
            status: false,
            message: error.message,
        };
    }
}

const deleteJobByJobId = async (job_id) => {
    try {
        const { data } = await api.post(`/recruiter/job/delete`, { job_id });
        return {
            status: data.status,
            message: data.message,
        };
    } catch (error) {
        console.error('error:', error.message);
        return {
            status: false,
            message: error.message,
        };
    }
}

const allJobs = async () => {
    try {
        const { data } = await api.get(`/recruiter/all-jobs`);
        return {
            status: data.status,
            message: data.message,
            jobs: data.jobs
        };
    } catch (error) {
        console.error('error:', error.message);
        return {
            status: false,
            message: error.message,
        };
    }
}

const applyJob = async (jobDetails, user) => {
    try {
        const { data } = await api.post(`/application/apply-job`, { jobDetails, user });
        return {
            status: data.status,
            message: data.message,
        };
    } catch (error) {
        console.error('error:', error.message);
        return {
            status: false,
            message: error.message,
        };
    }
}

const BACKEND_API = { createJob, fetchJobByCompanyId, fetchJobByJobId, updateJobByJobId, deleteJobByJobId, allJobs, applyJob }

export default BACKEND_API;
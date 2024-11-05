import axios from 'axios'

export default {
  getJobs() {
    return axios.get('/api/jobs').then(res => res.data)
  },

  getJob(jobID) {
    return axios.get(`/api/jobs/${jobID}`).then(res => res.data)
  },
}

import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/comments'

const comment = async com => {
    const response = await axios.post(baseUrl, com)
    return response.data
};

export default { comment }
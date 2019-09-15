import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-37679.firebaseio.com/'
})

export default instance;
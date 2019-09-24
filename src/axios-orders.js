import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://burger-builder-version-2.firebaseio.com/'
});

export default instance;
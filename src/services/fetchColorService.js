import axiosWithAuth from '../helpers/axiosWithAuth';

const fetchColorService = () => {
    axiosWithAuth().get('http://localhost:5000/api/colors')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            alert(err);
        })
}

export default fetchColorService;
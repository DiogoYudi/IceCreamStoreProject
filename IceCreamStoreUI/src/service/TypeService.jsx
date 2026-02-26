import axios from "axios";

const TYPE_API_BASE_URL = "http://localhost:8080/api/v1/stocktype";

class TypeService{
    addType(stock){
        return axios.post(TYPE_API_BASE_URL, stock);
    }

    getType(){
        return axios.get(TYPE_API_BASE_URL);
    }
}

export default new TypeService()
import axios from "axios";

const STOCK_API_BASE_URL = "http://localhost:8080/api/v1/stock";

class StockService{
    addStock(stock){
        return axios.post(STOCK_API_BASE_URL, stock);
    }

    getStock(){
        return axios.get(STOCK_API_BASE_URL);
    }

    updateStock(stock, id){
        return axios.put(STOCK_API_BASE_URL + "/" + id, stock);
    }

    deleteStock(id){
        return axios.delete(STOCK_API_BASE_URL + "/" + id);
    }
}

export default new StockService()
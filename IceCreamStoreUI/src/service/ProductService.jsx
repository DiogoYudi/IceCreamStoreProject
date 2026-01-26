import axios from "axios";

const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/product";

class ProductService{
    addProduct(product){
        return axios.post(PRODUCT_API_BASE_URL, product);
    }

    getProduct(){
        return axios.get(PRODUCT_API_BASE_URL);
    }

    updateProduct(product, id){
        return axios.put(PRODUCT_API_BASE_URL + "/" + id, product);
    }

    deleteProduct(id){
        return axios.delete(PRODUCT_API_BASE_URL + "/" + id);
    }
}

export default new ProductService()
package com.icecreamstore.system_icecreamstore.service;

import java.util.List;


import com.icecreamstore.system_icecreamstore.model.Product;

public interface ProductService {
    Product addProduct(Product product);

    List<Product> getAllProducts();

    Product updateProduct(Long id, Product product);

    boolean deleteProduct(Long id);
}

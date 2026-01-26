package com.icecreamstore.system_icecreamstore.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.icecreamstore.system_icecreamstore.entity.ProductEntity;
import com.icecreamstore.system_icecreamstore.model.Product;
import com.icecreamstore.system_icecreamstore.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    @Override
    public Product addProduct(Product product){
        ProductEntity productEntity = new ProductEntity();
        BeanUtils.copyProperties(product, productEntity);
        productRepository.save(productEntity);
        return product;
    }

    @Override
    public List<Product> getAllProducts() {
        List<ProductEntity> productEntities = productRepository.findAll();
        List<Product> products = productEntities.stream().map(p -> new Product(
            p.getId(),
            p.getN(),
            p.getName(),
            p.getPrice()
        )).collect(Collectors.toList());
        return products;
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        ProductEntity productEntity = productRepository.findById(id).get();
        productEntity.setName(product.getName());
        productEntity.setPrice(product.getPrice());
        productRepository.save(productEntity);
        return product;
    }

    @Override
    public boolean deleteProduct(Long id) {
        Optional<ProductEntity> productOptional = productRepository.findById(id);
        if(productOptional.isPresent()){
            productRepository.delete(productOptional.get());
            return true;
        }
        return false;
    }
}

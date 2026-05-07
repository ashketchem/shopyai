package com.shopyai.service;

import com.shopyai.entity.Product;
import com.shopyai.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> getProductByQuery(String query) {
        return productRepository.findBySearchQuery(query.toLowerCase());
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public boolean productExists(String query) {
        return productRepository.existsBySearchQuery(query.toLowerCase());
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}

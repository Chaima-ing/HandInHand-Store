package handinhandstore.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import handinhandstore.demo.repository.ProductRepository;
import handinhandstore.demo.model.entity.Product;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public void saveProduct(Product product) {
        productRepository.save(product);
    } 
}

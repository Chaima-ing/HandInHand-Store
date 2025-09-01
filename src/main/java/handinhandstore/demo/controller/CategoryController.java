package handinhandstore.demo.controller;

import handinhandstore.demo.model.entity.Category;
import handinhandstore.demo.service.CategoryService;
import handinhandstore.demo.dto.CategoryRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/get/all")
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/save")
    public Category createCategory(@RequestBody CategoryRequest categoryRequest) {
        Category category = new Category(categoryRequest.getName(), categoryRequest.getIcon);
        return categoryService.createCategory(category);
    }
}

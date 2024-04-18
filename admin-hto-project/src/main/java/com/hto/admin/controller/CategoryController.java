package com.hto.admin.controller;

import com.hto.admin.consts.Consts;
import com.hto.admin.dto.CategoryDTO;
import com.hto.admin.dto.CategoryRequestDTO;
import com.hto.admin.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(Consts.PREFIX_ADMIN + "/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/get-all")
    public ResponseEntity<List<CategoryDTO>> getListCategory() {

        return new ResponseEntity<>(categoryService.getAllCategory(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryDTO> getById(@PathVariable long id) {

        return new ResponseEntity<>(categoryService.getById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/create", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Long> createCategory(@RequestPart CategoryRequestDTO categoryRequestDTO, MultipartFile image) {

        return new ResponseEntity<>(categoryService.createCategory(categoryRequestDTO, image), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Long> updateCategory(@RequestPart CategoryRequestDTO categoryRequestDTO, MultipartFile image) {

        return new ResponseEntity<>(categoryService.updateCategory(categoryRequestDTO, image), HttpStatus.OK);
    }
}

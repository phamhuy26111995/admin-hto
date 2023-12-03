package com.hto.admin.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ProductDTO extends BaseDTO {
    private String title;
    private String description;
    private String code;
    private long categoryId;
    private List<ProductTabDTO> productTabDTOList;

    public ProductDTO(long id,String title, String description, String code, long categoryId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.code = code;
        this.categoryId = categoryId;
    }
}

package com.hto.admin.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ProductRequestDTO extends BaseDTO{
    private String title;
    private String code;
    private String description;
    private long categoryId;
    private List<ProductTabRequestDTO> addedTabs;
    private List<ProductTabRequestDTO> editedTabs;
    private List<Long> removedTabs;
}

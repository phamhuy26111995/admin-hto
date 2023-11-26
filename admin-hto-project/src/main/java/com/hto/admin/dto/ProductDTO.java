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
    private List<ProductTabDTO> productTabDTOList;

}

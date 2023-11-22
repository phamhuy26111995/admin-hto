package com.hto.admin.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductTabDTO extends BaseDTO{
    private String title;
    private long productId;
    private List<TabContentDTO> tabContentDTOList;

    public ProductTabDTO(long id,String title, long productId) {
        this.title = title;
        this.id = id;
        this.productId = productId;
    }
}

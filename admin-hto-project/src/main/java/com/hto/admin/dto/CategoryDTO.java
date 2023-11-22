package com.hto.admin.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class CategoryDTO extends BaseDTO{
    private String title;

    private String image;

    public CategoryDTO(long id,String title, String image) {
        super.id = id;
        this.title = title;
        this.image = image;
    }
}

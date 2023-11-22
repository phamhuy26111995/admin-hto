package com.hto.admin.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class ProductTabRequestDTO extends BaseDTO{
    private String title;
    private List<TabContentRequestDTO> tabContents = new ArrayList<>();
    private List<Long> removedContents = new ArrayList<>();
    private List<TabContentRequestDTO> editContents = new ArrayList<>();
    private long productId;
}

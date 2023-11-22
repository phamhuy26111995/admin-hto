package com.hto.admin.dto;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TabContentRequestDTO extends BaseDTO {
    private String title;
    private String content;
    private String type;
    private long productTabId;
}

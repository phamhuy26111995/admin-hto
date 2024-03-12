package com.hto.admin.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TabContentDTO extends BaseDTO{
    private String title;
    private String content;
    private long productTabId;
    private String type;


    public TabContentDTO(long id,String title, String content, long productTabId, String type) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.productTabId = productTabId;
        this.type = type;
    }
}

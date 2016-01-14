package com.{{data.companyName}}.persistence.bean;

import lombok.Data;
import java.io.Serializable;
import java.util.*;

/**
 * {{data.tableName}} 实体类
 */

@Data
public class {{data.className}} implements Serializable {

    private static final long serialVersionUID = -{{data.serialVersionUID}}L;
    {% for column in data.columns %}
    private {{column.type}} {{column.name}};{% endfor %}
}


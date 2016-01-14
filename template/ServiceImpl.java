package com.{{data.companyName}}.service.impl;

import com.{{data.companyName}}.persistence.bean.{{data.className}};
import com.{{data.companyName}}.persistence.mapper.{{data.className}}Mapper;
import com.{{data.companyName}}.service.{{data.className}}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service{% for column in data.columns %}{% if column.isPri %}
public class {{data.className}}ServiceImpl extends BaseServiceImpl<{{data.className}}, {{column.type}}> implements {{data.className}}Service<{{data.className}}, {{column.type}}> {
{% endif %}{% endfor %}

    @Autowired
    public {{data.className}}ServiceImpl({{data.className}}Mapper repo) {
        super(repo);
    }
}
package com.{{data.companyName}}.api.bg;

import com.{{data.companyName}}.api.BaseController;
import com.{{data.companyName}}.persistence.bean.{{data.className}};
import com.{{data.companyName}}.service.{{data.className}}Service;
import com.{{data.companyName}}.vo.QueryData;
import com.{{data.companyName}}.vo.ResultModel;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/bg/{{data.variableName}}")
public class {{data.className}}Controller extends BaseController {

    @Autowired{% for column in data.columns %}{% if column.isPri %}
    private {{data.className}}Service<{{data.className}}, {{column.type}}> {{data.variableName}}Service;
    {% endif%}{% endfor %}
    @RequestMapping(value = "/list")
    @ResponseBody
    public ResultModel list(@RequestParam Map<String, Object> condition, HttpServletRequest request) throws Exception {

        QueryData qd = {{data.variableName}}Service.queryListAndCount(buildBgCondition(condition, request));

        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("queryData", qd);

        ResultModel rm = new ResultModel();
        rm.setSuccessCode();
        rm.setData(dataMap);

        return rm;
    }

    @RequestMapping(value = "/detail/{id}", produces = "application/json")
    @ResponseBody{% for column in data.columns %}{% if column.isPri %}
    public ResultModel detail(@PathVariable("id") {{column.type}} id) throws Exception {
    {% endif%}{% endfor %}
        ResultModel rm = new ResultModel();

        Map<String, Object> dataMap = new HashMap<>();
        {{data.className}} {{data.variableName}} = {{data.variableName}}Service.get(id);
        dataMap.put("{{data.variableName}}", {{data.variableName}});
        rm.setSuccessCode();
        rm.setData(dataMap);

        return rm;
    }

    @RequestMapping(value = "/save", produces = "application/json")
    @ResponseBody
    public ResultModel add({{data.className}} object) throws Exception {
       {% for column in data.columns %}{% if column.isPri %}
       if(object.get{{column.variableName}}() == null){ {% endif%}{% endfor %}
          return {{data.variableName}}Service.add(object);
       }else{
          return {{data.variableName}}Service.update(object);
       }
    }

    @RequestMapping(value = "/delete", produces = "application/json")
    @ResponseBody
    public ResultModel delete(@RequestBody {{data.className}}[] {{data.variableName}}s) throws Exception {
        int count = 0;
        for ({{data.className}} {{data.variableName}} : {{data.variableName}}s) {
            {% for column in data.columns %}{% if column.isPri %}ResultModel rm = {{data.variableName}}Service.delete({{data.variableName}}.get{{column.variableName}}()); {% endif%}{% endfor %}
            Map<String, Object> dataMap = (Map<String, Object>) rm.getData();
            if (dataMap.get("deleteNum") != null) {
                count += Integer.parseInt(dataMap.get("deleteNum").toString());
            }
        }
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("deleteNum", count);

        ResultModel rm = new ResultModel();
        rm.setSuccessCode();
        rm.setData(dataMap);

        return rm;
    }
}
package com.{{companyName}}.persistence;


import com.{{companyName}}.vo.Pagination;

import java.io.Serializable;
import java.util.List;
import java.util.Map;


public interface AbstractBaseMapper<T, ID extends Serializable>
{

    int deleteByPrimaryKey(ID id);

    int insertSelective(T record);

    T selectByPrimaryKey(ID id);

    int updateByPrimaryKeySelective(T record);

    List<Map<String, Object>> queryByCondition(Map<String, Object> conditionMap, Pagination pagination);

    int countByCondition(Map<String, Object> conditionMap);
}
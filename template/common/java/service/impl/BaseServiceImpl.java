package com.{{companyName}}.service.impl;


import com.{{companyName}}.common.Constants;
import com.{{companyName}}.vo.QueryData;
import com.{{companyName}}.vo.ResultModel;
import com.{{companyName}}.vo.Pagination;
import com.{{companyName}}.persistence.AbstractBaseMapper;
import com.{{companyName}}.service.BaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public abstract class BaseServiceImpl<T, ID extends Serializable> implements BaseService<T, ID>
{

	private static final Logger logger = LoggerFactory.getLogger(BaseServiceImpl.class);

	private AbstractBaseMapper<T, ID> repo;

	public BaseServiceImpl(AbstractBaseMapper<T, ID> repo) {
		this.repo = repo;
	}


	public T get(ID id)  {
		return repo.selectByPrimaryKey(id);
	}

	public ResultModel add(T object)  {
		repo.insertSelective(object);

        T newObject = getObjectByPrimaryKey(object);

		ResultModel rm = new ResultModel();
		rm.setSuccessCode();

		Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("addedObject", newObject);
		rm.setData(dataMap);

		return rm;
	}


    private T getObjectByPrimaryKey(T object) {
        ID id = null;
        try {
            Field primaryField;
            Field[] fields = object.getClass().getDeclaredFields();
            if (fields[0].getName().equals("serialVersionUID")) {
                primaryField = fields[1];
            } else {
                primaryField = fields[0];
            }
            primaryField.setAccessible(true);
            id = (ID) primaryField.get(object);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        }

        T newObject = null;
        if (id != null) {
            newObject = get(id);
        }

        return newObject;
    }


    public ResultModel update(T object)  {

		int num = repo.updateByPrimaryKeySelective(object);

		ResultModel rm = new ResultModel();
		rm.setSuccessCode();

		Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("updateNum", num);
		dataMap.put("updateObject", object);
        dataMap.put("afterUpdateObject", getObjectByPrimaryKey(object));
		rm.setData(dataMap);

		return rm;
	}

	public ResultModel delete(ID id) {

		int num = repo.deleteByPrimaryKey(id);

		ResultModel rm = new ResultModel();
		rm.setSuccessCode();

		Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("deleteNum", num);
		rm.setData(dataMap);

		return rm;
	}

	public QueryData queryListAndCount(Map<String, Object> condition) {

		Pagination pagination;

		if (!StringUtils.isEmpty(condition.get(Constants.KEY_PAGE_SIZE))
                && !StringUtils.isEmpty(condition.get(Constants.KEY_PAGE_FROM))) {
			int currPage = Integer.parseInt(condition.get(Constants.KEY_PAGE_FROM).toString());
			int pageSize = Integer.parseInt(condition.get(Constants.KEY_PAGE_SIZE).toString());

			pagination = new Pagination(pageSize, currPage);
		} else {
			pagination = new Pagination();
		}


		List<Map<String, Object>> list = repo.queryByCondition(condition, pagination);
		int totalCount = repo.countByCondition(condition);

		QueryData qd = new QueryData();
		qd.setTotalCount(totalCount);
		qd.setDataList(list);
		qd.setPageSize(Integer.parseInt(condition.get(Constants.KEY_PAGE_SIZE).toString()));
		qd.setCurrPage(Integer.parseInt(condition.get(Constants.KEY_PAGE_FROM).toString()));
		qd.build();

		return qd;
	}
}

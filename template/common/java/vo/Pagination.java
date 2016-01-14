package com.{{companyName}}.vo;


import lombok.Data;

import java.io.Serializable;


/**
 * Pagination
 *
 * @author wushen
 * @date 2016-1-11
 * @since 0.0.1
 */
@Data
public class Pagination implements Serializable
{

    private static final long serialVersionUID = 5379353880091376468L;

    private static final int DEFAULT_PAGE_SIZE = 10;
    private static final int DEFAULT_CURR_PAGE = 1;

    /**
     * 每页记录数
     */
    private int pageSize;

    /**
     * 当前页数
     */
    private int currentPage;

    /**
     * 当前页的开始的记录数
     */
    private int start = 0;



    public Pagination() {
        this(DEFAULT_PAGE_SIZE, DEFAULT_CURR_PAGE);
    }


    public Pagination(int pageSize, int currentPage) {
        this.pageSize = pageSize;
        this.currentPage = currentPage;

        if (this.currentPage <= 1) {
            start = 0;
        } else {
            start = this.pageSize * (this.currentPage - 1);
        }
    }


}

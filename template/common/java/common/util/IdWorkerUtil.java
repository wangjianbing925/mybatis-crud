package com.{{companyName}}.common.util;



public class IdWorkerUtil
{

    private static IdWorker userIdWorker = new IdWorker(2);

    public static long getNextUserId() {
        return userIdWorker.nextId();
    }


}

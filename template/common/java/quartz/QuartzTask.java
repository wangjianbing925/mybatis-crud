package com.{{companyName}}.quartz;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;


@Component
public class QuartzTask
{

    private static Logger logger = LoggerFactory.getLogger(QuartzTask.class);

	private static final SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Scheduled(cron = "0 1 * * * ?")
	public void work() {

		long startTime = System.currentTimeMillis();

		logger.info("QuartzTask start.");

    	try {

			// do time task


    	} catch(Exception e){
			logger.error(e.getMessage(), e);
		}

		logger.info("QuartzTask complete. cost " + (System.currentTimeMillis() - startTime) + "ms.");
	}

}

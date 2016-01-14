package com.{{companyName}}.fastdfs;


import net.coobird.thumbnailator.Thumbnails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;


public class ThumbnailUtil
{

    private static final Logger logger = LoggerFactory.getLogger(ThumbnailUtil.class);

    public static byte[] resize(byte[] content, int width, int height){
        byte[] bs = null;
        
        try {
            ByteArrayInputStream arrayInputStream = new ByteArrayInputStream(content);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            Thumbnails.of(arrayInputStream)
                    .size(width, height)
                    .keepAspectRatio(false)
                    .toOutputStream(outputStream);
            bs = outputStream.toByteArray();
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        }
        
        return bs;
    }

}

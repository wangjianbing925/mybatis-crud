package com.{{companyName}}.fastdfs;


import com.{{companyName}}.common.util.JsonUtil;
import org.csource.common.MyException;
import org.csource.common.NameValuePair;
import org.csource.fastdfs.ClientGlobal;
import org.csource.fastdfs.StorageClient1;
import org.csource.fastdfs.TrackerClient;
import org.csource.fastdfs.TrackerServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;


public class FSClientUtil
{


    private static final Logger logger = LoggerFactory.getLogger(FSClientUtil.class);

    private static TrackerClient trackerClient;

    static {
        String confPath = Thread.currentThread().getContextClassLoader().getResource("fdfs_client.conf").getPath();
        try {
            ClientGlobal.init(confPath);
            trackerClient = new TrackerClient();
        } catch (IOException e) {
            logger.error(e.getMessage(), e);
        } catch (MyException e) {
            logger.error(e.getMessage(), e);
        }
    }

    private static void closeServer(TrackerServer trackerServer) {
        if (trackerServer != null) {
            try {
                trackerServer.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


    public static String masterUpload(String group, byte[] content, String fileExtName, NameValuePair[] meta) throws Exception {
        String result = null;

        TrackerServer trackerServer = null;

        try {
            trackerServer = trackerClient.getConnection();
            StorageClient1 storageClient = new StorageClient1(trackerServer, null);
            result = storageClient.upload_file1(group, content, fileExtName, meta);
            if (result == null) {
                String errorMsg =
                        "upload master file fail,errorCode:" + storageClient.getErrorCode() + " [group] " + group + " [fileExtName] " + fileExtName + " [meta] " + JsonUtil.toJsonString(meta);
                logger.error(errorMsg);
                throw new Exception(errorMsg);
            }
        } catch (IOException | MyException e) {
            logger.error(e.getMessage(), e);
        } finally {
            closeServer(trackerServer);
        }

        return result;
    }


    public static String slaveUpload(byte[] content, String fileExtName, String masterFileId, String prefix, NameValuePair[] meta) throws Exception {
        String result = null;

        TrackerServer trackerServer = null;

        try {
            trackerServer = trackerClient.getConnection();
            StorageClient1 storageClient = new StorageClient1(trackerServer, null);
            result = storageClient.upload_file1(masterFileId, "_" + prefix, content, fileExtName, meta);
            if (result == null) {
                String errorMsg =
                        "upload slave file fail,errorCode:" + storageClient.getErrorCode() + " [masterFileId] " + masterFileId + " [prefix] " + prefix + " [fileExtName] " + fileExtName + " [meta] "
                                + JsonUtil.toJsonString(meta);
                logger.error(errorMsg);
                throw new Exception(errorMsg);
            }
        } catch (IOException | MyException e) {
            logger.error(e.getMessage(), e);
        } finally {
            closeServer(trackerServer);
        }

        return result;
    }


    public static void deleteFile(String fileId) throws Exception {

        TrackerServer trackerServer = null;

        try {
            trackerServer = trackerClient.getConnection();
            StorageClient1 storageClient = new StorageClient1(trackerServer, null);
            int result = storageClient.delete_file1(fileId);
            if (result != 0) {
                String errorMsg =
                        "delete file fail, code:" + result + " errorCode:" + storageClient.getErrorCode() + " [FileId] " + fileId;
                logger.error(errorMsg);
                throw new Exception(errorMsg);
            }
        } catch (IOException | MyException e) {
            logger.error(e.getMessage(), e);
        } finally {
            closeServer(trackerServer);
        }
    }


    public static byte[] downloadFile(String fid) throws Exception {

        byte[] result = null;
        TrackerServer trackerServer = null;

        try {
            trackerServer = trackerClient.getConnection();
            StorageClient1 storageClient = new StorageClient1(trackerServer, null);
            result = storageClient.download_file1(fid);
            if (result == null) {
                String errorMsg =
                        "download file fail,errorCode:" + storageClient.getErrorCode() + " [FileId] " + fid;
                logger.error(errorMsg);
                throw new Exception(errorMsg);
            }
        } catch (IOException | MyException e) {
            logger.error(e.getMessage(), e);
        } finally {
            closeServer(trackerServer);
        }

        return result;
    }

    public static NameValuePair[] getFileMetaData(String fid) throws Exception {

        NameValuePair[] result = null;
        TrackerServer trackerServer = null;

        try {
            trackerServer = trackerClient.getConnection();
            StorageClient1 storageClient = new StorageClient1(trackerServer, null);
            result = storageClient.get_metadata1(fid);
            if (result == null) {
                String errorMsg =
                        "getFileMetaData file fail,errorCode:" + storageClient.getErrorCode() + " [FileId] " + fid;
                logger.error(errorMsg);
                throw new Exception(errorMsg);
            }
        } catch (IOException | MyException e) {
            logger.error(e.getMessage(), e);
        } finally {
            closeServer(trackerServer);
        }

        return result;
    }


}

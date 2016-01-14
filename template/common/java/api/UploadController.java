package com.{{companyName}}.api;


import com.{{companyName}}.common.util.SpringContextUtil;
import com.{{companyName}}.fastdfs.FSClientUtil;
import com.{{companyName}}.fastdfs.FastdfsConfig;
import com.{{companyName}}.vo.ResultModel;
import org.csource.common.NameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.RenderedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping(value = "/")
public class UploadController extends BaseController
{

    private static Logger logger = LoggerFactory.getLogger(UploadController.class);

    private static final String[] imgType = new String[] { "jpg", "jpeg", "png", "bmp", "gif" };


    @ResponseBody
    @RequestMapping(value = "bg/img/upload", method = RequestMethod.POST)
    public ResultModel bgUploadFile(
            @RequestParam CommonsMultipartFile imgFile,
            @RequestParam(required = false, defaultValue = "0") String type) throws Exception {


        return masterUpload(imgFile, type, ThreadContext.getBgUserId());
    }


    @ResponseBody
    @RequestMapping(value = "fr/img/upload", method = RequestMethod.POST)
    public ResultModel frUploadFile(
            @RequestParam CommonsMultipartFile imgFile,
            @RequestParam(required = false, defaultValue = "0") String type) throws Exception {


        return masterUpload(imgFile, type, ThreadContext.getFrUserId());
    }




    private ResultModel masterUpload(CommonsMultipartFile imgFile, String type, long userId)
            throws Exception {

        ResultModel rm = new ResultModel();

        final String originalFilename = imgFile.getOriginalFilename();
        if (originalFilename.lastIndexOf(".") < 1) {
            rm.setFailCode();
            rm.setMsg("文件类型不正确");
            return rm;
        }

        String fileExtName = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        if (!isImage(fileExtName)) {
            rm.setFailCode();
            rm.setMsg("只能上传图片");
            return rm;
        }

        NameValuePair[] meta = new NameValuePair[3];
        meta[0] = new NameValuePair("fileName", originalFilename);
        meta[1] = new NameValuePair("fileExtName", fileExtName);
        meta[2] = new NameValuePair("user", String.valueOf(userId));


        String group = FastdfsConfig.getValue(type);


        byte[] content = getImgData(imgFile, fileExtName);
        if("png".equals(fileExtName)){
            fileExtName = "jpg";
        }
        // 执行上传
        String fileId = FSClientUtil.masterUpload(group, content, fileExtName, meta);
        logger.info("upload fastdfs fileId=" + fileId);

        // 上传完成后获取图片路径
        String host = FastdfsConfig.getValue(group);
        String fileUrl = host + "/" + fileId;

        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("fileUrl", fileUrl);

        rm.setSuccessCode();
        rm.setMsg("上传成功");
        rm.setData(dataMap);

        return rm;
    }

    private byte[] getImgData(CommonsMultipartFile imgFile, String fileExtName) {
        if("png".equals(fileExtName)){
            String rootPath = SpringContextUtil.getWebappRootPath();
            String fileName = System.currentTimeMillis() + "";
            File tempFile = new File(rootPath + File.separator + fileName);
            try {
                imgFile.transferTo(tempFile);
                RenderedImage img = ImageIO.read(tempFile);
                File tempJpgFile = new File(rootPath + File.separator + fileName + ".jpg");
                ImageIO.write(img, "jpg", tempJpgFile);
                tempFile.delete();
                FileInputStream fis = new FileInputStream(tempJpgFile);
                ByteArrayOutputStream bos = new ByteArrayOutputStream(1000);
                byte[] b = new byte[1000];
                int n;
                while ((n = fis.read(b)) != -1) {
                    bos.write(b, 0, n);
                }
                fis.close();
                bos.close();
                byte[] imgData = bos.toByteArray();
                bos.close();
                tempJpgFile.delete();
                return imgData;
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }else{
            return imgFile.getBytes();
        }
    }


    @ResponseBody
    @RequestMapping(value = "img/delete", method = RequestMethod.POST)
    public ResultModel frImgDelete(@RequestParam String imgFile) throws Exception {

        logger.info("imgDelete imgFile=" + imgFile);

        imgFile = imgFile.replace("http://", "");
        imgFile = imgFile.replace("https://", "");
        String fileId = imgFile.substring(imgFile.indexOf("/") + 1);

        logger.info("imgDelete fileId=" + fileId);
        FSClientUtil.deleteFile(fileId);

        ResultModel rm = new ResultModel();
        rm.setSuccessCode();
        rm.setMsg("删除成功");

        return rm;
    }


    private boolean isImage(String fileExtName) {
        boolean result = false;

        for (String type : imgType) {
            if (type.equalsIgnoreCase(fileExtName)) {
                result = true;
                break;
            }
        }

        return result;
    }
}

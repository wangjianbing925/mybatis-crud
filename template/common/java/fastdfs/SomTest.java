package com.{{companyName}}.fastdfs;


import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * Created by yoyo on 2015/11/10.
 */
public class SomTest
{

    public static void main(String[] args) {

        String imgFile = "http://www.chnwinke.com/group1/M00/00/fj_alsdjf_60x90.jpg";

        int fidStart = imgFile.indexOf("group");
        String fid = imgFile.substring(fidStart);

        System.out.println("frSlaveFile fid=" + fid);

        Pattern pattern = Pattern.compile("(_\\d.*\\.)");
        Matcher matcher = pattern.matcher(fid);
        System.out.println(matcher.find());
        String resizeNum = matcher.group();
        resizeNum = resizeNum.substring(1, resizeNum.length() - 1);
                System.out.println(matcher.group());

        fid = fid.replaceAll("\\_\\d.*\\.", ".");

        System.out.println("frSlaveFile fid=" + fid);

        System.out.println("resizeNum=" + resizeNum);
        String[] size = resizeNum.split("x");
        int width = Integer.parseInt(size[0]);
        int height = Integer.parseInt(size[1]);

        System.out.println(width + " ---- " + height);

        String preContext = imgFile.substring(0, imgFile.indexOf("group"));
        System.out.println(preContext);


        imgFile = imgFile.replace("http://", "");
        imgFile = imgFile.replace("https://", "");
        String fileId = imgFile.substring(imgFile.indexOf("/") + 1);

        System.out.println("frImgDelete fileId=" + fileId);

        System.out.println(imgFile);
        Pattern pattern2 = Pattern.compile("(group\\d+)");
        Matcher matcher2 = pattern2.matcher(imgFile);
        System.out.println(matcher2.find());
        System.out.println(matcher2.group());
    }
}

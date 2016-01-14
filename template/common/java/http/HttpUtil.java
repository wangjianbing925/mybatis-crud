package com.{{companyName}}.http;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.Map.Entry;


public class HttpUtil
{

    private static Logger logger = LoggerFactory.getLogger(HttpUtil.class);


    public static HttpResp httpRequest(String url, String method, Map<String, String> headers, String body) {
        return httpRequest(url, method, headers, body, "UTF-8");
    }


    public static HttpResp httpRequest(String url, String method, Map<String, String> headers, String body, String decodeCoding) {
        HttpURLConnection connection = null;
        BufferedReader reader = null;
        StringBuffer result = new StringBuffer("");
        HttpResp resp = new HttpResp();
        try {
            URL postUrl = new URL(url);
            connection = (HttpURLConnection) postUrl.openConnection();
            connection.setDoOutput(true);
            connection.setDoInput(true);
            connection.setRequestMethod(method);
            connection.setUseCaches(false);
            connection.setInstanceFollowRedirects(true);
            if (headers != null && headers.size() != 0) {
                for (Entry<String, String> entry : headers.entrySet()) {
                    connection.addRequestProperty(entry.getKey(), entry.getValue());
                }
            }
            connection.connect();
            if (body != null && !body.equals("")) {
                OutputStream os = connection.getOutputStream();
                try {
                    os.write(body.getBytes("UTF-8"));
                } catch (Exception e) {
                    logger.error("[ConferenceEsb.httpRequest] error", e);
                } finally {
                    if (os != null) {
                        os.flush();
                        os.close();
                    }
                }
            }
            reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), decodeCoding));
            String line = "";
            while ((line = reader.readLine()) != null) {
                result.append(line);
            }

            resp.setResponseCode(connection.getResponseCode());
            resp.setBody(result.toString());
            resp.setHeaders(connection.getHeaderFields());
        } catch (Exception e) {
            logger.error("[ConferenceEsb.httpRequest] error", e);
        } finally {
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                logger.error("[ConferenceEsb.httpRequest] error", e);
            }
            if (connection != null) {
                connection.disconnect();
            }
        }
        return resp;
    }


}


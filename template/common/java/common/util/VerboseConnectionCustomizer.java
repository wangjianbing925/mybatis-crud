package com.{{companyName}}.common.util;

import com.mchange.v2.c3p0.AbstractConnectionCustomizer;

import java.sql.Connection;
import java.sql.Statement;


/**
 * Created by winke on 15/3/22.
 */
public class VerboseConnectionCustomizer extends AbstractConnectionCustomizer
{

    public void onAcquire( Connection c, String pdsIdt ) throws Exception {

//        System.out.println("-------------------------------------------------");
//        System.out.println("Acquired " + c + " [" + pdsIdt + "]");
//        System.out.println("Acquired " + c + " [" + pdsIdt + "]");
//        System.out.println("-------------------------------------------------");

        // override the default transaction isolation of
        // newly acquired Connections

        Statement stat = c.createStatement();
        stat.execute("SET NAMES utf8mb4");
        stat.close();

    }

}

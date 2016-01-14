package com.{{companyName}}.api;



import com.{{companyName}}.persistence.bean.AppUser;
import com.{{companyName}}.persistence.bean.BgUser;

import java.util.HashMap;
import java.util.Optional;


/**
 * Created by yoyo on 2015/10/29.
 */
public class ThreadContext
{

    private static final ThreadLocal<HashMap> threadLocal = ThreadLocal.withInitial(HashMap::new);


    public static long getFrUserId() {
        Optional<AppUser> optional = Optional.ofNullable(getFrUser());
        return optional.map(s -> s.getIntId()).orElse(0L);
    }

    public static AppUser getFrUser() {
        Optional<Object> optional = Optional.ofNullable(threadLocal.get().get("appUser"));
        return optional.map(s -> (AppUser) s).orElse(null);
    }

    public static void setFrUser(AppUser appUser) {
        threadLocal.get().put("appUser", appUser);
    }

    public static int getBgUserId() {
        Optional<BgUser> optional = Optional.ofNullable(getBgUser());
        return optional.map(s -> s.getId()).orElse(0);
    }

    public static BgUser getBgUser() {
        Optional<Object> optional = Optional.ofNullable(threadLocal.get().get("bgUser"));
        return optional.map(s -> (BgUser) s).orElse(null);
    }

    public static void setBgUser(BgUser bgUser) {
        threadLocal.get().put("bgUser", bgUser);
    }

}

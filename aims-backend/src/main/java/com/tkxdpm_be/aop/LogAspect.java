package com.tkxdpm_be.aop;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.Map;


@Component
@Aspect
public class LogAspect {

    private static final Logger log = LogManager.getLogger(LogAspect.class);

    @Autowired
    protected HttpServletRequest httpServletRequest;


    @Pointcut("execution(* com.tkxdpm_be.controllers..*(..)))")
    protected void applicationControllerAllMethod() {
    }

    @Around("(applicationControllerAllMethod()) ")
    public Object logAspectController(ProceedingJoinPoint pjp) throws Throwable {
        long startTime = System.currentTimeMillis();
        String ip = getIPRequest(this.httpServletRequest);
        String headers = header(httpServletRequest);

        Object output;
        output = pjp.proceed();

        long elapsedTime = System.currentTimeMillis() - startTime;

        log.debug("[REQ] ip : {} ; Request uri: {} ;method: {} ;params: {} ;header: {} ",
                ip,
                this.httpServletRequest.getRequestURI(),
                this.httpServletRequest.getMethod(),
                getParams(this.httpServletRequest.getParameterMap()),
                headers);

        log.debug(" >>> Exiting method <<< ,time: {} ms", elapsedTime);

        return output;
    }

    private String header(HttpServletRequest httpServletRequest) {
        StringBuilder sb = new StringBuilder();
        Enumeration<String> x = httpServletRequest.getHeaderNames();
        while (x.hasMoreElements()) {
            String key = x.nextElement();
            sb.append(key).append("=").append(httpServletRequest.getHeader(key)).append(",");
        }
        return sb.toString();
    }


    private String getIPRequest(HttpServletRequest servletRequest) {
        if (servletRequest == null)
            return null;
        String remoteIPAddress;
        remoteIPAddress = servletRequest.getHeader("X-FORWARDED-FOR");
        if (remoteIPAddress == null || "".equals(remoteIPAddress)) {
            remoteIPAddress = servletRequest.getRemoteAddr();
        }

        return remoteIPAddress;
    }

    private String getParams(Map<String, String[]> parameterMap) {
        if (parameterMap == null || parameterMap.isEmpty())
            return "No Params";
        StringBuilder sb = new StringBuilder();
        for (String key : parameterMap.keySet()) {
            sb.append(key).append("=").append(parameterMap.get(key)[0]).append(",");
        }
        return sb.toString();
    }


}

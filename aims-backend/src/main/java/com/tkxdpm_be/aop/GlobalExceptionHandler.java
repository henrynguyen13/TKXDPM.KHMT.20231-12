package com.tkxdpm_be.aop;

import model.BaseResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import utils.ERROR;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private static final Logger LOGGER = LogManager.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<BaseResponse<?>> handleInternalException(Exception ex) {
        try {
            LOGGER.error("Exception ", ex);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new BaseResponse<>(ERROR.SYSTEM_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

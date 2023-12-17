package com.tkxdpm_be.controllers;

import model.BaseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BaseController {

    protected <T> ResponseEntity<BaseResponse<T>> returnSuccess() {
        BaseResponse<T> response = new BaseResponse<>();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    protected <T> ResponseEntity<BaseResponse<T>> returnSuccess(T data) {
        BaseResponse<T> response = new BaseResponse<>();
        response.setData(data);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

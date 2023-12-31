package com.tkxdpm_be.controllers;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.enums.MediaType;
import com.tkxdpm_be.services.MediaService;
import model.BaseResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import utils.ApiException;

@RestController
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequestMapping("/medias")
public class MediaController {
    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping
    public BaseResponse<Page<Media>> findAllMedia(@RequestParam(required = false) String title,
                                                 @RequestParam(required = false) String type,
                                                 @RequestParam Integer pageSize, @RequestParam Integer pageNumber) {
        BaseResponse<Page<Media>> response = new BaseResponse<>();
        response.setData(this.mediaService.findAllMedia(title, type, pageSize, pageNumber));
        return response;
    }

    @GetMapping("/{id}")
    public BaseResponse<Media> findById(@PathVariable(name = "id") Long id) throws ApiException {
        BaseResponse<Media> response = new BaseResponse<>();
        response.setData(this.mediaService.findById(id));
        return response;
    }
}

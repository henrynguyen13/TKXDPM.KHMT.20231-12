package com.tkxdpm_be.controllers;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.enums.MediaType;
import com.tkxdpm_be.services.MediaService;
import model.BaseResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/medias")
public class MediaController {
    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping
    public BaseResponse<Page<Media>> findAllBook(@RequestParam(required = false) String title,
                                                 @RequestParam(required = false) String type,
                                                 @RequestParam Integer pageSize, @RequestParam Integer pageNumber) {
        BaseResponse<Page<Media>> response = new BaseResponse<>();
        response.setData(this.mediaService.findAllMedia(title, type, pageSize, pageNumber));
        return response;
    }

    @GetMapping("/hi")
    public BaseResponse<List<Media>> getAllMedia(@RequestParam(required = false) String title) {
        BaseResponse<List<Media>> response = new BaseResponse<>();
        response.setData(this.mediaService.getAllMedia(title));
        return response;

    }
}

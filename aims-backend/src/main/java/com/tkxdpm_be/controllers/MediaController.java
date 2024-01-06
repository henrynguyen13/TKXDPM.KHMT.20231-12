package com.tkxdpm_be.controllers;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.models.dtos.MediaDto;
import com.tkxdpm_be.services.MediaService;
import model.BaseResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import utils.ApiException;

import java.util.ArrayList;
import java.util.List;

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
                                                  @RequestParam(required = false) Double fromPrice,
                                                  @RequestParam(required = false) Double toPrice,
                                                  @RequestParam(required = false, defaultValue = "asc") String sort,
                                                  @RequestParam Integer pageSize, @RequestParam Integer pageNumber) {
        BaseResponse<Page<Media>> response = new BaseResponse<>();
        response.setData(this.mediaService.findAllMedia(title, type, fromPrice, toPrice, sort, pageSize, pageNumber));
        return response;
    }

    @GetMapping("/{id}")
    public BaseResponse<Media> findById(@PathVariable(name = "id") Long id) throws ApiException {
        BaseResponse<Media> response = new BaseResponse<>();
        response.setData(this.mediaService.findById(id));
        return response;
    }

    @GetMapping(value = "/getAll")
    public List<MediaDto> getAllMediaV2() {
        List<Media> mediaList = mediaService.findAllMediaV2();
        List<MediaDto> mediaDtos = new ArrayList<>();
        for (Media media : mediaList) {
            MediaDto mediaDto = new MediaDto();
            mediaDto.setTitle(media.getTitle());
            mediaDto.setPrice(media.getPrice());
            mediaDto.setImageUrl(media.getImageUrl());
            mediaDtos.add(mediaDto);
        }
        return mediaDtos;
    }
}

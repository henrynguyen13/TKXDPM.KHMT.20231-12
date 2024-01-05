package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.repositories.MediaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import utils.ApiException;
import utils.ERROR;

import java.util.List;
import java.util.Optional;

@Service
public class MediaService {
    private final MediaRepository mediaRepository;

    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public Page<Media> findAllMedia(String title, String type, Double fromPrice, Double toPrice, String sort, Integer pageSize, Integer pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber > 0 ? pageNumber - 1 : 0, pageSize);
        return this.mediaRepository.findAllMedia(title, type, fromPrice, toPrice, sort, pageable);
    }

    public Media findById(Long id) throws ApiException {
        Optional<Media> oMedia = this.mediaRepository.findById(id);
        if (oMedia.isEmpty()) {
            throw new ApiException(ERROR.RESOURCE_NOT_FOUND);
        }
        return oMedia.get();
    }

    public List<Media> findAllMediaV2() {
        return mediaRepository.findAll();
    }
}

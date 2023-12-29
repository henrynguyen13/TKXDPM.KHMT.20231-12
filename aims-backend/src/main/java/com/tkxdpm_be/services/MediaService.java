package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.repositories.MediaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MediaService {
    private final MediaRepository mediaRepository;

    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    public Page<Media> findAllMedia(String title, String type, Integer pageSize, Integer pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber > 0 ? pageNumber - 1 : 0, pageSize);
        return this.mediaRepository.findAllMedia(title, type, pageable);
    }
}

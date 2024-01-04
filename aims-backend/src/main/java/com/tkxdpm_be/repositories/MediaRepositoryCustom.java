package com.tkxdpm_be.repositories;

import com.tkxdpm_be.entities.Media;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MediaRepositoryCustom {
    Page<Media> findAllMedia(String title, String type, Double fromPrice, Double toPrice, String sort, Pageable pageable);
}

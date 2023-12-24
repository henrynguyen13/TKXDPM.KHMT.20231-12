package com.tkxdpm_be.repositories;

import com.tkxdpm_be.entities.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long>, JpaSpecificationExecutor<Media>, MediaRepositoryCustom {
}

package com.tkxdpm_be.repositories;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long>, JpaSpecificationExecutor<Media>, MediaRepositoryCustom
{
@Query(value = "select m.* from medias m where (:title is null or m.title = :title)", nativeQuery = true)
List<Media> getAllMedia(String title);
Media findById(long id);

}

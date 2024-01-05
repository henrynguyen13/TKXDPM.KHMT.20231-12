package com.tkxdpm_be.repositories.impls;

import com.tkxdpm_be.entities.Media;
import com.tkxdpm_be.repositories.MediaRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class MediaRepositoryImpl implements MediaRepositoryCustom {
    @PersistenceContext
    EntityManager entityManager;


    @Override
    public Page<Media> findAllMedia(String title, String type, Double fromPrice, Double toPrice, String sort, Pageable pageable) {
        StringBuilder jpql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();

        jpql.append(" select m.* from medias m ");
        jpql.append(" where 1 = 1 ");
        jpql.append(" and m.price >= :fromPrice and m.price <= :toPrice ");
        if (Objects.nonNull(title)) {
            jpql.append(" and m.title like :title ");
            params.put("title", "%" + title + "%");
        }
        if (Objects.nonNull(type)) {
            jpql.append(" and m.type = :type ");
            params.put("type", type);
        }
        if (Objects.nonNull(fromPrice)) {
            params.put("fromPrice", fromPrice);
        } else {
            params.put("fromPrice", 0.00);
        }
        if (Objects.nonNull(toPrice)) {
            params.put("toPrice", toPrice);
        } else {
            params.put("toPrice", 999999999.00);
        }
        if (sort.equals("desc")) {
            jpql.append(" order by m.price desc ");
        }
        if (sort.equals("asc")) {
            jpql.append(" order by m.price asc ");
        }
        Query selectQuery = entityManager.createNativeQuery(jpql.toString(), Media.class);
        if (!params.isEmpty()) {
            params.forEach(selectQuery::setParameter);
        }
        Query countQuery = entityManager.createNativeQuery("select count(*) from (" + jpql + ") a");
        params.forEach(countQuery::setParameter);
        int total = ((Number) countQuery.getSingleResult()).intValue();

        if (Objects.nonNull(pageable)) {
            int page = pageable.getPageNumber();
            int size = pageable.getPageSize();
            selectQuery.setFirstResult(page * size);
            selectQuery.setMaxResults(size);
        }
        List<Media> result = selectQuery.getResultList();
        return new PageImpl<>(result, pageable, total);
    }
}

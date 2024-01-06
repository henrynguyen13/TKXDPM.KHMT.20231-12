package com.tkxdpm_be.repositories.impls;

import com.tkxdpm_be.models.dtos.CartItemDto;
import com.tkxdpm_be.models.dtos.OrderItemDto;
import com.tkxdpm_be.repositories.CartItemRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CartItemRepositoryImpl implements CartItemRepositoryCustom {
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<OrderItemDto> getAllMediaInCart(Long orderId) {
        StringBuilder jpql = new StringBuilder();
        Map<String, Object> params = new HashMap<>();

        jpql.append(" select ci.*, m.*, m.id as media_id from order_items ci ");
        jpql.append(" join medias m on m.id = ci.media_id ");
        jpql.append(" where ci.order_id = :orderId ");
        params.put("orderId", orderId);

        Query selectQuery = entityManager.createNativeQuery(jpql.toString(), "OrderItemDto");
        params.forEach(selectQuery::setParameter);
        List<OrderItemDto> result = selectQuery.getResultList();
        return result;
    }
}

package com.tkxdpm_be.repositories;

import com.tkxdpm_be.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long>, JpaSpecificationExecutor<OrderItem> {
    List<OrderItem> findAllByOrderId(Long orderId);

    @Modifying
    @Transactional
    void deleteByOrderId(Long orderId);

    List<OrderItem> findByOrderId(Long orderId);
}

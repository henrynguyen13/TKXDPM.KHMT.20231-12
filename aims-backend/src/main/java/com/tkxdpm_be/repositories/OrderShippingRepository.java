package com.tkxdpm_be.repositories;

import com.tkxdpm_be.entities.OrderShipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderShippingRepository extends JpaRepository<OrderShipping, Long>, JpaSpecificationExecutor<OrderShipping> {
}

package com.tkxdpm_be.repositories;

import com.tkxdpm_be.entities.OrderShipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface OrderShippingRepository extends JpaRepository<OrderShipping, Long>, JpaSpecificationExecutor<OrderShipping> {
}

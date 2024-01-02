package com.tkxdpm_be.repositories;

import com.tkxdpm_be.entities.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long>, JpaSpecificationExecutor<CartItem>, CartItemRepositoryCustom {
    List<CartItem> findByUserId(Long userId);

    Optional<CartItem> findByUserIdAndAndMediaId(Long userId, Long mediaId);
}

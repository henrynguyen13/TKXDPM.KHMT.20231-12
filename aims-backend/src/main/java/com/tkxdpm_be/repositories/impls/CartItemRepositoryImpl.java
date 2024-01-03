package com.tkxdpm_be.repositories.impls;

import com.tkxdpm_be.models.dtos.CartItemDto;
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
}

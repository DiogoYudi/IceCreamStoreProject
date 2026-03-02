package com.icecreamstore.system_icecreamstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icecreamstore.system_icecreamstore.entity.StockTypeEntity;

@Repository
public interface StockTypeRepository extends JpaRepository<StockTypeEntity, Long> {
}

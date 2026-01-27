package com.icecreamstore.system_icecreamstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icecreamstore.system_icecreamstore.entity.StockEntity;

@Repository
public interface StockRepository extends JpaRepository<StockEntity, Long> {
}

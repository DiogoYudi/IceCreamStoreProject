package com.icecreamstore.system_icecreamstore.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.icecreamstore.system_icecreamstore.entity.StockTypeEntity;
import com.icecreamstore.system_icecreamstore.model.StockType;
import com.icecreamstore.system_icecreamstore.repository.StockTypeRepository;

@Service
public class StockTypeServiceImpl implements StockTypeService {
    private StockTypeRepository stockTypeRepository;

    public StockTypeServiceImpl(StockTypeRepository stockTypeRepository){
        this.stockTypeRepository = stockTypeRepository;
    }

    @Override
    public StockType addType(StockType stockType){
        StockTypeEntity stockTypeEntity = new StockTypeEntity();
        BeanUtils.copyProperties(stockType, stockTypeEntity);
        stockTypeRepository.save(stockTypeEntity);
        return stockType;
    }

    @Override
    public List<StockType> getAllStockType(){
        List<StockTypeEntity> stockTypeEntities = stockTypeRepository.findAll();
        List<StockType> stockType = stockTypeEntities.stream().map(s -> new StockType(
            s.getId(),
            s.getName(),
            s.isDisabled()
        )).collect(Collectors.toList());
        return stockType;
    }
}

package com.icecreamstore.system_icecreamstore.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.icecreamstore.system_icecreamstore.entity.StockEntity;
import com.icecreamstore.system_icecreamstore.model.Stock;
import com.icecreamstore.system_icecreamstore.repository.StockRepository;

@Service
public class StockServiceImpl implements StockService {
    private StockRepository stockRepository;

    public StockServiceImpl(StockRepository stockRepository){
        this.stockRepository = stockRepository;
    }

    @Override
    public Stock addStock(Stock stock) {
        StockEntity stockEntity = new StockEntity();
        BeanUtils.copyProperties(stock, stockEntity);
        stockRepository.save(stockEntity);
        return stock;
    }

    @Override
    public List<Stock> getAllStocks() {
        List<StockEntity> stockEntities = stockRepository.findAll();
        List<Stock> stocks = stockEntities.stream().map(s -> new Stock(
            s.getId(),
            s.getType(),
            s.getFlavour(),
            s.getQuantity()
        )).collect(Collectors.toList());
        return stocks;
    }

    @Override
    public Stock updateStock(Long id, Stock stock) {
        StockEntity stockEntity = stockRepository.findById(id).get();
        stockEntity.setType(stock.getType());
        stockEntity.setFlavour(stock.getFlavour());
        stockEntity.setQuantity(stock.getQuantity());
        stockRepository.save(stockEntity);
        return stock;
    }

    @Override
    public boolean deleteStock(Long id) {
        Optional<StockEntity> stockOptional = stockRepository.findById(id);
        if(stockOptional.isPresent()){
            stockRepository.delete(stockOptional.get());
            return true;
        }
        return false;
    }
    
}

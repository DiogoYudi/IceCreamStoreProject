package com.icecreamstore.system_icecreamstore.service;

import java.util.List;

import com.icecreamstore.system_icecreamstore.model.Stock;

public interface StockService {

    Stock addStock(Stock stock);

    List<Stock> getAllStocks();

    Stock updateStock(Long id, Stock stock);

    boolean deleteStock(Long id);

}

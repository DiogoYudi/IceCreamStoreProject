package com.icecreamstore.system_icecreamstore.service;

import java.util.List;

import com.icecreamstore.system_icecreamstore.model.StockType;

public interface StockTypeService {

    StockType addType(StockType stockType);

    List<StockType> getAllStockType();

}

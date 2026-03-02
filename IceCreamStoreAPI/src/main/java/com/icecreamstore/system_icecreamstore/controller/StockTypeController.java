package com.icecreamstore.system_icecreamstore.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.icecreamstore.system_icecreamstore.model.StockType;
import com.icecreamstore.system_icecreamstore.service.StockTypeService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1")
public class StockTypeController {
    @Autowired
    private StockTypeService stockTypeService;

    public StockTypeController(StockTypeService stockTypeService){
        this.stockTypeService = stockTypeService;
    }

    @PostMapping("/stocktype")
    public StockType addType(@RequestBody StockType stockType){
        return stockTypeService.addType(stockType);
    }

    @GetMapping("/stocktype")
    public List<StockType> getAllStockType(){
        return stockTypeService.getAllStockType();
    }
}

package com.icecreamstore.system_icecreamstore.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockType {
    private Long id;
    private String name;
    private boolean isDisabled;
}

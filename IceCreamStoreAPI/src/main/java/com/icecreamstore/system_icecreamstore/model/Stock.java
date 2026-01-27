package com.icecreamstore.system_icecreamstore.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Stock {
    private Long id;
    private String type;
    private String flavour;
    private Long quantity;
}

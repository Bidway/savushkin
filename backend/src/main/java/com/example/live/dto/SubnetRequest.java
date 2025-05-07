package com.example.live.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubnetRequest {
    private String name;
    private Long siteId;  // Принимаем просто ID сайта
}
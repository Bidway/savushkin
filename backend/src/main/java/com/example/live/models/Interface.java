package com.example.live.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "interfaces")
public class Interfaces {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}

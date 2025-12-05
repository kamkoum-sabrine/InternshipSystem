package com.example.Back;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableAutoConfiguration
@EntityScan(basePackages = "com.example.Back")
@EnableJpaRepositories(basePackages = {
        "com.example.Back.Auth.Repositories"
})
public class TestConfig {


}
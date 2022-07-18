package com.example.app.controller;

import com.example.app.entity.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private List<Customer> customers;

    public CustomerController() {
        this.customers = new ArrayList<>();
    }

    @GetMapping
    public List<Customer> getCustomers() {
        return this.customers;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Customer save(@RequestBody @Valid Customer customer){
        Customer customerToSave  = new Customer(UUID.randomUUID().toString(), customer.getName());
        this.customers.add(customerToSave);
        return customerToSave;
    }
}

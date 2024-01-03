package com.tkxdpm_be.controllers;

import com.tkxdpm_be.entities.Invoice;
import com.tkxdpm_be.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequestMapping("/invoice")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @GetMapping("/getAll")
    public List<Invoice> getAll(){
        return invoiceService.getAll();
    }

    @GetMapping("/{id}")
    public Invoice getById(@PathVariable long id){
        return invoiceService.getById(id);
    }
}

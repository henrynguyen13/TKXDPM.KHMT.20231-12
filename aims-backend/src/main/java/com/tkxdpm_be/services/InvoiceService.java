package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.Invoice;
import com.tkxdpm_be.repositories.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService implements IInvoiceService{
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    public List<Invoice> getAll() {
        return invoiceRepository.findAll();
    }

    @Override
    public Invoice getById(long id) {
        return invoiceRepository.findById(id).get();
    }
}

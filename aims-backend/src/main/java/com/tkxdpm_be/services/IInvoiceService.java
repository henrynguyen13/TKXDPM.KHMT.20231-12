package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.Invoice;

import java.util.List;

public interface IInvoiceService {
    List<Invoice>getAll();

    Invoice getById(long id);
}

package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.Invoice;
import com.tkxdpm_be.models.dtos.InvoiceResponse;

import java.util.List;

public interface IInvoiceService {
//    List<Invoice>getAll();
//
//    Invoice getById(long id);

    InvoiceResponse invoice(long id);
}

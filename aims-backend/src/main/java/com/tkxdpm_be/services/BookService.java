package com.tkxdpm_be.services;

import com.tkxdpm_be.entities.Book;
import com.tkxdpm_be.repositories.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAllBook() {
        return this.bookRepository.findAll();
    }
}

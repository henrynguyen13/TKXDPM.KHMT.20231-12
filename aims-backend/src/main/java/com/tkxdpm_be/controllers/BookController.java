package com.tkxdpm_be.controllers;

import com.tkxdpm_be.entities.Book;
import com.tkxdpm_be.services.BookService;
import model.BaseResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public BaseResponse<List<Book>> findAllBook() {
        BaseResponse<List<Book>> response = new BaseResponse<>();
        response.setData(this.bookService.findAllBook());
        return response;
    }
}

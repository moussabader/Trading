package tn.esprit.similator.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.similator.service.StockQuoteService;

import java.util.Map;

@RestController
@RequestMapping("/api/quote")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class StockQuoteController {

    private final StockQuoteService stockQuoteService;

    @GetMapping("/get/{symbol}")
    public Map<String, Object> getStockQuote(@PathVariable String symbol) {
        return stockQuoteService.getStockQuote(symbol);
    }
}

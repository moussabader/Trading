package tn.esprit.similator.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;
import java.util.Map;
@Service
public class StockQuoteService {

    @Value("${alphavantage.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey={apikey}";

    public Map<String, Object> getStockQuote(String symbol) {
        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL.replace("{symbol}", symbol).replace("{apikey}", apiKey);

        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

        return response.getBody();
    }

}

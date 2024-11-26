package tn.esprit.similator.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PlacingOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String symbol;
    Double qty;
    Double Price;
    Date date;
    String note;
    String param; //$ ou %
    Double duration;// daily or untill cancelled
    @Enumerated(EnumType.STRING)
    tradeType tradeType; // Stocks,OPTIONS,Bonds,Commodities,Forex,Mutual_Funds,ETF
    @Enumerated(EnumType.STRING)
    orderType orderType; // Market, Limit, Stop_Limit, Trailing_Stop
    @Enumerated(EnumType.STRING)
    transacType transacType; // BUY, SELL, SHORT, COVER , call, put
    @Enumerated(EnumType.STRING)
    Status status;// OPEN, FILLED, CANCELLED

    @OneToMany(mappedBy = "placingOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    List<Transaction> transactions;

}

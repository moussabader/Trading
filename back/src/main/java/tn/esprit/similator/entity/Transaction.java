package tn.esprit.similator.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String symbol;
    Double price;
    Double quantity;
    Date date;
    Double totalAmount; // (price * quantity)
    String descp;//describes the nature of the transaction
    Double commiss;
    Double dividende;

    @ManyToOne
    @JsonIgnore
    Portfolio portfolio;
    @ManyToOne
    PlacingOrder placingOrder;
}


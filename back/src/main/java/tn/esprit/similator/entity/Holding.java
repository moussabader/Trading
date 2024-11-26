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
public class Holding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String symbol;
    String name;
    Double qty;  // Number of shares/units owned
    Float avgPrice;   // Average purchase price per share/unit
    Float curntPrice;  // Current market price per share/unit
    Float mktVal;   //  currentPrice * qty
    Date acquisitionDate;// acquired date

    @ManyToOne
    @JsonIgnore
    Portfolio portfolio;
}

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
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    Double totVal;
    Date dateCreated;
    Double accVal =99000.000;
    Double buyPow;
    Double cash;
    Double tdyChange;  // Gains/losses as a result of today's market activity
    Double annReturn;  // Percentage return extrapolated for a year
    Double totGainLoss; // Total gain/loss percentage

    @OneToOne(mappedBy = "portfolio")
    @JsonIgnore
    User user;
    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Transaction> transactions;
    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<Holding> holdings;
}


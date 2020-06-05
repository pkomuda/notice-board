package pl.lodz.p.it.wzas.notice;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Klasa reprezentująca obiekt Ogłoszenia
 */
@Document(collection = "notices")
public @Data class Notice {

    @Id
    private String id;
    private String title;
    private String description;
    private String publisher;
    private int phoneNumber;
    private Date added;
}

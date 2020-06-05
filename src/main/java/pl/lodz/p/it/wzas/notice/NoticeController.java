package pl.lodz.p.it.wzas.notice;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Klasa udostępniająca punkty końcowe
 */
@CrossOrigin
@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class NoticeController {

    private final NoticeRepository noticeRepo;

    /**
     * Dodawanie ogłoszenia
     *
     * @param notice ogłoszenie
     * @return obiekt ResponseEntity
     */
    @PostMapping("/notice")
    public ResponseEntity<String> addNotice(@RequestBody Notice notice) {
        noticeRepo.insert(notice);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Notice added successfully.");
    }

    /**
     * Dodawanie wielu ogłoszeń
     *
     * @param notices ogłoszenia
     * @return obiekt ResponseEntity
     */
    @PostMapping("/notices")
    public ResponseEntity<String> addManyNotices(@RequestBody List<Notice> notices) {
        noticeRepo.insert(notices);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Notices added successfully.");
    }

    /**
     * Pobieranie ogłoszenia
     *
     * @param id identyfikator ogłoszenia
     * @return obiekt ogłoszenia
     */
    @GetMapping("/notice/{id}")
    public ResponseEntity<?> getNotice(@PathVariable String id) {
        if (noticeRepo.findById(id).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(noticeRepo.findById(id).get());
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Notice not found.");
        }
    }

    /**
     * Pobieranie wszystkich ogłoszeń
     *
     * @return wszystkie ogłoszenia
     */
    @GetMapping("/notices")
    public ResponseEntity<List<Notice>> getAllNotices() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(noticeRepo.findAll());
    }

    /**
     * Usuwanie wszystkich ogłoszeń
     *
     * @return obiekt ResponseEntity
     */
    @DeleteMapping("/notices")
    public ResponseEntity<String> deleteAllNotices() {
        noticeRepo.deleteAll();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Notices deleted successfully.");
    }
}

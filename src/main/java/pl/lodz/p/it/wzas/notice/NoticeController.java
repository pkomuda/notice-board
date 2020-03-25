package pl.lodz.p.it.wzas.notice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class NoticeController {

    private NoticeRepository noticeRepo;

    @Autowired
    public NoticeController(NoticeRepository noticeRepo) {
        this.noticeRepo = noticeRepo;
    }

    @PostMapping("/api/notice")
    public ResponseEntity<String> addNotice(@RequestBody Notice notice) {
        noticeRepo.insert(notice);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Notice added successfully.");
    }

    @PostMapping("/api/notices")
    public ResponseEntity<String> addManyNotices(@RequestBody List<Notice> notices) {
        noticeRepo.insert(notices);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Notices added successfully.");
    }

    @GetMapping("/api/notice/{id}")
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

    @GetMapping("/api/notices")
    public ResponseEntity<List<Notice>> getAllNotices() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(noticeRepo.findAll());
    }
}

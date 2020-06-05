package pl.lodz.p.it.wzas.notice;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Interfejs rozszerzający interfejs MongoRepository
 */
@Repository
public interface NoticeRepository extends MongoRepository<Notice, String> {

}

package com.example.SoftwareEngineeringProject.service;


import com.example.SoftwareEngineeringProject.entity.Notice;
import com.example.SoftwareEngineeringProject.entity.Tutor;
import com.example.SoftwareEngineeringProject.repository.NoticeRepository;
import com.example.SoftwareEngineeringProject.exception.IdNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoticeService {


    private final NoticeRepository noticeRepository;
    private final TutorService tutorService;

    private final CriteriaApiQueryService queryRepository;

    public NoticeService(NoticeRepository noticeRepository, TutorService tutorService, CriteriaApiQueryService queryRepository) {
        this.noticeRepository = noticeRepository;
        this.tutorService = tutorService;
        this.queryRepository = queryRepository;
    }

    public List<Notice> getAllNotice() {
        return noticeRepository.findAll();
    }


    public Notice findById(int noticeId) throws IdNotFoundException {
        return noticeRepository.findById(noticeId).orElseThrow(() -> new IdNotFoundException("Id Not Found Notice" + noticeId));
    }

    public Notice createNotice(Notice notice, int tutorId) throws IdNotFoundException {
        Tutor tutor = tutorService.findById(tutorId);
        notice.setTutor(tutor);
        return noticeRepository.save(notice);
    }

    public Notice updateNotice(int noticeId, Notice notice) throws IdNotFoundException {
        Optional<Notice> savedNotice = noticeRepository.findById(noticeId);

        if (savedNotice.isPresent()) {
            Notice tempNotice = savedNotice.get();
            tempNotice.setTitle(notice.getTitle());
            tempNotice.setPrice(notice.getPrice());
            tempNotice.setDescription(notice.getDescription());

            noticeRepository.save(tempNotice);

            return tempNotice;
        } else {
            throw new IdNotFoundException("Id Not Found Notice : " + noticeId);
        }

    }


    public void deleteNotice(int noticeId) throws IdNotFoundException {
        Notice notice = noticeRepository.findById(noticeId).orElseThrow(() -> new IdNotFoundException("Id Not Found Notice : " + noticeId));
        noticeRepository.deleteById(notice.getId());
    }


    public List<Notice> findByParameters(String city, String gender, String subject) {
        return queryRepository.findByParameters(city, gender, subject);
    }


    public List<Notice> findByRange(Double minPrice, Double maxPrice) {
        return noticeRepository.findByPriceRange(minPrice, maxPrice);
    }


    public List<Notice> findNoticeByTutorId(int tutorId) {
        return noticeRepository.findNoticeByTutorId(tutorId);
    }


}

package com.example.SoftwareEngineeringProject.service;

import com.example.SoftwareEngineeringProject.entity.Notice;
import com.example.SoftwareEngineeringProject.entity.Tutor;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CriteriaApiQueryService {


        @PersistenceContext
        private EntityManager entityManager;
        private Notice notice;

    public List<Notice> findByParameters(String city, String gender, String subject) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Notice> cq = cb.createQuery(Notice.class).distinct(true);
        Root<Notice> noticeRoot = cq.from(Notice.class);


        // Tutor sınıfının özelliklerine erişmek için birleştirme işlemi yapılır
        Join<Notice, Tutor> tutorJoin = noticeRoot.join("tutor");


        List<Predicate> predicates = new ArrayList<>();

        if (gender != null) {
            predicates.add(cb.like(tutorJoin.get("gender"), "%" + gender + "%"));
        }

        if (city != null) {
            predicates.add(cb.like(tutorJoin.get("city"), "%" + city + "%"));
        }

        if (subject != null) {
            predicates.add(cb.like(tutorJoin.get("subject"), "%" + subject + "%"));
        }

        cq.where(predicates.toArray(new Predicate[0]));

        TypedQuery<Notice> query = entityManager.createQuery(cq);

        return query.getResultList();
    }



}

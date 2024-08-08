package com.example.SoftwareEngineeringProject.repository;

import com.example.SoftwareEngineeringProject.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice,Integer>, JpaSpecificationExecutor<Notice> {



        @Query("SELECT n FROM Notice n WHERE n.price BETWEEN :minPrice AND :maxPrice")
        List<Notice> findByPriceRange(Double minPrice,double maxPrice);

        List<Notice> findNoticeByTutorId(int tutorId);

        void deleteByTutorId(int tutorId);

}

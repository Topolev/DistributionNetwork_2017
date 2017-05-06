package com.distributionnetwork.app.repository;

import com.distributionnetwork.app.domain.SubCategory;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the SubCategory entity.
 */
@SuppressWarnings("unused")
public interface SubCategoryRepository extends JpaRepository<SubCategory,Long> {

    @Query("select distinct subCategory from SubCategory subCategory left join fetch subCategory.publications")
    List<SubCategory> findAllWithEagerRelationships();

    @Query("select subCategory from SubCategory subCategory left join fetch subCategory.publications where subCategory.id =:id")
    SubCategory findOneWithEagerRelationships(@Param("id") Long id);

}

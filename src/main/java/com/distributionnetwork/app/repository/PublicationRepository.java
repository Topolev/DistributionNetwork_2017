package com.distributionnetwork.app.repository;

import com.distributionnetwork.app.domain.Publication;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Publication entity.
 */
@SuppressWarnings("unused")
public interface PublicationRepository extends JpaRepository<Publication,Long> {

    @Query("select distinct publication from Publication publication left join fetch publication.labels")
    List<Publication> findAllWithEagerRelationships();

    @Query("select publication from Publication publication left join fetch publication.labels where publication.id =:id")
    Publication findOneWithEagerRelationships(@Param("id") Long id);

}

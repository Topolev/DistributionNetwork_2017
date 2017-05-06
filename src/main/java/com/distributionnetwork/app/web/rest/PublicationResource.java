package com.distributionnetwork.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.distributionnetwork.app.domain.Publication;

import com.distributionnetwork.app.repository.PublicationRepository;
import com.distributionnetwork.app.repository.search.PublicationSearchRepository;
import com.distributionnetwork.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Publication.
 */
@RestController
@RequestMapping("/api")
public class PublicationResource {

    private final Logger log = LoggerFactory.getLogger(PublicationResource.class);

    private static final String ENTITY_NAME = "publication";

    private final PublicationRepository publicationRepository;

    private final PublicationSearchRepository publicationSearchRepository;

    public PublicationResource(PublicationRepository publicationRepository, PublicationSearchRepository publicationSearchRepository) {
        this.publicationRepository = publicationRepository;
        this.publicationSearchRepository = publicationSearchRepository;
    }

    /**
     * POST  /publications : Create a new publication.
     *
     * @param publication the publication to create
     * @return the ResponseEntity with status 201 (Created) and with body the new publication, or with status 400 (Bad Request) if the publication has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/publications")
    @Timed
    public ResponseEntity<Publication> createPublication(@Valid @RequestBody Publication publication) throws URISyntaxException {
        log.debug("REST request to save Publication : {}", publication);
        if (publication.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new publication cannot already have an ID")).body(null);
        }
        Publication result = publicationRepository.save(publication);
        publicationSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/publications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /publications : Updates an existing publication.
     *
     * @param publication the publication to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated publication,
     * or with status 400 (Bad Request) if the publication is not valid,
     * or with status 500 (Internal Server Error) if the publication couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/publications")
    @Timed
    public ResponseEntity<Publication> updatePublication(@Valid @RequestBody Publication publication) throws URISyntaxException {
        log.debug("REST request to update Publication : {}", publication);
        if (publication.getId() == null) {
            return createPublication(publication);
        }
        Publication result = publicationRepository.save(publication);
        publicationSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, publication.getId().toString()))
            .body(result);
    }

    /**
     * GET  /publications : get all the publications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of publications in body
     */
    @GetMapping("/publications")
    @Timed
    public List<Publication> getAllPublications() {
        log.debug("REST request to get all Publications");
        List<Publication> publications = publicationRepository.findAllWithEagerRelationships();
        return publications;
    }

    /**
     * GET  /publications/:id : get the "id" publication.
     *
     * @param id the id of the publication to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the publication, or with status 404 (Not Found)
     */
    @GetMapping("/publications/{id}")
    @Timed
    public ResponseEntity<Publication> getPublication(@PathVariable Long id) {
        log.debug("REST request to get Publication : {}", id);
        Publication publication = publicationRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(publication));
    }

    /**
     * DELETE  /publications/:id : delete the "id" publication.
     *
     * @param id the id of the publication to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/publications/{id}")
    @Timed
    public ResponseEntity<Void> deletePublication(@PathVariable Long id) {
        log.debug("REST request to delete Publication : {}", id);
        publicationRepository.delete(id);
        publicationSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/publications?query=:query : search for the publication corresponding
     * to the query.
     *
     * @param query the query of the publication search
     * @return the result of the search
     */
    @GetMapping("/_search/publications")
    @Timed
    public List<Publication> searchPublications(@RequestParam String query) {
        log.debug("REST request to search Publications for query {}", query);
        return StreamSupport
            .stream(publicationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}

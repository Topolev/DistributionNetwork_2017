package com.distributionnetwork.app.repository.search;

import com.distributionnetwork.app.domain.Publication;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Publication entity.
 */
public interface PublicationSearchRepository extends ElasticsearchRepository<Publication, Long> {
}

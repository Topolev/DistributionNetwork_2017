package com.distributionnetwork.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Publication.
 */
@Entity
@Table(name = "publication")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "publication")
public class Publication implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "created_date")
    private ZonedDateTime createdDate;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "publication_labels",
               joinColumns = @JoinColumn(name="publications_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="labels_id", referencedColumnName="id"))
    private Set<Label> labels = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToMany(mappedBy = "publications")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SubCategory> subCategories = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Publication name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getText() {
        return text;
    }

    public Publication text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public Publication createdDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public Set<Label> getLabels() {
        return labels;
    }

    public Publication labels(Set<Label> labels) {
        this.labels = labels;
        return this;
    }

    public Publication addLabels(Label label) {
        this.labels.add(label);
        label.getPublications().add(this);
        return this;
    }

    public Publication removeLabels(Label label) {
        this.labels.remove(label);
        label.getPublications().remove(this);
        return this;
    }

    public void setLabels(Set<Label> labels) {
        this.labels = labels;
    }

    public User getUser() {
        return user;
    }

    public Publication user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<SubCategory> getSubCategories() {
        return subCategories;
    }

    public Publication subCategories(Set<SubCategory> subCategories) {
        this.subCategories = subCategories;
        return this;
    }

    public Publication addSubCategories(SubCategory subCategory) {
        this.subCategories.add(subCategory);
        subCategory.getPublications().add(this);
        return this;
    }

    public Publication removeSubCategories(SubCategory subCategory) {
        this.subCategories.remove(subCategory);
        subCategory.getPublications().remove(this);
        return this;
    }

    public void setSubCategories(Set<SubCategory> subCategories) {
        this.subCategories = subCategories;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Publication publication = (Publication) o;
        if (publication.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, publication.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Publication{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", text='" + text + "'" +
            ", createdDate='" + createdDate + "'" +
            '}';
    }
}

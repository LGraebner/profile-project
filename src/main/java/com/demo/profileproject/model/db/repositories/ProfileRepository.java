package com.demo.profileproject.model.db.repositories;

import com.demo.profileproject.model.db.entities.Profile;
import org.springframework.data.repository.CrudRepository;

public interface ProfileRepository extends CrudRepository<Profile, Long> {

}

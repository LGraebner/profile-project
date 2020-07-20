package com.demo.profileproject.model.services;

import com.demo.profileproject.model.db.entities.Profile;
import com.demo.profileproject.model.db.repositories.ProfileRepository;
import com.demo.profileproject.model.dto.ProfileDto;
import com.google.common.collect.Streams;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
public class ProfileService {

  @Autowired private ProfileRepository profileRepository;

  @Autowired private ModelMapper modelMapper;

  public List<ProfileDto> getProfiles() {
    log.info("Fetching all profiles");
    return Streams.stream(profileRepository.findAll())
        .map(profile -> modelMapper.map(profile, ProfileDto.class))
        .collect(Collectors.toList());
  }

  public ProfileDto createProfile(ProfileDto profileDto) {
    log.info("Creating profile={}", profileDto);
    Profile profile = profileRepository.save(modelMapper.map(profileDto, Profile.class));
    return modelMapper.map(profile, ProfileDto.class);
  }

  public ProfileDto getProfileById(Long id) {
    log.info("Fetching profile with id={}", id);
    Profile profile =
        profileRepository
            .findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));
    return modelMapper.map(profile, ProfileDto.class);
  }

  public ProfileDto updateProfile(Long id, ProfileDto profileDto) {
    log.info("Updating profile with id={}, data={}", id, profileDto);
    Profile profile =
        profileRepository
            .findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));

    modelMapper.map(profileDto, profile);
    profileRepository.save(profile);

    return modelMapper.map(profile, ProfileDto.class);
  }

  public void deleteProfileById(Long id) {
    log.info("Deleting profile with id={}", id);
    profileRepository.deleteById(id);
  }

  public void updateImageName(Long id, String imageName) {
    log.info("Updating imageName for profileId {} to {}", id, imageName);
    Profile profile = profileRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile does not exist: " + id));
    profile.setImageName(imageName);
    profileRepository.save(profile);
  }
}

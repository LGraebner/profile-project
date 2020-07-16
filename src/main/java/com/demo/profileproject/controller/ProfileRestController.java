package com.demo.profileproject.controller;

import com.demo.profileproject.model.db.entities.Profile;
import com.demo.profileproject.model.db.repositories.ProfileRepository;
import com.demo.profileproject.model.dto.ProfileDto;
import com.demo.profileproject.model.services.ProfileService;
import com.google.common.collect.Streams;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("profiles")
@Slf4j
public class ProfileRestController {

  @Autowired
  ProfileService profileService;

  @GetMapping
  @ResponseBody
  @ResponseStatus(HttpStatus.OK)
  public List<ProfileDto> getProfiles()
  {
    return profileService.getProfiles();
  }

  @GetMapping("/{id}")
  @ResponseBody
  @ResponseStatus(HttpStatus.OK)
  public ProfileDto getProfile(@PathVariable Long id) {
    return profileService.getProfileById(id);
  }

  @PostMapping
  @ResponseBody
  @ResponseStatus(HttpStatus.CREATED)
  public ProfileDto createProfile(@RequestBody @Valid ProfileDto profileDto) {
    return profileService.createProfile(profileDto);
  }

  @PutMapping("/{id}")
  @ResponseBody
  @ResponseStatus(HttpStatus.OK)
  public ProfileDto updateProfile(@PathVariable Long id, @RequestBody @Valid ProfileDto profileDto) {
    return profileService.updateProfile(id, profileDto);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteProfile(@PathVariable Long id) {
    profileService.deleteProfileById(id);
  }
}

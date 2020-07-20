package com.demo.profileproject;

import static junit.framework.TestCase.assertEquals;
import static org.mockito.Mockito.when;

import com.demo.profileproject.model.db.entities.Profile;
import com.demo.profileproject.model.db.repositories.ProfileRepository;
import com.demo.profileproject.model.dto.ProfileDto;
import com.demo.profileproject.model.services.ProfileService;
import java.util.ArrayList;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import org.modelmapper.ModelMapper;

@RunWith(MockitoJUnitRunner.class)
public class ProfileServiceMockTest {

  @Mock
  ProfileRepository profileRepository;

  @Spy
  ModelMapper modelMapper;

  @InjectMocks
  ProfileService profileService;

  @Before
  public void init() {
    List<Profile> profileList = new ArrayList<>();
    Profile profile1 = new Profile();
    profile1.setId(1L);
    profile1.setName("John Doe");
    Profile profile2 = new Profile();
    profile2.setId(2L);
    profile2.setName("Jane Doe");
    profileList.add(profile1);
    profileList.add(profile2);
    when(profileRepository.findAll()).thenReturn(profileList);
  }

  @Test
  public void getProfiles() {
    List<ProfileDto> profileList = profileService.getProfiles();
    assertEquals(2, profileList.size());
  }

}

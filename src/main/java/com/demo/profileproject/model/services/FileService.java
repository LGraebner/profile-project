package com.demo.profileproject.model.services;

import com.demo.profileproject.model.db.entities.Profile;
import com.demo.profileproject.model.dto.ProfileDto;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
public class FileService {

  @Autowired
  private ProfileService profileService;

  private final String FILESTORE_PATH = "data/filestore/images";

  public void uploadImageToFileStore(MultipartFile multipartFile, Long profileId) {
    log.info("Uploading image to filestore for profile {}: {}", profileId, multipartFile.getOriginalFilename());
      Path filepath = Paths.get(getFilestoreDir().getAbsolutePath(), generateImageName(profileId, multipartFile.getOriginalFilename()));

      try (OutputStream os = Files.newOutputStream(filepath)) {
        os.write(multipartFile.getBytes());
        log.info("Wrote image to {}", filepath);
      } catch (IOException e) {
        log.error(e.getMessage(), e);
        throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Exception while uploading file: " + e.getMessage());
      }

      profileService.updateImageName(profileId, generateImageName(profileId, multipartFile.getOriginalFilename()));

  }

  public Resource getImageFromFilestore(String fileName) {
    try {
      log.info("Fetching image from filestore: {}", fileName);
      File file = new File(getFilestoreDir(), fileName);
      if (!file.exists()) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image available " + fileName);
      }
      return new UrlResource(file.toURI());
    } catch (MalformedURLException e) {
      log.error(e.getMessage(), e);
      throw new ResponseStatusException(
          HttpStatus.INTERNAL_SERVER_ERROR, "File could not be read from local file store");
    }
  }

  private File getFilestoreDir() {
    ClassLoader classLoader = this.getClass().getClassLoader();
    File baseDir = new File(new File(classLoader.getResource("").getFile()), FILESTORE_PATH);
    if (!baseDir.exists()) {
      baseDir.mkdirs();
    }

    return baseDir;
  }

  private String generateImageName(Long profileId, String filename) {
    return profileId + "-" + filename;
  }

}

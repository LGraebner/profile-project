package com.demo.profileproject.model.services;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
public class FileService {

  private final String FILESTORE_PATH = "data/filestore/images";

  public void uploadImageToFileStore(MultipartFile multipartFile, Integer profileId) {
    log.info("Uploading image to filestore: {}", multipartFile.getOriginalFilename());
      Path filepath = Paths.get(getFilestoreDir().getAbsolutePath(), generateImageName(profileId));

      try (OutputStream os = Files.newOutputStream(filepath)) {
        os.write(multipartFile.getBytes());
      } catch (IOException e) {
        log.error(e.getMessage(), e);
        throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Exception while uploading file: " + e.getMessage());
      }

  }

  public Resource getImageFromFilestore(Integer profileId) {
    try {
      log.info("Fetching image from filestore: {}", generateImageName(profileId));
      File file = new File(getFilestoreDir(), generateImageName(profileId));
      return new UrlResource(file.toURI());
    } catch (Exception e) {
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

  private String generateImageName(Integer profileId) {
    return "image_" + profileId;
  }

}

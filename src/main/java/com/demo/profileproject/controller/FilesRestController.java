package com.demo.profileproject.controller;

import com.demo.profileproject.model.services.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

@RestController
@RequestMapping("images")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class FilesRestController {

  @Autowired
  FileService fileService;

  @ResponseStatus(HttpStatus.NO_CONTENT)
  @PostMapping("/{id}")
  @ResponseBody
  public void uploadTtgSoftware(
      @PathVariable Integer id,
      @RequestParam("image-file") MultipartFile imageFile) {
    fileService.uploadImageToFileStore(imageFile, id);
  }

  @ResponseStatus(HttpStatus.OK)
  @GetMapping("/{id}")
  public ResponseEntity getFile(
      @PathVariable Integer id) {

    Resource resource = fileService.getImageFromFilestore(id);

    return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_OCTET_STREAM)
        .header(
            HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
        .body(resource);
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.OPTIONS)
  ResponseEntity<?> collectionOptionsId() {
    return ResponseEntity.ok()
        .allow(HttpMethod.GET, HttpMethod.POST, HttpMethod.OPTIONS)
        .build();
  }

}

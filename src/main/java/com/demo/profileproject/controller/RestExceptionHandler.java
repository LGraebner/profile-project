package com.demo.profileproject.controller;

import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
@Slf4j
public class RestExceptionHandler {
  @ExceptionHandler
  public ModelAndView defaultErrorHandler(HttpServletRequest req, Exception e) throws Exception {
    if (e instanceof ResponseStatusException) {
      log.error(e.getMessage());
    } else {
      log.error(e.getMessage(), e);
    }
    throw e;
  }
}

package com.demo.profileproject.model.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import lombok.Data;

@Data
public class ProfileDto {

  @Null
  private Long id;

  @NotEmpty
  private String name;

  @NotEmpty
  private String description;

  private String link;

}

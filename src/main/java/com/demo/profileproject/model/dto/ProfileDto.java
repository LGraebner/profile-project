package com.demo.profileproject.model.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileDto {

  @Null
  private Long id;

  @NotEmpty
  @Size(max = 16)
  private String name;

  @NotEmpty
  private String description;

  @Null
  private String imageName;

  private String link;

}

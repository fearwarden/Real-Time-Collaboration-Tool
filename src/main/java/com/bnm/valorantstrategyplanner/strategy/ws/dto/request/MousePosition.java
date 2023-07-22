package com.bnm.valorantstrategyplanner.strategy.ws.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MousePosition {

    @NotNull
    @NotBlank
    String userId;

    @NotNull
    float x;

    @NotNull
    float y;
}

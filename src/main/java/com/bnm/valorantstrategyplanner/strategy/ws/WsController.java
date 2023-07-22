package com.bnm.valorantstrategyplanner.strategy.ws;

import com.bnm.valorantstrategyplanner.strategy.ws.dto.request.MousePosition;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;

@Controller
public class WsController {
    @MessageMapping("/mouse-position")
    @SendTo("/topic/strategies")
    public MousePosition registerMousePosition(@Validated MousePosition mousePosition) {
        System.out.println(mousePosition);
        return mousePosition;
    }

}

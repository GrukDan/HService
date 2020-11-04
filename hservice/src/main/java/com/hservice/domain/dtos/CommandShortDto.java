package com.hservice.domain.dtos;

import com.hservice.domain.models.Command;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommandShortDto {
    private Long commandId;
    private String commandName;

    public CommandShortDto(Command command){
        this.commandId = command.getCommandId();
        this.commandName = command.getCommandName();
    }
}

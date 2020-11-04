package com.hservice.services;

import com.hservice.domain.dtos.CommandShortDto;
import com.hservice.domain.models.Command;

import java.util.Collection;

public interface CommandService  extends CrudService<Command,Long>{
    Collection<CommandShortDto> getAllDtos();
}

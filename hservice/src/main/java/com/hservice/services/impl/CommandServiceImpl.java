package com.hservice.services.impl;

import com.hservice.domain.dtos.CommandShortDto;
import com.hservice.domain.models.Command;
import com.hservice.exceptions.AlreadyExistsException;
import com.hservice.exceptions.NotFoundException;
import com.hservice.repositories.CommandRepository;
import com.hservice.services.CommandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommandServiceImpl implements CommandService {

    private final CommandRepository commandRepository;

    @Override
    public Command save(Command entity) throws AlreadyExistsException {
        if (commandRepository.existsByCommandName(entity.getCommandName()))
            throw new AlreadyExistsException();
        return commandRepository.save(entity);
    }

    @Override
    public Command findById(Long id) throws NotFoundException {
        return commandRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public void deleteById(Long id) {
        commandRepository.deleteById(id);
    }

    @Override
    public Collection<Command> findAll() {
        return commandRepository.findAll();
    }

    @Override
    public Collection<CommandShortDto> getAllDtos() {
        return fromCommands(commandRepository.findAll());
    }

    private Collection<CommandShortDto> fromCommands(Collection<Command> commands) {
        return Optional.of(commands)
                .get().stream()
                .map(CommandShortDto::new)
                .sorted(Comparator.comparing(CommandShortDto::getCommandName))
                .collect(Collectors.toList());
    }
}

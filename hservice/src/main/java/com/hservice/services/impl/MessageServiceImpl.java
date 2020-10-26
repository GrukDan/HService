package com.hservice.services.impl;

import com.hservice.domain.models.Message;
import com.hservice.exceptions.NotFoundException;
import com.hservice.services.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
    @Override
    public Message save(Message entity) {
        return null;
    }

    @Override
    public Message findById(Long id) throws NotFoundException {
        return null;
    }

    @Override
    public void deleteById(Long id) {

    }

    @Override
    public Collection<Message> findAll() {
        return null;
    }
}

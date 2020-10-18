package com.hservice.services;

import com.hservice.models.History;

import java.util.Collection;

public interface HistoryService extends CrudService<History,Long>{

    Collection<History> findAllByTask(long task);

}

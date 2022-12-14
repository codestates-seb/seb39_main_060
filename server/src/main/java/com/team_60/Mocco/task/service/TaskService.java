package com.team_60.Mocco.task.service;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.task.entity.Task;

public interface TaskService {
    public void deleteTask(long taskId);
    public Task findVerifiedTask(long taskId);
    public void validateTask(Task task, Study study);
}

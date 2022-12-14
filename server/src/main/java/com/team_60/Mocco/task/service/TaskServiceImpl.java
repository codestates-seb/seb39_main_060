package com.team_60.Mocco.task.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class TaskServiceImpl implements TaskService{
    private final TaskRepository taskRepository;

    @Override
    public void deleteTask(long taskId){
        Task findTask = findVerifiedTask(taskId);
        taskRepository.delete(findTask);
    }

    @Override
    public Task findVerifiedTask(long taskId){
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        Task findTask = optionalTask.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TASK_NOT_FOUND));
    return findTask;
    }

    @Override
    public void validateTask(Task task, Study study) {
        if(task.getDeadline().compareTo(study.getStartDate())<0 ||
        task.getDeadline().compareTo(study.getEndDate())>0){
            throw new BusinessLogicException(ExceptionCode.IMPOSSIBLE_TASK_DATE);
        }
    }

}

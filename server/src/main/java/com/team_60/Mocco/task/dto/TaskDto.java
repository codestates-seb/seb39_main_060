package com.team_60.Mocco.task.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.team_60.Mocco.task_check.dto.TaskCheckDto;
import lombok.*;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TaskDto {

    @Size(max = 100, message = "Task의 내용은 최대 100자입니다.")
    @NotBlank(message = "Task의 내용은 빈칸일 수 없습니다.")
    private String content;

    @Future(message = "Task 마감 날짜는 오늘 날짜보다 이후이어야 합니다.")
    @NotBlank(message = "Task 마감 날짜는 빈칸일 수 없습니다.")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadline;

    @Positive(message = "task 식별자는 양수이어야 합니다.")
    private long taskId;

    @AllArgsConstructor
    @Getter
    @Setter
    public static class CheckResponse{
        private long taskId;
        private LocalDate deadline;
        private String content;
        private TaskCheckDto.SubResponse taskCheck;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class MemberProgressResponse{
        private int totalTaskCount;
        private int expiredTaskCount;
        private List<MemberProgress> memberProgress;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class MemberProgress{
        private long memberId;
        private int endTaskCount;
    }
}


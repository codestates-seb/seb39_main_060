package com.team_60.Mocco.proposal.dto;

import com.team_60.Mocco.dto.PostDto;
import com.team_60.Mocco.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

public class ProposalDto {

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post extends PostDto {

        @Positive(message = "스터디 식별자는 1 이상이어야 합니다.")
        private long studyId;

        @Size(max = 30, message = "신청글은 최대 30자입니다.")
        @NotNull(message = "신청글은 null이 아니어야 합니다.")
        private String content;
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long proposalId;
        private String content;
        private String createdAt;
        private MemberDto.SubResponse member;
    }
}

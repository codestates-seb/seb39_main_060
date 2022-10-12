package com.team_60.Mocco.exception.businessLogic;

import lombok.Getter;

public enum ExceptionCode {

    FAIL_SEND_EMAIL(300, "이메일 주소가 잘못되었거나 서버에서 메일을 보내지 못했습니다."),
    MEMBER_NOT_FOUND(404, "멤버를 찾을 수 없습니다."),
    EMAIL_ALREADY_EXIST(400, "해당 메일을 이용하는 사용자가 이미 존재합니다."),
    EMAIL_NOT_EXIST(400, "해당 메일을 이용하는 사용자가 없습니다."),
    NICKNAME_ALREADY_EXIST(400, "해당 닉네임을 이용하는 사용자가 이미 존재합니다."),
    GITHUB_REPOSITORY_DUPLICATION(400, "중복된 github repository를 입력했습니다."),
    NOT_GITHUB_REPOSITORY(400, "잘못된 github repository 입니다."),
    STUDY_NOT_FOUND(404, "스터디를 찾을 수 없습니다."),
    STUDY_NOT_RECRUIT(400, "스터디가 모집중이 아닙니다."),
    NOT_MEMBER_ABOVE_2(400, "현재 스터디의 스터디원이 1명 이하입니다."),
    STUDY_NOT_PROGRESS(400, "스터디가 진행중이 아닙니다."),
    STUDY_NOT_COMPLETE(400, "스터디가 아직 종료되지 않았습니다."),
    STUDY_NOT_DELETE(400, "스터디가 모집중이 아니어서 삭제할 수 없습니다."),
    NOT_STUDY_MEMBER(400, "스터디의 멤버가 아닙니다."),
    NOT_STUDY_TEAM_LEADER(400,"스터디 팀장이 아닙니다."),
    NOT_STUDY_EVALUATION_STATUS(400, "이미 투표를 했거나 투표기간이 지났습니다."),
    NOT_EVALUATION_MEMBER(400, "투표 대상이 아닌 사람을 투표했습니다."),
    NOT_ALL_EVALUATION(400, "전 Member 를 투표를 하지 않았습니다."),
    DUPLICATION_EVALUATION(400, "같은 멤버를 중복 투표하였습니다."),
    COMMENT_NOT_FOUND(404, "코멘트를 찾을 수 없습니다."),
    COMMENT_DELETED(400, "삭제된 코멘트입니다."),
    REPLY_NOT_FOUND(404, "대댓글을 찾을 수 없습니다."),
    REPLY_DELETED(400, "삭제된 대댓글입니다."),
    PROPOSAL_NOT_FOUND(404, "신청을 찾을 수 없습니다."),
    PROPOSAL_NOT_CREATED(400, "스터디의 팀원은 스터디를 신청할 수 없습니다."),
    PROPOSAL_ALREADY_EXIST(400, "해당 스터디에 이미 신청하였습니다."),
    PROPOSAL_NOT_WAITING(400, "해당 신청은 대기중이 아닙니다."),
    STUDY_MEMBER_OVER_CAPACITY(400, "수용 인원보다 많은 수의 멤버를 뽑을 수 없습니다."),
    STUDY_MEMBER_ALREADY_INVITED(400, "이미 해당 스터디의 스터디원입니다."),
    TASK_NOT_FOUND(404, "해당 Task를 찾을 수 없습니다."),
    TASK_NOT_EXIST(400,"Task가 존재하지 않습니다."),
    NOT_CORRECT_TASK(400,"study에 없는 task 입니다."),
    IMPOSSIBLE_TASK_DATE(400,"선택할 수 없는 Task 날짜입니다."),
    STARTDATE_PREVIOUS(400,"현재 날짜보다 이전 날짜를 시작일로 선택할 수 없습니다."),
    NOT_CORRECT_PERIOD(400,"선택할 수 있는 날짜 범위가 아닙니다."),
    TASK_CHECK_NOT_FOUND(404, "해당 인증글을 찾을 수 없습니다."),
    PROVIDER_ID_NOT_FOUND(404,"해당 provider ID 정보를 찾을 수 없습니다."),
    NOT_DONE_TASK(400,"이전 Task를 완료하지 않았습니다."),
    TASK_ALREADY_DONE(400,"이미 해당 task 인증을 했습니다."),
    PARAMETER_NOT_FOUND(400,"해당 파라미터를 찾을 수 없습니다. 인증 오류"),
    DIFFERENT_USER_FROM_TOKEN(400, "토큰 정보의 유저와 다른 유저의 요청입니다."),

    ALARM_NOT_FOUND(404, "해당 알람을 찾을 수 없습니다."),
    FAIL_SSE_CONNECT(500 ,"서버에서 구독이 정상적으로 작동하지 않았습니다."),
    NOT_ACCEPTED_EXTENSION(400, "이미지은 jpg, png 파일만 업로드 할 수 있습니다."),
    BAD_REQUEST(400,"잘못된 요청입니다."),
    TEST_ACCOUNT(403,"테스트 유저는 접근할 수 없습니다."),
    
    USERNAME_NOT_FOUND(401,"해당하는 유저를 찾을 수 없습니다."),
    CLAIM_NOT_EXIST(403,"권한 정보가 없는 토큰입니다."),
    TOKEN_EXPIRED_EXCEPTION(403,"이미 만료된 토큰입니다."),
    FAIL_DECODE_TOKEN(403,"토큰 검증에 실패하였습니다."),
    BAD_REFRESH_TOKEN(403,"Refresh Token 정보가 일치하지 않습니다."),
    BAD_TOKEN_REQUEST(403,"잘못된 Token 요청입니다."),
    BAD_REQUEST_TOKEN(403,"JWT 토큰이 잘못되었습니다."),
    NOT_SAME_USER(400,"잘못된 유저 접근입니다."),
    NOT_CORRECT_PASSWORD(401, "잘못된 비밀번호 입니다."),
    NOT_PASSWORD_MATCHED(400, "기존 비밀번호가 틀렸습니다."),
    NOT_CORRECT_ARGUMENT(400, "올바르지 않은 형식의 요청입니다."),

    URI_MAKING_ERROR(500, "서버에서 통신중에 에러가 발생했습니다. URIBuilder Error"),
    STRING_ENTITY_ERROR(500, "서버에서 통신중에 에러가 발생했습니다. StringEntity Error, Response Error"),
    REST_CLIENT_ERROR(500, "서버에서 통신중에 에러가 발생했습니다."),
    FILTER_UNKNOWN_ERROR(500, "서버에서 통신중에 에러가 발생했습니다. Security Filter Error."),
    INTERCEPTOR_UNKNOWN_ERROR(500, "서버에서 통신중에 에러가 발생했습니다. Interceptor Error."),
    NOT_NORMAL_AUTHORIZATION_CODE(400, "정상작인 authorization code 가 아닙니다."),
    GITHUB_CONNECTION_ALREADY_EXIST(400, "이 계정의 깃허브를 연동한 유저가 이미 존재합니다.");




    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}

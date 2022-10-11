package com.team_60.Mocco.helper.auth;

import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.alarm.service.AlarmService;
import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.comment.service.CommentService;
import com.team_60.Mocco.dto.PostDto;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.helper.auth.AuthenticationService;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.proposal.entity.Proposal;
import com.team_60.Mocco.proposal.service.ProposalService;
import com.team_60.Mocco.reply.entity.Reply;
import com.team_60.Mocco.reply.service.ReplyService;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.service.StudyService;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.task.entity.Task;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import com.team_60.Mocco.task_check.service.TaskCheckService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
@Slf4j
public class AuthenticationServiceDeploy implements AuthenticationService {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private MemberService memberService;
    @Autowired
    private StudyService studyService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private ReplyService replyService;
    @Autowired
    private ProposalService proposalService;
    @Autowired
    private TaskCheckService taskCheckService;
    @Autowired
    private AlarmService alarmService;

    private final List<String> idList = List.of("studyId","memberId","commentId","replyList","proposalId","taskCheckId","alarmId");

    @Override
    public void AuthenticationCheckWithId(String parameterName, long id, long memberId) { // patch, delete (id값 받는 경우)
        //request 헤더에 들어오는 토큰에 있는 정보와 매개변수로 받는 ID의 멤버 정보가 일치하는지 확인
        Member member = new Member();
            switch (parameterName) {
                case "memberId":
                    member = memberService.findVerifiedMember(id);
                    break;
                case "studyId":
                    Study study = studyService.findVerifiedStudy(id);
                    member = study.getTeamLeader();
                    break;
                case "commentId":
                    Comment comment = commentService.findVerifiedComment(id);
                    member = comment.getMember();
                    break;
                case "replyId":
                    Reply reply = replyService.findVerifiedReply(id);
                    member = reply.getMember();
                    break;
                case "proposalId":
                    Proposal proposal = proposalService.findVerifiedProposal(id);
                    member = proposal.getMember();
                    break;
                case "taskCheckId":
                    TaskCheck taskCheck = taskCheckService.findVerifiedTaskCheck(id);
                    member = taskCheck.getMember();
                    break;
                case "alarmId":
                    Alarm alarm = alarmService.findVerifiedAlarm(id);
                    member = alarm.getMember();
                    break;
                default:
                    throw new BusinessLogicException(ExceptionCode.PARAMETER_NOT_FOUND);
            }
            if(member.getMemberId() != memberId){
                throw new BusinessLogicException(ExceptionCode.DIFFERENT_USER_FROM_TOKEN);
            }
        }
    @Override
    public <T> void setMemberIdOfRequestBody(T requestBody, long tokenMemberId){ //post
        log.info("DTO 검증 실행");
        log.info(requestBody.toString());
        if( requestBody instanceof PostDto){
            ((PostDto) requestBody).setMemberId(tokenMemberId);
        }
    }
    @Override
    public void AuthenticationCheckStudyMember(long studyId, long memberId){ //studyRoom
        List<StudyMember> studyMemberList = studyService.findVerifiedStudy(studyId).getStudyMemberList();
        List<Long> memberIdList = studyMemberList.stream()
                .map(n -> n.getMember().getMemberId()).collect(Collectors.toList());
        memberIdList.stream().forEach(n -> log.info(n +" , "));
        if(!memberIdList.contains(memberId)){
            throw new BusinessLogicException(ExceptionCode.NOT_STUDY_MEMBER);
        }
    }

    @Override
    public void AuthenticationCheckStudyLeader(long proposalId, long memberId){
        Proposal proposal = proposalService.findVerifiedProposal(proposalId);
        if(proposal.getStudy().getTeamLeader().getMemberId() != memberId){
            throw new BusinessLogicException(ExceptionCode.NOT_STUDY_TEAM_LEADER);
        }
    }
    @Override
    public void AuthenticationCheckStudyMemberByTaskId(long taskCheckId, long memberId){
        TaskCheck taskCheck = taskCheckService.findVerifiedTaskCheck(taskCheckId);
        AuthenticationCheckStudyMember(taskCheck.getTask().getStudy().getStudyId(), memberId);
    }
}

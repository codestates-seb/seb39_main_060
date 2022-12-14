package com.team_60.Mocco.member.entity;

import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.base_entity.BaseEntity;
import com.team_60.Mocco.chatting.entity.Chatting;
import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.proposal.entity.Proposal;
import com.team_60.Mocco.reply.entity.Reply;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(length = 50, nullable = false)
    private String email;

    @Column(length = 70, nullable = false)
    private String password;

    @Column(length = 10, nullable = false)
    private String nickname;

    @Column
    private String provider;

    @Column
    private String providerId;

    @Column
    private String githubNickname;

    @Column
    private String roles = "ROLE_USER";

    public List<String> getRoleList() {
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

    @OneToMany(mappedBy = "teamLeader", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Study> studyLeaderList = new ArrayList<>();
    
    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private MyInfo myInfo = new MyInfo();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<TaskCheck> taskCheckList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<StudyMember> studyMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Reply> replyList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Proposal> proposalList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Chatting> chattingList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Alarm> alarmList = new ArrayList<>();
}

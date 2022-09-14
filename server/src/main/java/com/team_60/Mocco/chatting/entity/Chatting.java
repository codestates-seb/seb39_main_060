package com.team_60.Mocco.chatting.entity;

import com.team_60.Mocco.audit.Auditable;
import com.team_60.Mocco.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Chatting extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long chatting_id;

    @Column
    private String content;

    @ManyToOne(optional = false)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(optional = false)
    @JoinColumn(name = "CHATTING_ROOM_ID")
    private ChattingRoom chattingRoom;
}

package com.team_60.Mocco.chatting.entity;

import com.team_60.Mocco.base_entity.BaseEntity;
import com.team_60.Mocco.study.entity.Study;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ChattingRoom extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long chattingRoomId;

    @OneToOne
    @JoinColumn(name = "STUDY_ID")
    private Study study;

    @OneToMany(mappedBy = "chattingRoom")
    private List<Chatting> chattingList = new ArrayList<>();

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private ChattingRoomType chattingRoomType = ChattingRoomType.STUDY;

    public enum ChattingRoomType{
        STUDY("study");

        @Getter
        private String type;

        ChattingRoomType(String type){
            this.type = type;
        }
    }

}

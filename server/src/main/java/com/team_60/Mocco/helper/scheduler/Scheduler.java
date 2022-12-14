package com.team_60.Mocco.helper.scheduler;

import com.team_60.Mocco.alarm.service.AlarmService;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.repository.StudyRepository;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.study_member.repository.StudyMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static com.team_60.Mocco.study.entity.Study.StudyStatus.*;
import static com.team_60.Mocco.study_member.entity.StudyMember.StudyMemberEvaluationStatus.*;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class Scheduler {
    private final StudyRepository studyRepository;
    private final StudyMemberRepository studyMemberRepository;
    private final AlarmService alarmService;

    @Scheduled(cron = "0 0 1 * * *")
    public void changeStudyStatusStart(){
        List<Study> studyList = studyRepository.findByStudyStatusAndStartDateBefore(RECRUIT_PROGRESS, LocalDate.now().plusDays(1));
        studyList.addAll(studyRepository.findByStudyStatusAndStartDateBefore(RECRUIT_COMPLETE, LocalDate.now().plusDays(1)));
        for (Study study : studyList) {
            List<StudyMember> studyMemberList = studyMemberRepository.findByStudy(study);
            if (studyMemberList.size() > 1) {
                study.setStudyStatus(STUDY_PROGRESS);
                Study saveStudy = studyRepository.save(study);
                alarmService.createAlarmWhenStudyOpen(saveStudy);

                log.info(study.getStudyId() + "모집중인 스터디 진행중으로 상태 변경");
            } else {
                alarmService.createAlarmWhenStudyNotOpen(study);
                studyRepository.delete(study);

                log.info(study.getStudyId() + "모집 인원이 모이지 않아서 스터디 삭제");
            }
        }

    }
    @Scheduled(cron = "0 0 1 * * *")
    public void changeStudyStatusEnd() throws InterruptedException {
        List<Study> studyList = studyRepository.findByStudyStatusAndEndDateBefore(STUDY_PROGRESS,LocalDate.now().plusDays(1));
        if(studyList.size() > 0) {
            for (Study study : studyList) {
                study.setStudyStatus(STUDY_COMPLETE);
                studyRepository.save(study);
                log.info(study.getStudyId() +"스터디 상태를 complete로 바꿔줌");
            }
        }
    }
    @Scheduled(cron = "0 0 1-3 * * *")
    public void changeStudyStatusEvaluation() throws InterruptedException {
        List<Study> studyList = studyRepository.findByStudyStatusAndEndDate(STUDY_COMPLETE,LocalDate.now().minusWeeks(2).minusDays(1));
        if(studyList.size() > 0) {
            for (Study study : studyList) {
                log.info(study.getStudyId() + "번 스터디");
                List<StudyMember> studyMemberList = studyMemberRepository.findByStudy(study);
                studyMemberList.stream().forEach(n -> {
                    if (n.getEvaluationStatus() != COMPLETE) {
                        n.setEvaluationStatus(NOT_EVALUATION);
                        log.info("평가 완료 상태 아닐 경우 평가 안함으로 상태 바꿈");
                    }
                    studyMemberRepository.save(n);
                });
            }
        }
    }
}
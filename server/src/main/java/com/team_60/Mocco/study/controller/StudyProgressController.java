package com.team_60.Mocco.study.controller;

import com.team_60.Mocco.dto.SingleResponseDto;
import com.team_60.Mocco.study.dto.StudyProgressDto;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.mapper.StudyProgressMapper;
import com.team_60.Mocco.study.service.StudyProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/study-progress")
@RequiredArgsConstructor
public class StudyProgressController {

    private final StudyProgressService studyProgressService;
    private final StudyProgressMapper studyProgressMapper;

    @GetMapping("/{study-id}/member/{member-id}")
    public ResponseEntity getStudyProgress(@PathVariable("study-id") long studyId,
                                           @PathVariable("member-id") long memberId){
        Study findStudy = studyProgressService.findStudyWhenMemberMatched(studyId, memberId);
        StudyProgressDto.Response response = studyProgressMapper.studyToStudyProgressResponseDto(findStudy, memberId);

        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @GetMapping("/rule/{study-id}")
    public ResponseEntity getStudyRule(@PathVariable("study-id") long studyId){
        Study findStudy = studyProgressService.findStudy(studyId);
        StudyProgressDto.Rule response = studyProgressMapper.studyToStudyProgressResponseRuleDto(findStudy);

        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

    @PatchMapping("/rule/{study-id}")
    public ResponseEntity patchStudyRule(@PathVariable("study-id") long studyId,
                                         @RequestBody StudyProgressDto.Rule requestBody){

        Study study = studyProgressMapper.studyProgressResponseRuleDtoToStudy(requestBody);
        study.setStudyId(studyId);
        Study findStudy = studyProgressService.patchStudyRule(study);
        StudyProgressDto.Rule response = studyProgressMapper.studyToStudyProgressResponseRuleDto(findStudy);

        return new ResponseEntity(
                new SingleResponseDto(response), HttpStatus.OK);
    }

}
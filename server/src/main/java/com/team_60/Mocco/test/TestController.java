package com.team_60.Mocco.test;

import com.team_60.Mocco.alarm.service.AlarmService;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.helper.sse.SseService;
import com.team_60.Mocco.helper.stub.StubData;
import com.team_60.Mocco.helper.upload.ImageUploadType;
import com.team_60.Mocco.helper.upload.S3ImageUpload;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.repository.StudyRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.study.mapper.StudyMapper;
import com.team_60.Mocco.study.service.StudyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;


@Profile("!deploy")
@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/test")
public class TestController {

    private final StudyRepository studyRepository;
    private final S3ImageUpload imageUpload;
    private MemberService memberService;

    private StudyService studyService;
    private StudyMapper studyMapper;
    private SseService sseService;
    private AlarmService alarmService;

    @GetMapping("/image")
    public String checkImageUpload(@RequestParam("images") MultipartFile multipartFile,
                                   @RequestParam String fileSize) throws IOException {

        String url = imageUpload.upload(multipartFile.getInputStream(),
                multipartFile.getOriginalFilename(), fileSize, ImageUploadType.MEMBER_PROFILE);

        return "image 업로드 성공 : " + url;
    }

    @GetMapping("/userTest")
    public ResponseEntity userTest(HttpServletRequest request){
        log.info("ROLE_USER TEST");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public String checkON(){
        return "우리팀 화이팅!";
    }

    @PatchMapping("/study-status/study-progress/{study-id}")
    public Study changeStudyStatusToStudyProgress(@PathVariable("study-id") long studyId){
        Study study = studyRepository.findById(studyId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND)
        );

        study.setStudyStatus(Study.StudyStatus.STUDY_PROGRESS);
        studyRepository.save(study);

        System.out.println("study-progress 변경 완료");
        return null;
    }

    @PatchMapping("/study-status/study-complete/{study-id}")
    public Study changeStudyStatusToStudyComplete(@PathVariable("study-id") long studyId){
        Study study = studyRepository.findById(studyId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND)
        );

        study.setStudyStatus(Study.StudyStatus.STUDY_COMPLETE);
        studyRepository.save(study);

        System.out.println("study-complete 변경 완료");
        return null;
    }

    @PostMapping("/alarm")
    public ResponseEntity sendAlarm(@RequestParam("member-id") long memberId){
        Member member = memberService.findVerifiedMember(memberId);

        Study study = new Study();
        study.setTeamName("Test Study");
        study.setTeamLeader(member);
        alarmService.createAlarmWhenStudyNotOpen(study);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/data/user")
    public ResponseEntity userData() {
            memberService.createMember(StubData.member1);
            memberService.createMember(StubData.member2);
        log.info("유저 2개 추가 완료");
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("data/study")
    public ResponseEntity studyData(){
        for (int i = 0; i < 16; i++) {
            studyService.createStubStudy(studyMapper.studyRequestDtoToStudy(StubData.studyStub, new ArrayList<>()));
        }
        log.info("스터디 100개 추가 완료");
        return new ResponseEntity(HttpStatus.OK);
    }
}

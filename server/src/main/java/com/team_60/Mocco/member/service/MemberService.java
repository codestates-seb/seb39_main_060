package com.team_60.Mocco.member.service;

import com.team_60.Mocco.member.dto.MemberDto;
import com.team_60.Mocco.member.entity.Member;

public interface MemberService {

    Member findMember(long memberId);
    Member createMember(Member member);
    Member updateMember(Member member);
    Member updatePassword(MemberDto.PatchPassword dto);
    Member updateGithubInfo(Member member);
    void deleteMember(long memberId);
    Member findVerifiedMember(long memberId);
    void findMemberByNicknameExpectNull(String nickname);
    void resetMemberPasswordByEmail(String email);
}

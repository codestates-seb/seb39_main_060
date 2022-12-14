package com.team_60.Mocco.member.repository;

import com.team_60.Mocco.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByNickname(String nickname);
    Optional<Member> findByProviderId(String providerId);
    Optional<Member> findByProvider(String provider);
}

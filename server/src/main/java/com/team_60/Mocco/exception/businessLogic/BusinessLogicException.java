package com.team_60.Mocco.exception.businessLogic;

import lombok.Getter;

@Getter
public class BusinessLogicException extends RuntimeException {

    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}

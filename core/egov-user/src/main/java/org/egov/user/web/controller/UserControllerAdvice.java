package org.egov.user.web.controller;

import org.egov.user.domain.exception.InvalidUserException;
import org.egov.user.domain.exception.InvalidUserSearchException;
import org.egov.user.domain.exception.OtpValidationPendingException;
import org.egov.user.web.adapters.errors.InvalidUserSearchErrorAdapter;
import org.egov.user.web.adapters.errors.OtpValidationErrorAdapter;
import org.egov.user.web.adapters.errors.UserRequestErrorAdapter;
import org.egov.user.web.contract.ErrorRes;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class UserControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidUserException.class)
    public ErrorRes handleInvalidComplaintException(InvalidUserException ex) {
        return new UserRequestErrorAdapter().adapt(ex.getUser());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(OtpValidationPendingException.class)
    public ErrorRes handleInvalidComplaintException(OtpValidationPendingException ex) {
        return new OtpValidationErrorAdapter().adapt(ex.getUser());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(InvalidUserSearchException.class)
    public ErrorRes handleInvalidUserSearchException(InvalidUserSearchException ex) {
        return new InvalidUserSearchErrorAdapter().adapt(ex.getUserSearch());
    }
}

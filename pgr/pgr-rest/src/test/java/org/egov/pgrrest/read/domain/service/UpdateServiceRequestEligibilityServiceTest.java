package org.egov.pgrrest.read.domain.service;

import org.egov.pgr.common.model.Employee;
import org.egov.pgr.common.repository.EmployeeRepository;
import org.egov.pgrrest.common.model.AuthenticatedUser;
import org.egov.pgrrest.common.model.UserType;
import org.egov.pgrrest.read.domain.exception.UpdateServiceRequestNotAllowedException;
import org.egov.pgrrest.read.persistence.repository.SubmissionRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UpdateServiceRequestEligibilityServiceTest {

    @InjectMocks
    private UpdateServiceRequestEligibilityService service;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private SubmissionRepository submissionRepository;

    @Test
    public void test_should_not_throw_exception_when_employee_eligible_to_update_request() {
        when(employeeRepository.getEmployeeById(1L, "tenantId")).thenReturn(getEmployeeEligible());
        when(submissionRepository.getPositionByCrnAndTenantId("crn", "tenantId")).thenReturn(1L);
        final AuthenticatedUser user = AuthenticatedUser.builder()
            .type(UserType.EMPLOYEE)
            .id(1L)
            .build();

        service.validate("crn", "tenantId", user);
    }

    @Test(expected = UpdateServiceRequestNotAllowedException.class)
    public void test_should_throw_exception_when_anonymous_user_attempts_to_update_request() {
        final AuthenticatedUser user = AuthenticatedUser.createAnonymousUser();

        service.validate("crn", "tenantId", user);
    }

    @Test(expected = UpdateServiceRequestNotAllowedException.class)
    public void test_should_throw_exception_when_employee_not_eligible_to_update_request() {
        final List<String> roleCodes = Collections.singletonList("RO");
        final AuthenticatedUser user = AuthenticatedUser.builder()
            .id(1L)
            .type(UserType.EMPLOYEE)
            .roleCodes(roleCodes).build();
        when(employeeRepository.getEmployeeById(1L, "tenantId"))
            .thenReturn(getEmployee());
        when(submissionRepository.getPositionByCrnAndTenantId("crn", "tenantId"))
            .thenReturn(1L);

        service.validate("crn", "tenantId", user);
    }

    private Employee getEmployeeEligible() {
        return Employee.builder()
            .primaryPosition(1L)
            .build();
    }

    private Employee getEmployee() {
        return Employee.builder()
            .primaryPosition(2L)
            .build();
    }
}
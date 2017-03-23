/*
 * eGov suite of products aim to improve the internal efficiency,transparency,
 * accountability and the service delivery of the government  organizations.
 *
 *  Copyright (C) 2016  eGovernments Foundation
 *
 *  The updated version of eGov suite of products as by eGovernments Foundation
 *  is available at http://www.egovernments.org
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see http://www.gnu.org/licenses/ or
 *  http://www.gnu.org/licenses/gpl.html .
 *
 *  In addition to the terms of the GPL license to be adhered to in using this
 *  program, the following additional terms are to be complied with:
 *
 *      1) All versions of this program, verbatim or modified must carry this
 *         Legal Notice.
 *
 *      2) Any misrepresentation of the origin of the material is prohibited. It
 *         is required that all modified versions of this material be marked in
 *         reasonable ways as different from the original version.
 *
 *      3) This license does not grant any rights to any user of the program
 *         with regards to rights under trademark law for use of the trade names
 *         or trademarks of eGovernments Foundation.
 *
 *  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */

package org.egov.eis.service;

import java.util.List;

import org.egov.eis.config.ApplicationProperties;
import org.egov.eis.model.User;
import org.egov.eis.service.helper.UserSearchURLHelper;
import org.egov.eis.web.contract.RequestInfo;
import org.egov.eis.web.contract.UserGetRequest;
import org.egov.eis.web.contract.UserRequest;
import org.egov.eis.web.contract.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class UserService {

	@Autowired
	private UserSearchURLHelper userSearchURLHelper;
	
	@Autowired
	private ApplicationProperties applicationProperties;

	public List<User> getUsers(List<Long> ids, String tenantId, RequestInfo requestInfo, HttpHeaders headers) {
		String url = userSearchURLHelper.searchURL(ids, tenantId);

		UserGetRequest userGetRequest = new UserGetRequest();
		userGetRequest.setId(ids);
		userGetRequest.setRequestInfo(requestInfo);
		userGetRequest.setTenantId(tenantId);

		headers.setContentType(MediaType.APPLICATION_JSON);
		String userGetRequestJson = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			userGetRequestJson = mapper.writeValueAsString(userGetRequest);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		// FIXME : hard-coded auth-token
		HttpHeaders hardCodedAuthTokenHeader = new HttpHeaders();
		hardCodedAuthTokenHeader.add("auth-token", "631ce772-306a-44c7-93ef-ba874d3cfc31");
		hardCodedAuthTokenHeader.setContentType(MediaType.APPLICATION_JSON);
		// Replace hardCodedAuthTokenHeader with header object if required
		HttpEntity<String> httpEntityRequest = new HttpEntity<String>(userGetRequestJson, hardCodedAuthTokenHeader);

		// Replace httpEntityRequest with userGetRequestJson if there is no need to send headers
		UserResponse userResponse = new RestTemplate().postForObject(url, httpEntityRequest, UserResponse.class);

		return userResponse.getUser();
	}

	public User createUser(UserRequest userRequest, HttpHeaders headers) {
		String url = applicationProperties.empServicesUsersServiceCreateUsersHostURL();
		String userJson = null;
		try {
			ObjectMapper mapper = new ObjectMapper();
			userJson = mapper.writeValueAsString(userRequest);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		// FIXME : hard-coded auth-token
		HttpHeaders hardCodedAuthTokenHeader = new HttpHeaders();
		hardCodedAuthTokenHeader.add("auth-token", "631ce772-306a-44c7-93ef-ba874d3cfc31");
		hardCodedAuthTokenHeader.setContentType(MediaType.APPLICATION_JSON);
		// Replace hardCodedAuthTokenHeader with header object if required
		HttpEntity<String> httpEntityRequest = new HttpEntity<String>(userJson, hardCodedAuthTokenHeader);

		UserResponse userResponse = null;
		try {
			// Replace hardCodedAuthTokenHeader with userResponse if there is no need to send headers
			userResponse = new RestTemplate().postForObject(url, httpEntityRequest, UserResponse.class);
		} catch (Exception e) {
			System.err.println("Exception Occurred While Calling User Service : " + e.getMessage());
			return null;
		}
		return userResponse.getUser().get(0);
	}
}
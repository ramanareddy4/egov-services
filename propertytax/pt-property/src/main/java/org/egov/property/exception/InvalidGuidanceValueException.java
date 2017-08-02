package org.egov.property.exception;

import org.egov.models.RequestInfo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Description : InvalidGuidanceValueException custom exception class
 * 
 * @author Anil
 *
 */

@AllArgsConstructor
@Getter
@Setter
public class InvalidGuidanceValueException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private String customMsg;
	
	private String msgDetails;

	private RequestInfo requestInfo;

}

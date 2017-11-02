package org.egov.works.estimate.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.egov.works.commons.web.contract.RequestInfo;
import org.egov.works.commons.web.contract.ResponseInfo;
import org.egov.works.estimate.domain.exception.CustomBindException;
import org.egov.works.estimate.domain.service.DetailedEstimateService;
import org.egov.works.estimate.web.contract.DetailedEstimateRequest;
import org.egov.works.estimate.web.contract.DetailedEstimateResponse;
import org.egov.works.estimate.web.contract.DetailedEstimateSearchContract;
import org.egov.works.estimate.web.model.DetailedEstimate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/detailedestimates")
public class DetailedEstimateController {

	@Autowired
	private DetailedEstimateService detailedEstimateService;

	
	@PostMapping("/_search")
	@ResponseStatus(HttpStatus.CREATED)
	public DetailedEstimateResponse search(
			@ModelAttribute @Valid DetailedEstimateSearchContract detailedEstimateSearchContract,
			@RequestBody RequestInfo requestInfo, BindingResult errors, @RequestParam String tenantId) {
		if (errors.hasErrors())
			throw new CustomBindException(errors);
		final List<DetailedEstimate> detailedEstimates = detailedEstimateService.search(detailedEstimateSearchContract);
		final DetailedEstimateResponse response = new DetailedEstimateResponse();
		response.setDetailedEstimates(detailedEstimates);
		response.setResponseInfo(getResponseInfo(requestInfo));
		return response;
	}


    @PostMapping("/_create")
    @ResponseStatus(HttpStatus.CREATED)
    public DetailedEstimateResponse create(@RequestBody DetailedEstimateRequest detailedEstimateRequest,
                                           BindingResult errors) {
        if (errors.hasErrors()) {
            throw new CustomBindException(errors);
        }

        final List<DetailedEstimate> detailedEstimates = detailedEstimateService.create(detailedEstimateRequest);
        final DetailedEstimateResponse response = new DetailedEstimateResponse();
        response.setDetailedEstimates(detailedEstimates);
        response.setResponseInfo(getResponseInfo(detailedEstimateRequest.getRequestInfo()));
        return response;
    }
	
	private ResponseInfo getResponseInfo(RequestInfo requestInfo) {
		return ResponseInfo.builder().apiId(requestInfo.getApiId()).ver(requestInfo.getVer())
				.resMsgId(requestInfo.getMsgId()).resMsgId("placeholder").build();
	}
	

}
package org.egov.infra.mdms.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.egov.common.contract.request.RequestInfo;
import org.egov.infra.mdms.service.MDMSService;
import org.egov.infra.mdms.utils.ResponseInfoFactory;
import org.egov.mdms.model.MDMSCreateRequest;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCreateResponse;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.MdmsResponse;
import org.egov.mdms.model.ModuleDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;

@RestController
@Slf4j
@RequestMapping(value = "/v1")
public class MDMSController {

	@Autowired
	private MDMSService mdmsService;
	
	@Autowired
	private ResponseInfoFactory responseInfoFactory;

	@PostMapping("_search")
	@ResponseBody
	private ResponseEntity<?> search(@RequestBody @Valid MdmsCriteriaReq mdmsCriteriaReq) {
		log.info("MDMSController mdmsCriteriaReq:" + mdmsCriteriaReq);
		/*
		 * if(bindingResult.hasErrors()) { throw new
		 * CustomBindingResultExceprion(bindingResult); }
		 */
		Map<String, Map<String, JSONArray>> response = mdmsService.getMaster(mdmsCriteriaReq);
		MdmsResponse mdmsResponse = new MdmsResponse();
		mdmsResponse.setMdmsRes(response);
		return new ResponseEntity<>(mdmsResponse, HttpStatus.OK);

		
	}
	
	@PostMapping("_create")
	@ResponseBody
	private ResponseEntity<?> create(@RequestBody @Valid MDMSCreateRequest mDMSCreateRequest) {
		log.info("MDMSController mDMSCreateRequest:" + mDMSCreateRequest);
		Object response = null;
		//response = mdmsService.getMaster(mdmsCriteriaReq);
		MdmsCreateResponse mdmsCreateResponse = new MdmsCreateResponse();
		mdmsCreateResponse.setData(response);
		mdmsCreateResponse.setResponseInfo(responseInfoFactory.
				createResponseInfoFromRequestInfo(mDMSCreateRequest.getRequestInfo(), true));
		return new ResponseEntity<>(mdmsCreateResponse, HttpStatus.OK);

		
	}
	

	@PostMapping("_get")
	@ResponseBody
	private ResponseEntity<?> search(@RequestParam("moduleName") String module,
									 @RequestParam("masterName") String master,
									 @RequestParam(value = "filter", required = false) String filter,
									 @RequestParam("tenantId") String tenantId,
									 @RequestBody RequestInfo requestInfo){

    	log.info("MDMSController mdmsCriteriaReq [" + module + ", " + master + ", " + filter + "]");
    	/*if(bindingResult.hasErrors()) {
    		throw new CustomBindingResultExceprion(bindingResult);
    	}*/

    	MdmsCriteriaReq mdmsCriteriaReq = new MdmsCriteriaReq();
    	mdmsCriteriaReq.setRequestInfo(requestInfo);
		MdmsCriteria criteria = new MdmsCriteria();
		criteria.setTenantId(tenantId);

		ModuleDetail detail = new ModuleDetail();
		detail.setModuleName(module);

		MasterDetail masterDetail = new MasterDetail();
		masterDetail.setName(master);
		masterDetail.setFilter(filter);
		ArrayList<MasterDetail> masterList = new ArrayList<>();
		masterList.add(masterDetail);
		detail.setMasterDetails(masterList);

		ArrayList<ModuleDetail> moduleList = new ArrayList<>();
		moduleList.add(detail);

		criteria.setModuleDetails(moduleList);
		mdmsCriteriaReq.setMdmsCriteria(criteria);

		Map<String, Map<String, JSONArray>> response = mdmsService.getMaster(mdmsCriteriaReq);
		MdmsResponse mdmsResponse = new MdmsResponse();
		mdmsResponse.setMdmsRes(response);
		return new ResponseEntity<>(mdmsResponse ,HttpStatus.OK);

	}
	
}

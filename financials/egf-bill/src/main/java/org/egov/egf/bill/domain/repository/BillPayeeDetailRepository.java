package org.egov.egf.bill.domain.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.domain.model.Pagination;
import org.egov.egf.bill.domain.model.BillPayeeDetail;
import org.egov.egf.bill.persistence.entity.BillPayeeDetailEntity;
import org.egov.egf.bill.persistence.repository.BillPayeeDetailJdbcRepository;
import org.egov.egf.bill.web.contract.BillPayeeDetailContract;
import org.egov.egf.master.web.repository.FinancialConfigurationContractRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BillPayeeDetailRepository {

	private BillPayeeDetailJdbcRepository billPayeeDetailJdbcRepository;

	private BillPayeeDetailQueueRepository billPayeeDetailQueueRepository;

	private FinancialConfigurationContractRepository financialConfigurationContractRepository;

	private BillPayeeDetailESRepository billPayeeDetailESRepository;

	private String persistThroughKafka;

	@Autowired
	public BillPayeeDetailRepository(BillPayeeDetailJdbcRepository billPayeeDetailJdbcRepository, BillPayeeDetailQueueRepository billPayeeDetailQueueRepository,
			FinancialConfigurationContractRepository financialConfigurationContractRepository, BillPayeeDetailESRepository billPayeeDetailESRepository,
			@Value("${persist.through.kafka}") String persistThroughKafka) {
		this.billPayeeDetailJdbcRepository = billPayeeDetailJdbcRepository;
		this.billPayeeDetailQueueRepository = billPayeeDetailQueueRepository;
		this.financialConfigurationContractRepository = financialConfigurationContractRepository;
		this.billPayeeDetailESRepository = billPayeeDetailESRepository;
		this.persistThroughKafka = persistThroughKafka;

	}

	@Transactional
	public List<BillPayeeDetail> save(List<BillPayeeDetail> billpayeedetails, RequestInfo requestInfo) {

		ModelMapper mapper = new ModelMapper();
		BillPayeeDetailContract contract;
		Map<String, Object> message = new HashMap<>();

		if (persistThroughKafka != null && !persistThroughKafka.isEmpty()
				&& persistThroughKafka.equalsIgnoreCase("yes")) {

			BillPayeeDetailRequest request = new BillPayeeDetailRequest();
			request.setRequestInfo(requestInfo);
			request.setBillPayeeDetails(new ArrayList<>());

			for (BillPayeeDetail f : billpayeedetails) {

				contract = new BillPayeeDetailContract();
				contract.setCreatedDate(new Date());
				mapper.map(f, contract);
				request.getBillPayeeDetails().add(contract);

			}
			message.put("billPayeeDetail_create", request);
			billPayeeDetailQueueRepository.add(message);

			return billpayeedetails;
		} else {

			List<BillPayeeDetail> resultList = new ArrayList<BillPayeeDetail>();

			for (BillPayeeDetail f : billpayeedetails) {

				resultList.add(save(f));
			}

			BillPayeeDetailRequest request = new BillPayeeDetailRequest();
			request.setRequestInfo(requestInfo);
			request.setBillPayeeDetails(new ArrayList<>());

			for (BillPayeeDetail f : resultList) {

				contract = new BillPayeeDetailContract();
				contract.setCreatedDate(new Date());
				mapper.map(f, contract);
				request.getBillPayeeDetails().add(contract);

			}

			message.put("billPayeeDetail_create", request);
			billPayeeDetailQueueRepository.addToSearch(message);

			return resultList;
		}

	}

	@Transactional
	public List<BillPayeeDetail> update(List<BillPayeeDetail> billpayeedetails, RequestInfo requestInfo) {
		ModelMapper mapper = new ModelMapper();
		Map<String, Object> message = new HashMap<>();
		BillPayeeDetailRequest request = new BillPayeeDetailRequest();
		BillPayeeDetailContract contract;
		if (persistThroughKafka != null && !persistThroughKafka.isEmpty()
				&& persistThroughKafka.equalsIgnoreCase("yes")) {

			request.setRequestInfo(requestInfo);
			request.setBillPayeeDetails(new ArrayList<>());
			for (BillPayeeDetail f : billpayeedetails) {
				contract = new BillPayeeDetailContract();
				contract.setCreatedDate(new Date());
				mapper.map(f, contract);
				request.getBillPayeeDetails().add(contract);
			}
			message.put("billPayeeDetail_update", request);
			billPayeeDetailQueueRepository.add(message);
			return billpayeedetails;
		} else {
			List<BillPayeeDetail> resultList = new ArrayList<BillPayeeDetail>();
			for (BillPayeeDetail f : billpayeedetails) {
				resultList.add(update(f));
			}
			request.setRequestInfo(requestInfo);
			request.setBillPayeeDetails(new ArrayList<>());
			for (BillPayeeDetail f : resultList) {
				contract = new BillPayeeDetailContract();
				contract.setCreatedDate(new Date());
				mapper.map(f, contract);
				request.getBillPayeeDetails().add(contract);
			}
			message.put("billPayeeDetail_persisted", request);
			billPayeeDetailQueueRepository.addToSearch(message);
			return resultList;
		}

	}

	public String getNextSequence() {
		return billPayeeDetailJdbcRepository.getSequence(BillPayeeDetailEntity.SEQUENCE_NAME);
	}

	public BillPayeeDetail findById(BillPayeeDetail billPayeeDetail) {
		BillPayeeDetailEntity entity = billPayeeDetailJdbcRepository.findById(new BillPayeeDetailEntity().toEntity(billPayeeDetail));
		return entity.toDomain();

	}

	@Transactional
	public BillPayeeDetail save(BillPayeeDetail billPayeeDetail) {
		BillPayeeDetailEntity entity = billPayeeDetailJdbcRepository.create(new BillPayeeDetailEntity().toEntity(billPayeeDetail));
		
		return entity.toDomain();
		
	}

	@Transactional
	public BillPayeeDetail update(BillPayeeDetail billPayeeDetail) {
		BillPayeeDetailEntity entity = billPayeeDetailJdbcRepository.update(new BillPayeeDetailEntity().toEntity(billPayeeDetail));
		return entity.toDomain();
	}


	public Pagination<BillPayeeDetail> search(BillPayeeDetailSearch domain) {
		if (!financialConfigurationContractRepository.fetchDataFrom().isEmpty()
				&& financialConfigurationContractRepository.fetchDataFrom().equalsIgnoreCase("es")) {
			BillPayeeDetailSearchContract billPayeeDetailSearchContract = new BillPayeeDetailSearchContract();
			ModelMapper mapper = new ModelMapper();
			mapper.map(domain, billPayeeDetailSearchContract);
			return billPayeeDetailESRepository.search(billPayeeDetailSearchContract);
		} else {
			return billPayeeDetailJdbcRepository.search(domain);
		}

	}

	public boolean uniqueCheck(String fieldName, BillPayeeDetail billPayeeDetail) {
		return	billPayeeDetailJdbcRepository.uniqueCheck(fieldName, new BillPayeeDetailEntity().toEntity(billPayeeDetail));
	}

}
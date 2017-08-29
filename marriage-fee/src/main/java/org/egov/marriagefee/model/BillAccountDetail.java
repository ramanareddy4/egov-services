package org.egov.marriagefee.model;

import java.math.BigDecimal;

import javax.xml.crypto.KeySelector.Purpose;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillAccountDetail {

	private String id;

	private String tenantId;

	private String billDetail;
	
	private String glcode;

	private Integer order;

	private String accountDescription;
	
	private BigDecimal crAmountToBePaid;

	private BigDecimal creditAmount;

	private BigDecimal debitAmount;

	private Boolean isActualDemand;

	private Purpose purpose;
}
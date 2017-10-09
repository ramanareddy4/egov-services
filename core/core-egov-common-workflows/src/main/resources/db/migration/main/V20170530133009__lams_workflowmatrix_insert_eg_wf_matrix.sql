delete from eg_wf_matrix where objecttype='Agreement';

INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate, createdby, createddate, lastmodifiedby, lastmodifieddate, version, tenantid) VALUES (nextval('seq_eg_wf_matrix'), 'ANY', 'Agreement', 'NEW', NULL, NULL, 'Senior Assistant,Junior Assistant', 'NEW AGREEMENT', 'Assistant Approved', 'Payament Pending', 'Revenue Officer', 'Assistant Approved', NULL, NULL, NULL, '2017-01-01', '2099-04-01', NULL, NULL, NULL, NULL, NULL, 'ap.kurnool');

INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate, createdby, createddate, lastmodifiedby, lastmodifieddate, version, tenantid) VALUES (nextval('seq_eg_wf_matrix'), 'ANY', 'Agreement', 'Assistant Approved', NULL, NULL, 'Revenue Officer', 'NEW AGREEMENT', 'Advance Paid', 'Revenue Officer Approval Pending', 'Revenue Officer', 'Advance Paid', 'Reject', NULL, NULL, '2017-01-01', '2099-04-01', NULL, NULL, NULL, NULL, NULL, 'ap.kurnool');

INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate, createdby, createddate, lastmodifiedby, lastmodifieddate, version, tenantid) VALUES (nextval('seq_eg_wf_matrix'), 'ANY', 'Agreement', 'Advance Paid', NULL, NULL, 'Revenue Officer', 'NEW AGREEMENT', 'Revenue Officer Approved', 'Commissioner Approval Pending', 'Commissioner', 'Revenue Officer Approved', 'Forward,Reject', NULL, NULL, '2017-01-01', '2099-04-01', NULL, NULL, NULL, NULL, NULL, 'ap.kurnool');

INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate, createdby, createddate, lastmodifiedby, lastmodifieddate, version, tenantid) VALUES (nextval('seq_eg_wf_matrix'), 'ANY', 'Agreement', 'Revenue Officer Approved', NULL, NULL, 'Commissioner', 'NEW AGREEMENT', 'Commissioner Approved', 'Notice Print Pending', 'Senior Assistant,Junior Assistant', 'Commissioner Approved', 'Approve,Reject', NULL, NULL, '2017-01-01', '2099-04-01', NULL, NULL, NULL, NULL, NULL, 'ap.kurnool');

INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate, createdby, createddate, lastmodifiedby, lastmodifieddate, version, tenantid) VALUES (nextval('seq_eg_wf_matrix'), 'ANY', 'Agreement', 'Commissioner approved', NULL, NULL, 'Senior Assistant, Junior Assistant', 'NEW AGREEMENT', 'END', 'END', NULL, NULL, 'Print Notice', NULL, NULL, '2017-01-01', '2099-04-01', NULL, NULL, NULL, NULL, NULL, 'ap.kurnool');

INSERT INTO eg_wf_matrix (id, department, objecttype, currentstate, currentstatus, pendingactions, currentdesignation, additionalrule, nextstate, nextaction, nextdesignation, nextstatus, validactions, fromqty, toqty, fromdate, todate, createdby, createddate, lastmodifiedby, lastmodifieddate, version, tenantid) VALUES (nextval('seq_eg_wf_matrix'), 'ANY', 'Agreement', 'Rejected', NULL, NULL, 'Senior Assistant, Junior Assistant', 'NEW AGREEMENT', 'Assistant Approved', 'Assistant Approval Pending', 'Revenue Officer', 'Assistant Approved', 'Forward,Reject', NULL, NULL, '2017-01-01', '2099-04-01', NULL, NULL, NULL, NULL, NULL, 'ap.kurnool');


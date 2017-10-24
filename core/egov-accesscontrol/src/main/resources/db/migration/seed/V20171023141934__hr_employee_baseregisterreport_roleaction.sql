insert into eg_action(id, name,url,servicecode,queryparams,parentmodule,ordernumber,displayname,enabled,createdby,createddate,lastmodifiedby,lastmodifieddate)values(nextval('SEQ_EG_ACTION'),'EmployeeBaseRegisterReport','/hr-employee/employees/_baseregisterreport','Employee',null,(select id from service where name='HR Report' and tenantid='default'),1,'EmployeeBaseRegisterReport',false,1,now(),1,now());

insert into eg_roleaction(roleCode,actionid,tenantid)values('SUPERUSER', (select id from eg_action where name = 'EmployeeBaseRegisterReport'),'default');
insert into eg_roleaction(roleCode,actionid,tenantid)values('EMPLOYEE ADMIN', (select id from eg_action where name = 'EmployeeBaseRegisterReport'),'default');
insert into eg_roleaction(roleCode,actionid,tenantid)values('EMPLOYEE', (select id from eg_action where name = 'EmployeeBaseRegisterReport'),'default');
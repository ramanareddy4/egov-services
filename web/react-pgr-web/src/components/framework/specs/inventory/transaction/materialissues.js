var name;
name = JSON.parse(localStorage.getItem("userRequest")).name;


var dat =
{
   "inventory.search": {
      "numCols": 4,
      "useTimestamp": true,
      "objectName": "",
      "url": "/inventory-inventory/v110/materialissues/_search",
      "groups": [
         {
            "name": "search",
            "label": "inventory.search.title",
            "fields": [
               {
                  "name": "ids",
                  "jsonPath": "ids",
                  "label": "inventory.create.ids",
                  "type": "",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.ids"
               },
               {
                  "name": "fromStore",
                  "jsonPath": "fromStore",
                  "label": "inventory.create.fromStore",
                  "type": "text",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.fromStore"
               },
               {
                  "name": "toStore",
                  "jsonPath": "toStore",
                  "label": "inventory.create.toStore",
                  "type": "text",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.toStore"
               },
               {
                  "name": "issueNoteNumber",
                  "jsonPath": "issueNoteNumber",
                  "label": "inventory.create.issueNoteNumber",
                  "type": "text",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.issueNoteNumber"
               },
               {
                  "name": "issueDate",
                  "jsonPath": "issueDate",
                  "label": "inventory.create.issueDate",
                  "type": "number",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.issueDate"
               },
               {
                  "name": "materialIssueStatus",
                  "jsonPath": "materialIssueStatus",
                  "label": "inventory.create.materialIssueStatus",
                  "type": "singleValueList",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.materialIssueStatus"
               },
               {
                  "name": "description",
                  "jsonPath": "description",
                  "label": "inventory.create.description",
                  "type": "text",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.description"
               },
               {
                  "name": "totalIssueValue",
                  "jsonPath": "totalIssueValue",
                  "label": "inventory.create.totalIssueValue",
                  "type": "number",
                  "isDisabled": false,
                  "patternErrorMsg": "inventory.create.field.message.totalIssueValue"
               },
               {
                  "name": "sortBy",
                  "jsonPath": "sortBy",
                  "label": "inventory.create.sortBy",
                  "type": "text",
                  "isDisabled": false,
                  "defaultValue": "id",
                  "patternErrorMsg": "inventory.create.field.message.sortBy"
               }
            ]
         }
      ],
      "result": {
         "header": [
            {
               "label": "inventory.search.result.indentNumber"
            },
            {
               "label": "inventory.search.result.indentDate"
            },
            {
               "label": "inventory.search.result.storeName"
            },
            {
               "label": "inventory.search.result.indentPurpose"
            },
            {
               "label": "inventory.search.result.raisedBy"
            },
            {
               "label": "inventory.search.result.indentStatus"
            }
         ],
         "values": [
            "indent.indentNumber",
            "indent.indentDate",
            "indent.indentStore.name",
            "indent.indentPurpose",
            "indent.indentCreatedBy",
            "indent.indentStatus"
         ],
         "resultPath": "materialissues",
         "rowClickUrlUpdate": "/update/materialissues/{indentNumber}",
         "rowClickUrlView": "/view/materialissues/{indentNumber}",
         "rowClickUrlCreate": "/create/materialissues/{indentNumber}"
      }
   },
   "inventory.create": {
      "numCols": 4,
      "useTimestamp": true,
      "objectName": "materialIssues",
      "groups": [
         {
            "name": "MaterialIssues1",
            "label": "inventory.create.group.title.MaterialIssues1",
            "fields": [
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].fromStore.name",
                  "label": "inventory.create.fromStore.name",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name",
                  "url": "inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name|$..name|$..name"
               },
               {
                  "name": "issueDate",
                  "jsonPath": "materialIssues[0].issueDate",
                  "label": "inventory.create.issueDate",
                  "pattern": "",
                  "type": "datePicker",
                  "isRequired": true,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "indentstorename",
                  "jsonPath": "materialIssues[0].indent.indentStore.name",
                  "label": "inventory.create.indentStore.name",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "",
                  "url": "inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentStore.name"
               },
               {
                  "name": "departmentname",
                  "jsonPath": "materialIssues[0].indent.department.name",
                  "label": "inventory.create.department.name",
                  "pattern": "",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 64,
                  "minLength": 8,
                  "patternErrorMsg": "",
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].department.name"
               },
               {
                  "name": "indentNumber",
                  "jsonPath": "materialIssues[0].indent.indentNumber",
                  "label": "inventory.create.indent.indentNumber",
                  "pattern": "",
                  "type": "autoCompelete",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 64,
                  "patternErrorMsg": "",
                  "url":"inventory-services/indents/_search/indentNumber={indentNumber}?|$.indents[*].indentNumber"
               },
               {
                  "name": "issuedToEmployee",
                  "jsonPath": "materialIssues[0].issuedToEmployee",
                  "label": "inventory.create.issuedToEmployee",
                  "pattern": "",
                  "type": "singleValueList",
                  "isRequired": false,
                  "defaultValue": "",
                  "patternErrorMsg": "",
                  "url": "/hr-employee/employees/_search?active=true|$.Employee[*].name|$.Employee[*].name|$.Employee[*].assignments.designation",
		  "depedants":[
			     {
                               "jsonPath":"materialIssues[0].issuedToDesignation",
                               "type":"textField",
                               "valExp":"getValFromDropdownData('designations', getVal('materialIssues[0].issuedToEmployee'), 'others[0]')"
                             }
		  ]
                 /* "autoCompleteDependancy": {
                     "autoCompleteUrl": "/hr-masters/designations/_search?&id=",
                     "autoFillFields": {
                        "materialIssues[0].issuedToDesignation": "materialIssues[0].issuedToDesignation"
                     }
                  }*/
               },

	       {
                  "name": "designation",
                  "jsonPath": "designations",
                  "label": "inventory.create.fromStore.name",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
		  "hide":true,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name",
                  "url": "/hr-masters/designations/_search?|$..code|$..name"
               },	       

               {
                  "name": "issuedToDesignation",
                  "jsonPath": "materialIssues[0].issuedToDesignation",
                  "label": "inventory.create.issuedToDesignation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "description",
                  "jsonPath": "materialIssues[0].description",
                  "label": "inventory.create.description",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 512,
                  "patternErrorMsg": ""
               },
               {
                  "name": "issuedBy",
                  "jsonPath": "",
                  "label": "inventory.create.issuedBy",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": name,
                  "patternErrorMsg": ""
                  
               },
               {
                  "name": "designation",
                  "jsonPath": "materialIssues[0].designation",
                  "label": "inventory.create.designation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "materialIssueStatus",
                  "jsonPath": "materialIssues[0].materialIssueStatus",
                  "label": "inventory.create.materialIssueStatus",
                  "pattern": "",
                  "type": "text",
                  "isRequired": true,
                  "isDisabled": true,
                  "defaultValue": "Created",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": ""
               }
            ]
         },
         {
            "name": "MaterialIssues2",
            "label": "inventory.create.group.title.MaterialIssues2",
            "fields": [
          {
            "type": "tableList",
            "jsonPath": "materialIssues[0].materialIssueDetails[0]",
            "tableList": {
              "header": [
                {
                  "label": "inventory.material.name"
                },
                {
                  "label": "inventory.totalIndentQtyRequired"
                },
                {
                  "label": "inventory.balanceQuantity"
                },
                {
                  "label": "inventory.quantityIssued"
                },
                {
                  "label": "inventory.uom"
                },
                {
                  "label": "inventory.unitrate"
                },
                {
                  "label": "inventory.balanceQuantityAfterIssue"
                },
                {
                  "label": "inventory.totalValue"
                },
                {
                  "label": "inventory.assetCode"
                },
                {
                  "label": "inventory.projectCode"
                },
                {
                  "label": "inventory.description"
                }
              ],
              "values": [
                {
                  "name": "materialName",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.material.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": true,
                  "url": ""
                },
                {
                  "name": "totalIndentQtyRequired",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.indentQuantity",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "balanceQuantity",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].quantityToBeIssued",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "quantityIssued",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].quantityIssued",
                  "pattern": "",
                  "type": "text",
                  "isRequired": true,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "uom",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "unitRate",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "balanceQuantityAfterIssue",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "url": ""
                },
                {
                  "name": "totalValue",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].value",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                },
                {
                  "name": "assetCode",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.asset.code",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                },
                {
                  "name": "projectCode",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].value",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                },
                {
                  "name": "description",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].description",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                }
              ]
              }
             }
            ]
   },
   {
            "name": "MaterialIssues3",
            "label": "inventory.create.group.title.MaterialIssues3",
            "fields": [
            {
                  "name": "approvalDate",
                  "label": "inventory.create.approvalDate",
                  "jsonPath": "materialIssues[0].workFlowDetails.approvalDate",
                  "pattern": "",
                  "type": "datePicker",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
               {
                  "name": "approverName",
                  "label": "inventory.create.approverName",
                  "jsonPath": "materialIssues[0].workFlowDetails.senderName",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
              {
                  "name": "approverDesignation",
                  "label": "inventory.create.designation",
                  "jsonPath": "materialIssues[0].workFlowDetails.designation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
                },
               {
                  "name": "approvalStatus",
                  "label": "inventory.create.approvalStatus",
                  "jsonPath": "materialIssues[0].workFlowDetails.status",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "url":"",
                  "patternErrorMsg": ""
               },
               {
                  "name": "approvalRemarks",
                  "label": "inventory.create.approvalRemarks",
                  "jsonPath": "materialIssues[0].workFlowDetails.details",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               }
                 ]
    }
],
  "url": "/inventory-inventory/v110/materialissues/_create",
      "tenantIdRequired": true
},
   "inventory.view": {
      "numCols": 4,
      "useTimestamp": true,
      "objectName": "materialIssues",
      "groups": [
         {
            "name": "MaterialIssues1",
            "label": "inventory.create.group.title.MaterialIssues1",
            "fields": [
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].fromStore.name",
                  "label": "inventory.create.fromStore.name",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name",
                  "url": "inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name|$..name|$..name"
               },
               {
                  "name": "issueDate",
                  "jsonPath": "materialIssues[0].issueDate",
                  "label": "inventory.create.issueDate",
                  "pattern": "",
                  "type": "number",
                  "isRequired": true,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].indent.indentStore.name",
                  "label": "inventory.create.indentStore.name",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name"
               },
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].indent.department.name",
                  "label": "inventory.create.department.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 64,
                  "minLength": 8,
                  "patternErrorMsg": ""
               },
               {
                  "name": "indentNumber",
                  "jsonPath": "materialIssues[0].indent.indentNumber",
                  "label": "inventory.create.indent.indentNumber",
                  "pattern": "",
                  "type": "textSearch",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 64,
                  "patternErrorMsg": "",
                  "autoCompleteDependancy": {
                     "autoCompleteUrl": "/indents/_search/indentNumber={indentNumber}",
                     "autoFillFields": {
                        "materialIssues[0].indent.indentStore.name": "materialIssues[0].indent.indentStore.name",
                        "materialIssues[0].indent.department.name": "materialIssues[0].indent.department.name",
                        "materialIssues[0].indent.indentNumber": "materialIssues[0].indent.indentNumber"
                     }
                  }
               },
               {
                  "name": "issuedToEmployee",
                  "jsonPath": "materialIssues[0].issuedToEmployee",
                  "label": "inventory.create.issuedToEmployee",
                  "pattern": "",
                  "type": "textSearch",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": "",
                  "url": "/hr-employee/employees/_search?active=true| $.employees[*].name|$..name|$..name",
                  "autoCompleteDependancy": {
                     "autoCompleteUrl": "/hr-masters/designations/_search",
                     "autoFillFields": {
                        "materialIssues[0].issuedToDesignation": "materialIssues[0].issuedToDesignation"
                     }
                  }
               },
               {
                  "name": "issuedToDesignation",
                  "jsonPath": "materialIssues[0].issuedToDesignation",
                  "label": "inventory.create.issuedToDesignation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "description",
                  "jsonPath": "materialIssues[0].description",
                  "label": "inventory.create.description",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 512,
                  "patternErrorMsg": ""
               },
               {
                  "name": "designation",
                  "jsonPath": "materialIssues[0].designation",
                  "label": "inventory.create.designation",
                  "pattern": "",
                  "type": "",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "materialIssueStatus",
                  "jsonPath": "materialIssues[0].materialIssueStatus",
                  "label": "inventory.create.materialIssueStatus",
                  "pattern": "",
                  "type": "singleValueList",
                  "isRequired": true,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": ""
               }
            ]
         },
         {
            "name": "MaterialIssues2",
            "label": "inventory.create.group.title.MaterialIssues2",
            "fields": [
               {
                  "name": "indentQuantity",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.indentQuantity",
                  "label": "inventory.create.indentDetail.indentQuantity",
                  "pattern": "",
                  "type": "number",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].uom.name",
                  "label": "inventory.create.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "value",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].value",
                  "label": "inventory.create.materialIssueDetails[0].value",
                  "pattern": "",
                  "type": "number",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "assetCode",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.asset.code",
                  "label": "inventory.create.asset.code",
                  "pattern": "",
                  "type": "",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "projectCode",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.projectCode.code",
                  "label": "inventory.create.projectCode.code",
                  "pattern": "[a-zA-Z0-9-\\\\]+",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 100,
                  "patternErrorMsg": "inventory.create.field.message.code"
               },
               {
                  "name": "description",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].description",
                  "label": "inventory.create.materialIssueDetails[0].description",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 512,
                  "patternErrorMsg": ""
               }
            ]
         }
      ],
      "tenantIdRequired": true,
      "url": "/inventory-inventory/v110/indents/_search?indentNumber={indentNumber}"
   },
   "inventory.update": {
      "numCols": 4,
      "useTimestamp": true,
      "objectName": "materialIssues",
      "groups": [
         {
            "name": "MaterialIssues1",
            "label": "inventory.create.group.title.MaterialIssues1",
            "fields": [
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].fromStore.name",
                  "label": "inventory.create.fromStore.name",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name",
                  "url": "inventory-services/stores/_search?|$.stores[*].code|$.stores[*].name|$..name|$..name"
               },
               {
                  "name": "issueDate",
                  "jsonPath": "materialIssues[0].issueDate",
                  "label": "inventory.create.issueDate",
                  "pattern": "",
                  "type": "number",
                  "isRequired": true,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].indent.indentStore.name",
                  "label": "inventory.create.indentStore.name",
                  "pattern": "^[a-zA-Z ]+$",
                  "type": "singleValueList",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": "inventory.create.field.message.name"
               },
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].indent.department.name",
                  "label": "inventory.create.department.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 64,
                  "minLength": 8,
                  "patternErrorMsg": ""
               },
               {
                  "name": "indentNumber",
                  "jsonPath": "materialIssues[0].indent.indentNumber",
                  "label": "inventory.create.indent.indentNumber",
                  "pattern": "",
                  "type": "textSearch",
                  "isRequired": false,
                  "isDisabled": true,
                  "defaultValue": "",
                  "maxLength": 64,
                  "patternErrorMsg": "",
                  "autoCompleteDependancy": {
                     "autoCompleteUrl": "/indents/_search/indentNumber={indentNumber}",
                     "autoFillFields": {
                        "materialIssues[0].indent.indentStore.name": "materialIssues[0].indent.indentStore.name",
                        "materialIssues[0].indent.department.name": "materialIssues[0].indent.department.name",
                        "materialIssues[0].indent.indentNumber": "materialIssues[0].indent.indentNumber"
                     }
                  }
               },
               {
                  "name": "issuedToEmployee",
                  "jsonPath": "materialIssues[0].issuedToEmployee",
                  "label": "inventory.create.issuedToEmployee",
                  "pattern": "",
                  "type": "textSearch",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": "",
                  "url": "/hr-employee/employees/_search?active=true| $.employees[*].name|$..name|$..name",
                  "autoCompleteDependancy": {
                     "autoCompleteUrl": "/hr-masters/designations/_search?&id=",
                     "autoFillFields": {
                        "materialIssues[0].issuedToDesignation": "materialIssues[0].issuedToDesignation"
                     }
                  }
               },
               {
                  "name": "issuedToDesignation",
                  "jsonPath": "materialIssues[0].issuedToDesignation",
                  "label": "inventory.create.issuedToDesignation",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "description",
                  "jsonPath": "materialIssues[0].description",
                  "label": "inventory.create.description",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 512,
                  "patternErrorMsg": ""
               },
               {
                  "name": "designation",
                  "jsonPath": "materialIssues[0].designation",
                  "label": "inventory.create.designation",
                  "pattern": "",
                  "type": "",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "materialIssueStatus",
                  "jsonPath": "materialIssues[0].materialIssueStatus",
                  "label": "inventory.create.materialIssueStatus",
                  "pattern": "",
                  "type": "singleValueList",
                  "isRequired": true,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 50,
                  "minLength": 5,
                  "patternErrorMsg": ""
               }
            ]
         },
         {
            "name": "MaterialIssues2",
            "label": "inventory.create.group.title.MaterialIssues2",
            "fields": [
               {
                  "name": "indentQuantity",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.indentQuantity",
                  "label": "inventory.create.indentDetail.indentQuantity",
                  "pattern": "",
                  "type": "number",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "name",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].uom.name",
                  "label": "inventory.create.uom.name",
                  "pattern": "",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "value",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].value",
                  "label": "inventory.create.materialIssueDetails[0].value",
                  "pattern": "",
                  "type": "number",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "code",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.asset.code",
                  "label": "inventory.create.asset.code",
                  "pattern": "",
                  "type": "",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "patternErrorMsg": ""
               },
               {
                  "name": "code",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].indentDetail.projectCode.code",
                  "label": "inventory.create.projectCode.code",
                  "pattern": "[a-zA-Z0-9-\\\\]+",
                  "type": "text",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 100,
                  "patternErrorMsg": "inventory.create.field.message.code"
               },
               {
                  "name": "description",
                  "jsonPath": "materialIssues[0].materialIssueDetails[0].description",
                  "label": "inventory.create.materialIssueDetails[0].description",
                  "pattern": "",
                  "type": "textarea",
                  "isRequired": false,
                  "isDisabled": false,
                  "defaultValue": "",
                  "maxLength": 512,
                  "patternErrorMsg": ""
               }
            ]
         }
      ],
      "url": "/inventory-inventory/v110/materialissues/_update",
      "tenantIdRequired": true,
      "searchUrl": "/inventory-inventory/v110/indents/_search?indentNumber={indentNumber}"
   }
}
export default dat;

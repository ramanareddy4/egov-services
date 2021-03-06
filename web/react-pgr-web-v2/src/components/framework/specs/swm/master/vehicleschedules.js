var dat = {
   "swm.search":{
      "numCols":4,
      "useTimestamp":true,
      "objectName":"",
      "url":"/swm-services/vehicleschedules/_search",
      "groups":[
         {
            "name":"search",
            "label":"swm.search.title",
            "fields":[
               {
                  "name":"transactionNos",
                  "jsonPath":"transactionNos",
                  "label":"swm.create.transactionNos",
                  "type":"",
                  "isDisabled":false,
                  "patternErrorMsg":"swm.create.field.message.transactionNos"
               },
               {
                  "name":"transactionNo",
                  "jsonPath":"transactionNo",
                  "label":"swm.create.transactionNo",
                  "type":"text",
                  "isDisabled":false,
                  "patternErrorMsg":"swm.create.field.message.transactionNo"
               },
               {
                  "name":"routeCode",
                  "jsonPath":"routeCode",
                  "label":"swm.create.routeCode",
                  "type":"text",
                  "isDisabled":false,
                  "patternErrorMsg":"swm.create.field.message.routeCode"
               },
               {
                  "name":"regNumber",
                  "jsonPath":"regNumber",
                  "label":"swm.create.regNumber",
                  "type":"text",
                  "isDisabled":false,
                  "patternErrorMsg":"swm.create.field.message.regNumber"
               },
               {
                  "name":"scheduledFrom",
                  "jsonPath":"scheduledFrom",
                  "label":"swm.create.scheduledFrom",
                  "type":"number",
                  "isDisabled":false,
                  "patternErrorMsg":"swm.create.field.message.scheduledFrom"
               },
               {
                  "name":"scheduledTo",
                  "jsonPath":"scheduledTo",
                  "label":"swm.create.scheduledTo",
                  "type":"number",
                  "isDisabled":false,
                  "patternErrorMsg":"swm.create.field.message.scheduledTo"
               },
               {
                  "name":"offSet",
                  "jsonPath":"offSet",
                  "label":"swm.create.offSet",
                  "type":"number",
                  "isDisabled":false,
                  "patternErrorMsg":"swm.create.field.message.offSet"
               }
            ]
         }
      ],
      "result":{
         "header":[
            {
               "label":"swm.search.result.scheduledFrom"
            },
            {
               "label":"swm.search.result.scheduledTo"
            },
            {
               "label":"swm.search.result.targetedGarbage"
            }
         ],
         "values":[
            "vehicleSchedules[0].scheduledFrom",
            "vehicleSchedules[0].scheduledTo",
            "vehicleSchedules[0].targetedGarbage"
         ],
         "resultPath":"vehicleSchedules",
         "rowClickUrlUpdate":"/update/swm/vehicleSchedules/{transactionNo}",
         "rowClickUrlView":"/view/swm/vehicleSchedules/{transactionNo}"
      }
   },
   "swm.create":{
      "numCols":4,
      "useTimestamp":true,
      "objectName":"vehicleSchedules",
      "groups":[
         {
            "name":"SourceSegregationDetails",
            "label":"swm.create.group.title.SourceSegregationDetails",
            "fields":[
               {
                  "name":"scheduledFrom",
                  "jsonPath":"vehicleSchedules[0].scheduledFrom",
                  "label":"swm.create.scheduledFrom",
                  "pattern":"",
                  "type":"datePicker",
                  "isRequired":true,
                  "isDisabled":false,
                  "defaultValue":"",
                  "patternErrorMsg":""
               },
               {
                  "name":"scheduledTo",
                  "jsonPath":"vehicleSchedules[0].scheduledTo",
                  "label":"swm.create.scheduledTo",
                  "pattern":"",
                  "type":"datePicker",
                  "isRequired":true,
                  "isDisabled":false,
                  "defaultValue":"",
                  "patternErrorMsg":""
               },
               {
            	  "name": "route",
            	  "jsonPath": "vehicleSchedules[0].route",
                  "label": "swm.create.route",
                  "type": "singleValueList",
                  "isRequired": true,
                  "isDisabled": false,
                  "maxLength": 256,
                  "minLength": 1,
                  "patternErrorMsg": "",
          	   },
               {
                  "name":"targetedGarbage",
                  "jsonPath":"vehicleSchedules[0].targetedGarbage",
                  "label":"swm.create.targetedGarbage",
                  "pattern":"",
                  "type":"text",
                  "isRequired":true,
                  "isDisabled":false,
                  "defaultValue":"",
                  "patternErrorMsg":""
               }
            ]
         }
      ],
      "url":"/swm-services/vehicleschedules/_create",
      "tenantIdRequired":true
   },
   "swm.view":{
      "numCols":4,
      "useTimestamp":true,
      "objectName":"vehicleSchedules",
      "groups":[
         {
            "name":"SourceSegregationDetails",
            "label":"swm.create.group.title.SourceSegregationDetails",
            "fields":[
               {
                  "name":"scheduledFrom",
                  "jsonPath":"vehicleSchedules[0].scheduledFrom",
                  "label":"swm.create.scheduledFrom",
                  "pattern":"",
                  "type":"number",
                  "isRequired":true,
                  "isDisabled":false,
                  "defaultValue":"",
                  "patternErrorMsg":""
               },
               {
                  "name":"scheduledTo",
                  "jsonPath":"vehicleSchedules[0].scheduledTo",
                  "label":"swm.create.scheduledTo",
                  "pattern":"",
                  "type":"number",
                  "isRequired":true,
                  "isDisabled":false,
                  "defaultValue":"",
                  "patternErrorMsg":""
               },
               {
                  "name":"targetedGarbage",
                  "jsonPath":"vehicleSchedules[0].targetedGarbage",
                  "label":"swm.create.targetedGarbage",
                  "pattern":"",
                  "type":"number",
                  "isRequired":true,
                  "isDisabled":false,
                  "defaultValue":"",
                  "patternErrorMsg":""
               }
            ]
         }
      ],
      "tenantIdRequired":true,
      "url":"/swm-servicesundefined"
   },
   "swm.update":{
      "numCols":4,
      "useTimestamp":true,
      "objectName":"vehicleSchedules",
      "groups":[
         {
            "name":"SourceSegregationDetails",
            "label":"swm.create.group.title.SourceSegregationDetails",
            "fields":[
               {
                  "name":"scheduledFrom",
                  "jsonPath":"vehicleSchedules[0].scheduledFrom",
                  "label":"swm.create.scheduledFrom",
                  "pattern":"",
                  "type":"number",
                  "isRequired":true,
                  "isDisabled":false,
                  "defaultValue":"",
                  "patternErrorMsg":""
               },
               {
                  "name":"scheduledTo",
                  "jsonPath":"vehicleSchedules[0].scheduledTo",
                  "label":"swm.create.scheduledTo",
                  "pattern":"",
                  "type":"number",
                  "isRequired":true,
                  "isDisabled":false,
                  "defaultValue":"",
                  "patternErrorMsg":""
               },
               {
                  "name":"targetedGarbage",
                  "jsonPath":"vehicleSchedules[0].targetedGarbage",
                  "label":"swm.create.targetedGarbage",
                  "pattern":"",
                  "type":"number",
                  "isRequired":true,
                  "isDisabled":false,
                  "defaultValue":"",
                  "patternErrorMsg":""
               }
            ]
         }
      ],
      "url":"/swm-services/vehicleschedules/_update",
      "tenantIdRequired":true,
      "searchUrl":"/swm-servicesundefined"
   }
}
 export default dat;
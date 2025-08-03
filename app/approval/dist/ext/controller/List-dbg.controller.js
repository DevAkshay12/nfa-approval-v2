sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var filter;
	return ControllerExtension.extend('approval.ext.controller.List', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf approval.ext.controller.List
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			onAfterRendering:async function (oEvent) {
				debugger;

				// var settings = {
				//     // url: baseuri + "odata/v4/catalog/PAN_WORKFLOW_HISTORY_APR",  // URL for fetching the data
				//     url: "/odata/v4/pan-approval/PAN_Details_APR?$filter=Sap_workitem_id ne null",  // URL for fetching the data
				//     method: "GET",  // Use GET method to fetch data
				//     headers: {
				//         "Accept": "application/json"  // Expect JSON response
				//     }
				// };

				// new Promise((resolve, reject) => {
				//     $.ajax(settings)
				//         .done(async (results, textStatus, request) => {
				// 			debugger
				// 		})
				// 		.fail((err) => {
				//             reject(err);  // Handle error if the AJAX request fails
				//         });
				// 	})
				// var name = sap.ushell.Container.getUser().getEmail();


				////////////code/////////
				
				// var busy = new sap.m.BusyDialog({
				// 	title: "Please wait",
				// 	text: "Loading data...",
				// })
				// busy.open();
				// var name = "rajendraakshay1@gmail.com";
				// // var name = "akshay.br@peolsolutions.com";
				// var cFunction = this.base.getModel().bindContext(`/${'getdata'}(...)`);
				// cFunction.setParameter("data", name);
				// await cFunction.execute();
				// let oContext1 = cFunction.getBoundContext();
				// let result1 = oContext1.getObject();
				// var FilterBar = sap.ui.getCore().byId("approval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR::FilterField::PAN_Number");
				// FilterBar.setVisible(false);
				// console.log(result1);
				// if (result1 && result1.value && result1.value.length > 0) {
				// 	const panNumbers = result1.value.map(item => item.PAN_Number); // Collect PANs
			  
				// 	FilterBar.setVisible(false); 
			  
				// 	// Prepare OR filter conditions for multiple PANs
				// 	const panConditions = panNumbers.map(pan => ({
				// 	  operator: "EQ",
				// 	  values: [pan]
				// 	}))
				// 	FilterBar.setConditions(panConditions);
				// 	const searchBtn = sap.ui.getCore().byId("approval::PAN_Details_APRList--fe::FilterBar::PAN_Details_APR-btnSearch");
				// 	searchBtn.firePress();
				// 	busy.close();

				// }
				// else {
				// 	var Table = sap.ui.getCore().byId("approval::PAN_Details_APRList--fe::table::PAN_Details_APR::LineItem-innerTable");
				// 	var oEmptyModel = new sap.ui.model.json.JSONModel([]);
				// 	Table.setModel(oEmptyModel);
				// 	Table.bindAggregation("rows", "/");
				
				// 	// Close the BusyDialog after 6 seconds
				// 	setTimeout(function () {
				// 		busy.close();
				
				// 		// Show the MessageDialog after the BusyDialog is closed
				// 		var oMessageDialog = new sap.m.Dialog({
				// 			title: "Information",
				// 			type: "Message",
				// 			state: "Information", // Indicates that it's an informational message
				// 			content: new sap.m.Text({ text: "There is no request associated with this Email." }),
				// 			beginButton: new sap.m.Button({
				// 				text: "OK",
				// 				press: function () {
				// 					oMessageDialog.close(); // Close the dialog on button press
				// 				}
				// 			}),
				// 			afterClose: function () {
				// 				oMessageDialog.destroy(); // Clean up the dialog after closing
				// 			}
				// 		});
				
				// 		// Open the dialog
				// 		oMessageDialog.open();
				// 	}, 6000); // 6 seconds delay
				// }
				
				

				

			},
			routing: {
				// onAfterBinding1: async function (mBindingInfos) {
				// 	debugger;

				// 	// var settings = {
				// 	//     // url: baseuri + "odata/v4/catalog/PAN_WORKFLOW_HISTORY_APR",  // URL for fetching the data
				// 	//     url: "/odata/v4/pan-approval/PAN_Details_APR?$filter=Sap_workitem_id ne null",  // URL for fetching the data
				// 	//     method: "GET",  // Use GET method to fetch data
				// 	//     headers: {
				// 	//         "Accept": "application/json"  // Expect JSON response
				// 	//     }
				// 	// };

				// 	// new Promise((resolve, reject) => {
				// 	//     $.ajax(settings)
				// 	//         .done(async (results, textStatus, request) => {
				// 	// 			debugger
				// 	// 		})
				// 	// 		.fail((err) => {
				// 	//             reject(err);  // Handle error if the AJAX request fails
				// 	//         });
				// 	// 	})
				// 	// var name = sap.ushell.Container.getUser().getEmail();
				// 	var name = "rajendraakshay1@gmail.com";
				// 	var cFunction = this.base.getModel().bindContext(`/${'getdata'}(...)`);
				// 	cFunction.setParameter("data", name);
				// 	await cFunction.execute();
				// 	let oContext1 = cFunction.getBoundContext();
				// 	let result1 = oContext1.getObject();
				// 	console.log(result1);
				// 	if (result1.value) {
				// 		var pan_number = result1.value[0].PAN_Number;
				// 		filter = {
				// 			PAN_Number: [
				// 				{
				// 					"operator": "EQ",
				// 					"values": [
				// 						pan_number
				// 					],
				// 					"validated": "NotValidated"
				// 				}
				// 			]
				// 		};
				// 	}
					
				// 	var list = sap.ui.getCore().byId("approval::PAN_Details_APRList--fe::ListReport").getContent().mAggregations.content.setFilterConditions(filter);
				// 	console.log(list);

				// }
			}
		}
	});
});

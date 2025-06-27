sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var baseuri;
	return ControllerExtension.extend('approval.ext.controller.Objectpage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf approval.ext.controller.Objectpage
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			editFlow: {
				onAfterSave: async function (oEvent) {
					debugger
				}
			},
			routing: {
				onAfterBinding: async function (oEvent) {
					debugger
					this.getView().byId("approval::PAN_Details_APRObjectPage--fe::FooterBar::CustomAction::Approve").setType("Success")
					this.getView().byId("approval::PAN_Details_APRObjectPage--fe::FooterBar::CustomAction::needforclarification").setType("Critical")
					this.getView().byId("approval::PAN_Details_APRObjectPage--fe::FooterBar::CustomAction::Reject").setType("Negative")
					baseuri = this.getView().getParent().getAppComponent().getManifestObject()._oBaseUri._string;
					debugger
					var workflow_table = sap.ui.getCore().byId("approval::PAN_Details_APRObjectPage--fe::CustomSubSection::Workflow--sampleTable");
					workflow_table.addStyleClass("workFlowTable");
					var settings = {
						url: baseuri + "odata/v4/catalog/WORKFLOW_HISTORY",  // URL for fetching the data
						// url: "/odata/v4/pan-approval/PAN_WORKFLOW_HISTORY_APR",  // URL for fetching the data
						method: "GET",  // Use GET method to fetch data
						headers: {
							"Accept": "application/json"  // Expect JSON response
						}
					};

					// Fetch data and set the model
					new Promise((resolve, reject) => {
						$.ajax(settings)
							.done((results, textStatus, request) => {
								// Create a JSON model and set the data
								var oModel = new sap.ui.model.json.JSONModel();
								oModel.setData({ WORKFLOW_HISTORY: results.value });  // Assuming `results` is an array
								// Set the model to the table
								workflow_table.setModel(oModel);  // Bind the model to the table
								console.log(results);

								// Bind the items to the table
								workflow_table.bindItems({
									path: "/WORKFLOW_HISTORY",  // Path to the array in the model
									template: new sap.m.ColumnListItem({
										cells: [
											new sap.m.Text({ text: "{PAN_Number}" }),
											new sap.m.Text({ text: "{Employee_Name}" }),
											new sap.m.Text({ text: "{level}" }),
											new sap.m.Text({ text: "{Remarks}" }),
											new sap.m.Text({ text: "{Approved_by}" }),
											new sap.m.Text({ text: "{Days_Taken}" })

										]
									})
								});

								resolve(results);
							})
							.fail((err) => {
								reject(err);  // Handle error if the AJAX request fails
							});
					});

					// Define the columns dynamically
					var columns = [
						{ header: "Employee Id", path: "PAN_Number" },
						{ header: "Employee Name", path: "Employee_Name" },
						{ header: "Level", path: "level" },
						{ header: "Status", path: "Remarks" },
						{ header: "Approved By", path: "Approved_by" },
						{ header: "Days Taken", path: "Days_Taken" }
					];

					// Clear existing columns in case of re-binding
					workflow_table.destroyColumns();

					// Add columns dynamically to the table
					columns.forEach(function (col) {
						var column = new sap.m.Column({
							header: new sap.m.Text({ text: col.header })
						});
						workflow_table.addColumn(column);  // Add each column to the table
					});

				}
			}
		}
	});
});

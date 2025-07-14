sap.ui.define([
    "sap/m/MessageToast",
     "sap/m/MessageBox",
    "sap/m/BusyDialog"
], function (MessageToast, MessageBox, BusyDialog) {
    'use strict';

    return {
        Approve: async function (oEvent) {
            debugger
            var email = sap.ushell.Container.getUser().getEmail();
            // var email = "rajendraakshay1@gmail.com"
            var textarea = sap.ui.getCore().byId("approval::PAN_Details_APRObjectPage--fe::CustomSubSection::Textarea--textareafrag");
            if (!textarea || textarea.getValue().trim().length === 0) {
                MessageBox.error("Comments are mandatory ❗", {
                    title: "Error"
                });
                return; 
            }
            MessageBox.confirm("Do you want to approve the request ?", {
                title: "Confirm Approval ✅",
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.YES,
                onClose: async function (oAction) {
                    if (oAction === MessageBox.Action.YES) {
                        var oBusyDialog = new BusyDialog({
                            title: "Processing Approval",
                            text: "Please wait..."
                        });
                        oBusyDialog.open();
                        var id = location.href;
                        const regex = /PAN_Details_APR\('([^']+)'\)/;
                        var val = id.match(regex);
                        console.log("Extracted Document ID:", val ? val[1] : "Not Found");
                        var cFunction = this._view.getModel().bindContext(`/${'approve'}(...)`);
                        cFunction.setParameter("data", val[1]);
                        cFunction.setParameter("email", email);
                        await cFunction.execute();
                        let oContext1 = cFunction.getBoundContext();
                        let result1 = oContext1.getObject();
                        console.log(result1);

                        //code for saving comment from approver into database 
                        var wf_func = this._view.getModel().bindContext(`/${'wf_data'}(...)`);
                        wf_func.setParameter("panno", val[1]);
                        wf_func.setParameter("comment", textarea.getValue());
                        await wf_func.execute();
                        let wf_context = wf_func.getBoundContext();
                        let wf_result = wf_context.getObject();
                        console.log(wf_result);
                        setTimeout(function () {
                            sap.m.MessageToast.show("Approved", {
                                width: "15em",
                                my: "center bottom",
                                at: "center bottom"
                            });
                            oBusyDialog.close();
                            window.history.go(-2);
                        }, 2000);
                    }
                }.bind(this)
            });


        }
    };
});

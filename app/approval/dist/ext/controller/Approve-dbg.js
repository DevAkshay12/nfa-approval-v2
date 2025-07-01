sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        Approve: async function (oEvent) {
            debugger
           
            
            // Show busy dialog after toast is shown
            let oBusyDialog = new sap.m.BusyDialog({
                title: "Processing Approval",
                text: "Please wait..."
            });
            oBusyDialog.open();
            var email = sap.ushell.Container.getUser().getEmail();
            // var email = "akshay.br@peolsolutions.com"
            var textarea = sap.ui.getCore().byId("approval::PAN_Details_APRObjectPage--fe::CustomSubSection::Textarea--textareafrag");
            if (textarea.getValue().length > 0) {
                var id = location.href;
                const regex = /PAN_Details_APR\('([^']+)'\)/;
                var val = id.match(regex);
                console.log("Extracted Document ID:", val ? val[1] : "Not Found");
                var cFunction = this._view.getModel().bindContext(`/${'approve'}(...)`);
                cFunction.setParameter("data", val[1]);
                cFunction.setParameter("email",email);
                await cFunction.execute();
                let oContext1 = cFunction.getBoundContext();
                let result1 = oContext1.getObject();
                console.log(result1);

                //code for saving comment from approver into database 
                var wf_func = this._view.getModel().bindContext(`/${'wf_data'}(...)`);
                wf_func.setParameter("panno", val[1]);
                wf_func.setParameter("comment",textarea.getValue());
                await wf_func.execute();
                let wf_context = wf_func.getBoundContext();
                let wf_result = wf_context.getObject();
                console.log(wf_result);









                // const oRouter = this.getOwnerComponent().getRouter();
                // oRouter.navTo("PAN_Details_APRList");
               

               
                // Automatically close after 2 seconds (optional)
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

            else {
                sap.m.MessageBox.error("Comments are mandatory.", {
                    title: "Error",
                    onClose: function () {

                    }
                });
            }


        }
    };
});

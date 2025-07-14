sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/BusyDialog"
], function (MessageToast, MessageBox, BusyDialog) {
    'use strict';

    return {
        Reject: async function (oEvent) {
            debugger
            var textarea = sap.ui.getCore().byId("approval::PAN_Details_APRObjectPage--fe::CustomSubSection::Textarea--textareafrag");
            if (textarea.getValue().length == 0) {
                sap.m.MessageBox.error("Comments are mandatory ❗", {
                    title: "Error",
                });
                return;
            }
            sap.m.MessageBox.confirm(
                "Do you want to reject the request ?", {
                title: "Confirm Rejection ❌",
                actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                emphasizedAction: sap.m.MessageBox.Action.YES,
                onClose: async function (oAction) {

                    if (!textarea || textarea.getValue().length === 0) {
                        MessageBox.error("Comments are missing.");
                        return;
                    }

                    if (oAction === sap.m.MessageBox.Action.YES) {

                        sap.m.MessageToast.show("Rejected", {
                            width: "15em",
                            my: "center bottom",
                            at: "center bottom"
                        });

                        // Show busy dialog after toast is shown
                        let oBusyDialog = new sap.m.BusyDialog({
                            title: "Processing Rejection",
                            text: "Please wait..."
                        });

                        oBusyDialog.open();

                        if (textarea.getValue().length > 0) {
                            var id = location.href;
                            const regex = /PAN_Details_APR\('([^']+)'\)/;
                            var val = id.match(regex);
                            console.log(val);

                            var wf_func = this._view.getModel().bindContext(`/${'wf_data'}(...)`);
                            wf_func.setParameter("panno", val[1]);
                            wf_func.setParameter("comment", textarea.getValue());
                            await wf_func.execute();
                            let wf_context = wf_func.getBoundContext();
                            let wf_result = wf_context.getObject();
                            console.log(wf_result);

                            var email = sap.ushell.Container.getUser().getEmail();
                            // var email = "rajendraakshay1@gmail.com"
                            var rej_func = this._view.getModel().bindContext(`/${'reject'}(...)`);
                            rej_func.setParameter("data", val[1]);
                            rej_func.setParameter("email", email);
                            await rej_func.execute();
                            let rej_context = rej_func.getBoundContext();
                            let rej_result = rej_context.getObject();
                            console.log(rej_result);



                            // Automatically close after 2 seconds (optional)
                            setTimeout(function () {
                                oBusyDialog.close();
                                window.history.go(-2);
                            }, 2000);
                        }
                    }
                }.bind(this)
            })

        }
    };
});

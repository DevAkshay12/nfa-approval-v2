sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        clarify : async function(oEvent) {
            debugger
            var textarea = sap.ui.getCore().byId("approval::PAN_Details_APRObjectPage--fe::CustomSubSection::Textarea--textareafrag").getValue();
            if(textarea.length>0)
            {
            
            let oBusyDialog = new sap.m.BusyDialog({
                title: "sending for clarification",
                text: "Please wait..."
            });
            oBusyDialog.open();
            var id = location.href;
            const regex = /PAN_Details_APR\('([^']+)'\)/;
            var val = id.match(regex);
            var cFunction = this._view.getModel().bindContext(`/clarify(...)`);
            cFunction.setParameter("panno", val[1]);
            await cFunction.execute();
            let oContext1 = cFunction.getBoundContext();
            debugger
            let result1 = oContext1.getObject();

            var wf_func = this._view.getModel().bindContext(`/${'wf_data'}(...)`);
            wf_func.setParameter("panno", val[1]);
            wf_func.setParameter("comment",textarea);
            await wf_func.execute();
            let wf_context = wf_func.getBoundContext();
            let wf_result = wf_context.getObject();
            console.log(wf_result);


            setTimeout(function () {
                sap.m.MessageToast.show("sent for clarification", {
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

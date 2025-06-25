sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        clarify : async function(oEvent) {
            let oBusyDialog = new sap.m.BusyDialog({
                title: "sending for clarification",
                text: "Please wait..."
            });
            oBusyDialog.open();
            var id = location.href;
            const regex = /PAN_Details_APR\('([^']+)'\)/;
            var val = id.match(regex);
            var cFunction = this._view.getModel().bindContext(`/${'clarify'}(...)`);
            cFunction.setParameter("panno", val[1]);
            await cFunction.execute();
            let oContext1 = cFunction.getBoundContext();
            let result1 = oContext1.getObject();

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
    };
});

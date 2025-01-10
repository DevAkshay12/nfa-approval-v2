sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        Approve: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
            debugger
            var id = location.href;
            const regex = /PAN_Details_APR\('([^']+)'\)/;
            var val = id.match(regex);
            console.log(val);
            

        }
    };
});

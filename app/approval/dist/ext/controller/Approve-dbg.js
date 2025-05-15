sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        Approve: async function(oEvent) {
            debugger
            var textarea = sap.ui.getCore().byId("approval::PAN_Details_APRObjectPage--fe::CustomSubSection::Textarea--textareafrag");
            if (textarea.getValue().length > 0) {
                    var id = location.href;
                    const regex = /PAN_Details_APR\('([^']+)'\)/;
                    var val = id.match(regex);
                    console.log("Extracted Document ID:", val ? val[1] : "Not Found");
                var cFunction = this._view.getModel().bindContext(`/${'approve'}(...)`);
				cFunction.setParameter("data", val[1]);
				await cFunction.execute();
				let oContext1 = cFunction.getBoundContext();
				let result1 = oContext1.getObject();
                console.log(result1);
                
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

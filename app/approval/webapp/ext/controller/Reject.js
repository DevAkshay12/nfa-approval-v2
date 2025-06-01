sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';

    return {
        Reject: async function (oEvent) {
            debugger
            var textarea = sap.ui.getCore().byId("approval::PAN_Details_APRObjectPage--fe::CustomSubSection::Textarea--textareafrag");
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

                var email = "rajendraakshay1@gmail.com"
                var rej_func = this._view.getModel().bindContext(`/${'reject'}(...)`);
                rej_func.setParameter("data", val[1]);
                rej_func.setParameter("email", email);
                await rej_func.execute();
                let rej_context = rej_func.getBoundContext();
                let rej_result = rej_context.getObject();
                console.log(rej_result);

                sap.m.MessageToast.show("Rejected", {
                    duration: 3000,
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

                // Automatically close after 2 seconds (optional)
                setTimeout(function () {
                    oBusyDialog.close();
                    window.history.go(-2);
                }, 2000);


                // const client = 'sb-f5db712d-7e56-4659-8aa0-a43859ddd675!b449023|xsuaa!b49390';
                // const secret = '8dbe1dd1-2557-49e7-938d-3cb18bb0b753$bqbpGc9HXFf9XSFuSSXM9RH4V-FUh_J3_OL-tZ4uqUM=';
                // const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');

                // const response1 = await axios.request('https://d6a19604trial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', {
                //     method: 'POST',
                //     headers: {
                //         'Authorization': 'Basic ' + auth1
                //     }
                // });

                // const postbpa = await axios.request('https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances', {
                //     method: 'GET',
                //     headers: {
                //         'Authorization': 'Bearer ' + response1.data.access_token,
                //         'Content-Type': 'application/json'
                //     },
                // });
                // console.log(postbpa);
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

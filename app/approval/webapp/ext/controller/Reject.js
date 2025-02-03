sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        Reject: async function(oEvent) {
            var textarea = sap.ui.getCore().byId("approval::PAN_Details_APRObjectPage--fe::CustomSubSection::Textarea--textareafrag");
            if(textarea.getValue() > 0)
           {
            var id = location.href;
            const regex = /PAN_Details_APR\('([^']+)'\)/;
            var val = id.match(regex);
            console.log(val);
            
            const client = 'sb-403abd10-fd1a-4b84-845a-cad6024d1bba!b359670|xsuaa!b49390';
            const secret = 'ecd33297-4a8c-49d6-9bc8-049bf88f657a$9rtv07ya5uOAc7L2HfFaKaC0zx39zzWCsd-V1i3apvQ=';
            const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');
        
            const response1 = await axios.request('https://aa7beafetrial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + auth1
                }
            });

            const postbpa = await axios.request('https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + response1.data.access_token,
                    'Content-Type': 'application/json'
                },
            });
            console.log(postbpa);
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

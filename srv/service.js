const cds = require('@sap/cds');
const axios = require('axios');

module.exports = cds.service.impl(async function () {
  // Access the entities defined in your CDS model
  const { PAN_Details_APR,PAN_WORKFLOW_HISTORY_APR } = this.entities;

  this.on('getdata', async (req) => {
    var query = await SELECT.from(PAN_Details_APR).where`Sap_workitem_id is not null`;
    console.log(query);
    var name = req.data.data;
    const queryResult = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where({
      Employee_Name: name,
    });
    if(queryResult.length > 0) {
    const client = 'sb-403abd10-fd1a-4b84-845a-cad6024d1bba!b359670|xsuaa!b49390';
        const secret = 'ecd33297-4a8c-49d6-9bc8-049bf88f657a$9rtv07ya5uOAc7L2HfFaKaC0zx39zzWCsd-V1i3apvQ=';
        const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');
    const response1 = await axios.request('https://aa7beafetrial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', {
      method: 'POST',
      headers: {
          'Authorization': 'Basic ' + auth1
      }
  });

    const postbpa = await axios.request(`https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances?parentId=${queryResult[0].Employee_ID}`, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + response1.data.access_token,
          'Content-Type': 'application/json'
      },
  });
  if(postbpa.data.length > 0)
  {
  return queryResult;
  }
  else return null;
}
else return null;
  });
})
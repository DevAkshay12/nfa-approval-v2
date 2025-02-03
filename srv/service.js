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

//   this.on('approve', async (req) => {
// const queryResult = await SELECT.from(PAN_Details_APR).where({
//   PAN_Number:req.data.data,
// });
// console.log(queryResult);

// const client = 'sb-403abd10-fd1a-4b84-845a-cad6024d1bba!b359670|xsuaa!b49390';
//         const secret = 'ecd33297-4a8c-49d6-9bc8-049bf88f657a$9rtv07ya5uOAc7L2HfFaKaC0zx39zzWCsd-V1i3apvQ=';
//         const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');
    
//         const response1 = await axios.request('https://aa7beafetrial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', {
//             method: 'POST',
//             headers: {
//                 'Authorization': 'Basic ' + auth1
//             }
//         });


// if(queryResult[0].Sap_workitem_id)
//   {       
// const postbpa = await axios.request(`https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances?parentId=${queryResult[0].Sap_workitem_id}`, {
//   method: 'GET',
//   headers: {
//       'Authorization': 'Bearer ' + response1.data.access_token,
//       'Content-Type': 'application/json'
//   },
// });

// console.log(postbpa);
// const subprocessArray = postbpa.data.filter(item => item.subject === "nfasubprocess");
// console.log(subprocessArray);
// console.log(subprocessArray[0].id);
//   }


// if(subprocessArray[0].id)
// {
// const cancel = await axios.request({
//   url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${subprocessArray[0].id}`,
//   method: 'PATCH',
//   headers: {
//       'Authorization': 'Bearer ' + response1.data.access_token,
//       'Content-Type': 'application/json'
//   },
//   data: {
//     status: 'CANCELED'
//   }
// });

// return "approved level and subprocess cancelled"

// }
//   });





this.on('approve', async (req) => {
  try {
    const queryResult = await SELECT.from(PAN_Details_APR).where({
      PAN_Number: req.data.data,
    });
    var workid = queryResult[0].Sap_workitem_id;
    console.log(queryResult);

    if (!queryResult[0].Sap_workitem_id) return "No work item ID found";

    // Authentication for token generation
    const client = 'sb-403abd10-fd1a-4b84-845a-cad6024d1bba!b359670|xsuaa!b49390';
    const secret = 'ecd33297-4a8c-49d6-9bc8-049bf88f657a$9rtv07ya5uOAc7L2HfFaKaC0zx39zzWCsd-V1i3apvQ=';
    const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');

    // Fetch access token
    const response1 = await axios.request({
      method: 'POST',
      url: 'https://aa7beafetrial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials',
      headers: {
        'Authorization': 'Basic ' + auth1,
      },
    });

    // Fetch workflow instances
    const postbpa = await axios.request({
      method: 'GET',
      url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances?parentId=${queryResult[0].Sap_workitem_id}`,
      headers: {
        'Authorization': 'Bearer ' + response1.data.access_token,
        'Content-Type': 'application/json',
      },
    });

    console.log(postbpa);
    
    const subprocessArray = postbpa.data.filter(item => item.subject === "nfasubprocess");
    const processArray = postbpa.data.filter(item => item.subject === "nfaprocess");

    // Cancel subprocess if ID exists
    // if(subprocessArray.length > 0)
    // {
    // const cancel = await axios.request({
    //   url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${subprocessArray[0].id}`,
    //   method: 'PATCH',
    //   headers: {
    //     'Authorization': 'Bearer ' + response1.data.access_token,
    //     'Content-Type': 'application/json',
    //   },
    //   data: { status: 'CANCELED' },
    // });

   
    const process_stop = await axios.request({
      url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${queryResult[0].Sap_workitem_id}`,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + response1.data.access_token,
        'Content-Type': 'application/json',
      },
    });
    if(process_stop.data.status.status == "COMPLETED")
    {
    var queryResult1 = await UPDATE(PAN_Details_APR)
  .set({ Sap_workitem_id: null }) 
  .where({ PAN_Number: req.data.data });
  return "Process completed"
  }


    return "approved level and subprocess cancelled";

  } catch (error) {
    console.error('Error processing approval:', error);
    return "An error occurred during approval";
  }
});

})
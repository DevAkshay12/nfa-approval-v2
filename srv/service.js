const cds = require('@sap/cds');
const axios = require('axios');

module.exports = cds.service.impl(async function () {
  // Access the entities defined in your CDS model
  const { PAN_Details_APR, PAN_WORKFLOW_HISTORY_APR, PAN_Comments_APR } = this.entities;

  this.on('getdata', async (req) => {
    // var query = await SELECT.from(PAN_Details_APR).where`Sap_workitem_id is not null`;
    const query = await SELECT.from(PAN_Details_APR).where({ Sap_workitem_id: { '!=': null } });
    console.log(query);
    var name = req.data.data;
    const queryResult = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where({
      Employee_Name: name,
    });
    if (queryResult.length > 0) {
      const client = 'sb-f5db712d-7e56-4659-8aa0-a43859ddd675!b449023|xsuaa!b49390';
      const secret = '8dbe1dd1-2557-49e7-938d-3cb18bb0b753$bqbpGc9HXFf9XSFuSSXM9RH4V-FUh_J3_OL-tZ4uqUM=';
      const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');
      const response1 = await axios.request('https://d6a19604trial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', {
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
      if (postbpa.data.length > 0) {
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




  //previous approve function (5/29/25 before vinod sir )
  // this.on('approve', async (req) => {
  //   try {
  //     // Fetch data from PAN_Details_APR
  //     const queryResult = await SELECT.from(PAN_Details_APR).where({
  //       PAN_Number: req.data.data,
  //     });
  //     const workflow = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where({
  //       PAN_Number: req.data.data,
  //     });



  //     // Check if data exists
  //     if (!queryResult || queryResult.length === 0 || !queryResult[0].Sap_workitem_id) {
  //       return "No work item ID found";
  //     }

  //     const workid = queryResult[0].Sap_workitem_id;
  //     console.log("Query Result:", queryResult);

  //     // Authentication for token generation
  //     const client = 'sb-f5db712d-7e56-4659-8aa0-a43859ddd675!b449023|xsuaa!b49390';
  //     const secret = '8dbe1dd1-2557-49e7-938d-3cb18bb0b753$bqbpGc9HXFf9XSFuSSXM9RH4V-FUh_J3_OL-tZ4uqUM=';
  //     const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');

  //     // Fetch access token
  //     const response1 = await axios.request({
  //       method: 'POST',
  //       url: 'https://d6a19604trial.authentication.us10.hana.ondemand.com',
  //       headers: {
  //         'Authorization': 'Basic ' + auth1,
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       data: 'grant_type=client_credentials',
  //     });

  //     const accessToken = response1.data.access_token;

  //     // Fetch workflow instances
  //     const postbpa = await axios.request({
  //       method: 'GET',
  //       url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances?parentId=${workid}`,
  //       headers: {
  //         'Authorization': 'Bearer ' + accessToken,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     console.log("Workflow Instances:", postbpa.data);

  //     // Filter subprocesses and main processes
  //     const subprocessArray = postbpa.data.filter(item => item.subject === "nfasubprocess");
  //     const processArray = postbpa.data.filter(item => item.subject === "nfaprocess");

  //     // Cancel subprocess if it exists
  //     if (subprocessArray.length > 0) {
  //       await axios.request({
  //         url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${subprocessArray[0].id}`,
  //         method: 'PATCH',
  //         headers: {
  //           'Authorization': 'Bearer ' + accessToken,
  //           'Content-Type': 'application/json',
  //         },
  //         data: { status: 'CANCELED' },
  //       });
  //     }

  //     // Check if the main process is completed
  //     const process_stop = await axios.request({
  //       url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${workid}`,
  //       method: 'GET',
  //       headers: {
  //         'Authorization': 'Bearer ' + accessToken,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (process_stop.data.status && process_stop.data.status.status === "COMPLETED") {
  //       await UPDATE(PAN_Details_APR)
  //         .set({ Sap_workitem_id: null })
  //         .where({ PAN_Number: req.data.data });

  //       return "Process completed";
  //     }

  //     return "Approved level and subprocess cancelled";
  //   } catch (error) {
  //     console.error('Error processing approval:', error);
  //     return "An error occurred during approval";
  //   }
  // });

  this.on('wf_data', async (req) => {
    wf_query = await INSERT.into(PAN_Comments_APR).entries({
      PAN_Number: req.data.panno,
      Comments: req.data.comment
    });
    console.log(wf_query);

  })



  this.on('approve', async (req) => {
    try {
      var mail = req.data.email;
      debugger
      // Fetch data from PAN_Details_APR
      const queryResult = await SELECT.from(PAN_Details_APR).where({
        PAN_Number: req.data.data,
      });

      // Fetch workflow history for the PAN_Number
      const workflow = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where({
        PAN_Number: req.data.data,
      });




      
      //june 1 2025

      
      //june 1 2025



      

      // Check if data exists and Sap_workitem_id is present
      if (!queryResult || queryResult.length === 0 || !queryResult[0].Sap_workitem_id) {
        return "No work item ID found";
      }

      const workid = queryResult[0].Sap_workitem_id;
      console.log("Query Result:", queryResult);

      // Find workflow row with lowest level and remarks = "pending for approval"
      const pendingWorkflows = workflow.filter(item => item.Remarks === "pending for Approval");
      const rowToApprove = pendingWorkflows.reduce((min, item) => {
        return (!min || item.level < min.level) ? item : min;
      }, null);

      if (!rowToApprove) {
        return "No pending workflow to approve";
      }

      // Authentication for token generation
      const client = 'sb-f5db712d-7e56-4659-8aa0-a43859ddd675!b449023|xsuaa!b49390';
      const secret = '8dbe1dd1-2557-49e7-938d-3cb18bb0b753$bqbpGc9HXFf9XSFuSSXM9RH4V-FUh_J3_OL-tZ4uqUM=';
      const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');

      // Fetch access token
      const response1 = await axios.request('https://d6a19604trial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + auth1
        }
      });

      const accessToken = response1.data.access_token;

      // Fetch workflow instances for the workitem
      const postbpa = await axios.request({
        method: 'GET',
        url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances?parentId=${workid}`,
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      });

      console.log("Workflow Instances:", postbpa.data);

      // Filter subprocesses and main processes
      const subprocessArray = postbpa.data.filter(item => item.subject === "nfasubprocess");
      const processArray = postbpa.data.filter(item => item.subject === "nfaprocess");

      // Cancel subprocess if it exists - ONLY AFTER THIS update remarks
      if (subprocessArray.length > 0) {
        await axios.request({
          url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${subprocessArray[0].id}`,
          method: 'PATCH',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
          data: { status: 'CANCELED' },
        });

        // Now update remarks to "approved" after successful cancellation
        var res = await UPDATE(PAN_WORKFLOW_HISTORY_APR, {
          idd: rowToApprove.idd
        }).with({
          Remarks: "approved",
          // Notification_Status : rowToApprove.idd
        });




        //june 1 updated
        
      //june 1 2001
      

      let newStatus = "1"; // default if no value
      let shouldUpdate = false;

      // Step 1: Fetch the existing record
      const existingRecord = await SELECT.one.from(PAN_WORKFLOW_HISTORY_APR)
        .where({ PAN_Number: req.data.data });

        console.log(existingRecord,"selected workflow history data only one")

      // Step 2: Decide whether to update
      if (existingRecord) {
        const status = existingRecord.Notification_Status;
        if (!status || status.trim() === "") {
          // First time, set to "1"
          newStatus = "1";
          shouldUpdate = true;
        } else {
          const currentStatus = parseInt(status, 10);
          if (!isNaN(currentStatus)) {
            newStatus = (currentStatus + 1).toString();
            shouldUpdate = true;
          }
        }
      }

      // Step 3: Update only if required
      if (shouldUpdate) {
        const wf = await UPDATE(PAN_WORKFLOW_HISTORY_APR)
          .where({ PAN_Number: req.data.data })
          .with({
            Employee_ID: mail,
            Notification_Status: newStatus
          });

        console.log("Updated record:", wf);
      } else {
        console.log("No update needed.");
      }
      //june 1 2001


        //june 1 updated






      } else {
        // If no subprocess to cancel, do NOT update remarks yet
        return "No subprocess found to cancel";
      }








      // Check if the main process is completed
      const process_stop = await axios.request({
        url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${workid}`,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      });

      if (process_stop.data.status && process_stop.data.status.status === "COMPLETED") {
        // Clear Sap_workitem_id when process is done
        var id_null = await UPDATE(PAN_Details_APR, {
          PAN_Number: req.data.data
        }).with({
          Sap_workitem_id: null,
          status: "Approved"
        });
        console.log(id_null, "id is made null")

        return "Process completed";
      }

      return `Approved level ${rowToApprove.level} and subprocess cancelled`;
    } catch (error) {
      console.error('Error processing approval:', error);
      return "An error occurred during approval";
    }
  });


  this.on('reject', async (req) => {
    debugger
    try {
      var mail = req.data.email;
      const query = await SELECT.from(PAN_Details_APR).where({
        PAN_Number: req.data.data
      });
      const work_id = query[0].Sap_workitem_id;

      const client = 'sb-f5db712d-7e56-4659-8aa0-a43859ddd675!b449023|xsuaa!b49390';
      const secret = '8dbe1dd1-2557-49e7-938d-3cb18bb0b753$bqbpGc9HXFf9XSFuSSXM9RH4V-FUh_J3_OL-tZ4uqUM=';
      const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');

      // Fetch access token
      const response1 = await axios.request('https://d6a19604trial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + auth1
        }
      });

      const accessToken = response1.data.access_token;

      // Fetch workflow instances for the workitem
      //cancel the whole process on rejection
      const cancel_bpa = await axios.request({
        url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${work_id}`,
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
        data: { status: 'CANCELED' },
      });


      console.log(cancel_bpa);


      const existingRecord = await SELECT.one.from(PAN_WORKFLOW_HISTORY_APR)
        .where({
          PAN_Number: req.data.data,
          Employee_Name: mail
        });

      // var curr_level = existingRecord.Notification_Status;
      if(existingRecord.Notification_Status.length>0)
      {
      var curr_level = parseInt(existingRecord.Notification_Status, 10) + 1;
      }
      else {
        curr_level = 1;
      }
      const updateResult = await UPDATE(PAN_WORKFLOW_HISTORY_APR)
        .where({
          PAN_Number: req.data.data,
          Employee_Name: mail,
          level: curr_level.toString() 
        })
        .with({
          Remarks: "Rejected"
        });

      console.log(updateResult, "updated as rejected")


      return "rejected"




      // const workflowRow = await SELECT.one.from(PAN_WORKFLOW_HISTORY_APR).where({
      //   PAN_Number: req.data.data,
      //   Employee_Name: mail,
      //   level: count

      // });

    }
    catch (error) {
      console.log(error);
    }

  })

})
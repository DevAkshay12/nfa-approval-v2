const cds = require('@sap/cds');
const axios = require('axios');

module.exports = cds.service.impl(async function () {
  // Access the entities defined in your CDS model
  const { PAN_Details_APR, PAN_WORKFLOW_HISTORY_APR, PAN_Comments_APR } = this.entities;

  this.on('getdata', async (req) => {
    debugger
    var name = req.data.data;
    const statusRecord = await SELECT.one.from(PAN_WORKFLOW_HISTORY_APR).where({
      Employee_ID : name
    });
    const queryResult = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where({
      Employee_ID : name,
      Remarks: "pending for Approval"

    });


    if (queryResult.length > 0) {
      const client = 'sb-eede3212-4ca0-4827-860e-dd9dfcc67594!b491107|xsuaa!b49390';
      const secret = 'dcee1b66-5488-4d1a-89fc-05cc2c0275f6$YhTZYSgi4RbdKa1ng2lXBF9vHmNbFplg3hJF_Q98VjM=';
      const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');
      const response1 = await axios.request('https://fb1534c0trial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + auth1
        }
      });
      const token = response1.data.access_token;

      // Loop through all entries to check if BPA instance exists
      const validDocs = [];
      for (const entry of queryResult) {
        const postbpa = await axios.request(`https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances?parentId=${entry.Employee_ID}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
        });
        if (postbpa.data.length > 0) {
          validDocs.push(entry);
        }
      }
      return validDocs;
    }
    else return [];
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
    var wf_query = await INSERT.into(PAN_Comments_APR).entries({
      PAN_Number: req.data.panno,
      Comments: req.data.comment
    });
    console.log(wf_query);

  })



 this.on('approve', async (req) => {
    try {
      const mail = req.data.email;
  
      // Fetch PAN details
      const queryResult = await SELECT.from(PAN_Details_APR).where({
        PAN_Number: req.data.data
      });
  
      if (!queryResult || queryResult.length === 0 || !queryResult[0].Sap_workitem_id) {
        return "No work item ID found";
      }
  
      const workid = queryResult[0].Sap_workitem_id;
  
      // Fetch workflow for the current approver
      const workflow = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where({
        PAN_Number: req.data.data,
        Employee_ID : mail,
        Remarks: "pending for Approval"
      });
  
      if (workflow.length === 0) {
        return "No pending workflow to approve";
      }
  
      // Calculate time taken
      const submittedDate = new Date(queryResult[0].submitted_date);
      const currentDate = new Date();
      const diffMs = currentDate - submittedDate;
      const totalMinutes = Math.floor(diffMs / (1000 * 60));
      const totalHours = Math.floor(totalMinutes / 60);
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
  
      let daystaken = '';
      if (days > 0) daystaken += `${days} day${days > 1 ? 's' : ''}`;
      if (hours > 0) daystaken += `${daystaken ? ' and ' : ''}${hours} hour${hours > 1 ? 's' : ''}`;
      if (minutes > 0 || !daystaken) daystaken += `${daystaken ? ' and ' : ''}${minutes} minute${minutes > 1 ? 's' : ''}`;
  
      // Token Generation
      const client = 'sb-eede3212-4ca0-4827-860e-dd9dfcc67594!b491107|xsuaa!b49390';
      const secret = 'dcee1b66-5488-4d1a-89fc-05cc2c0275f6$YhTZYSgi4RbdKa1ng2lXBF9vHmNbFplg3hJF_Q98VjM=';
      const auth1 = Buffer.from(`${client}:${secret}`, 'utf-8').toString('base64');
  
      const response1 = await axios.request('https://fb1534c0trial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + auth1
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      const accessToken = response1.data.access_token;
  
      // Fetch subprocesses
      const postbpa = await axios.request({
        method: 'GET',
        url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances?parentId=${workid}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      const subprocessArray = postbpa.data.filter(item => item.subject === "nfasubprocess");
  
      if (subprocessArray.length > 0) {
        // Cancel subprocess
        await axios.request({
          url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${subprocessArray[0].id}`,
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          data: { status: 'CANCELED' },
        });
  
        console.log("Subprocess cancelled");
  
        // ⏳ Delay to ensure BPA has time to react
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        // Update approval for current level
        await UPDATE(PAN_WORKFLOW_HISTORY_APR, {
          level: workflow[0].level,
          PAN_Number: req.data.data
        }).with({
          Remarks: `Approved by ${mail}`,
          Approved_by: mail,
          End_DateAND_Time: new Date(),
          Days_Taken: daystaken
        });
  
        // Trigger next level approval
        const nextLevel = parseInt(workflow[0].level, 10) + 1;
        const nextApprover = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where({
          PAN_Number: req.data.data,
          level: nextLevel.toString()
        });
  
        if (nextApprover) {
          await UPDATE(PAN_WORKFLOW_HISTORY_APR, {
            PAN_Number: req.data.data,
            level: nextLevel.toString()
          }).with({
            Remarks: "pending for Approval",
            Begin_DateAND_Time: new Date()
          });
        }
  
        // Optional: Notification_Status increment logic
        const existingRecord = await SELECT.one.from(PAN_WORKFLOW_HISTORY_APR)
          .where({ PAN_Number: req.data.data });
  
        let newStatus = "1";
        let shouldUpdate = false;
  
        if (existingRecord) {
          const status = existingRecord.Notification_Status;
          if (!status || status.trim() === "") {
            shouldUpdate = true;
          } else {
            const currentStatus = parseInt(status, 10);
            if (!isNaN(currentStatus)) {
              newStatus = (currentStatus + 1).toString();
              shouldUpdate = true;
            }
          }
        }
  
        if (shouldUpdate) {
          await UPDATE(PAN_WORKFLOW_HISTORY_APR)
            .where({ PAN_Number: req.data.data })
            .with({ Notification_Status: newStatus });
        }
  
      } else {
        return "No subprocess found to cancel";
      }
  
      // If process is fully complete
      const process_stop = await axios.request({
        url: `https://spa-api-gateway-bpi-us-prod.cfapps.us10.hana.ondemand.com/workflow/rest/v1/workflow-instances/${workid}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (process_stop.data.status === "COMPLETED") {
        await UPDATE(PAN_Details_APR, {
          PAN_Number: req.data.data
        }).with({
          Sap_workitem_id: null,
           statusInd : 3,
          status: `Approved by ${mail}`
        });
  
        await UPDATE(PAN_WORKFLOW_HISTORY_APR)
          .where({ PAN_Number: req.data.data })
          .with({ Notification_Status: null });
  
        return "Process completed";
      }
  
      return `Approved level ${workflow[0].level} and subprocess cancelled`;
  
    } catch (error) {
      console.error('Error processing approval:', error);
      return "An error occurred during approval";
    }
  });



  this.on('reject', async (req) => {
    debugger
    try {

      var mail = req.data.email;
      const existingRecord = await SELECT.from(PAN_WORKFLOW_HISTORY_APR)
        .where({
          PAN_Number: req.data.data,
          Employee_ID : mail,
          Remarks: "pending for Approval"
        });
      if (existingRecord.length == 0) {
        return "no record found"
      }
      const query = await SELECT.from(PAN_Details_APR).where({
        PAN_Number: req.data.data
      });

      // let tskid =  query[0].task_id;
      // $.ajax({
      //   url: "https://35a254d6trial.it-cpitrial05-rt.cfapps.us10-001.hana.ondemand.com/http/postcallscript",
      //   method: "POST",
      //   contentType: "application/json",
      //   data: JSON.stringify({
      //     "actionableType": "Task",
      //     "uniqueName": tskid,
      //     "actionName": "Reject",
      //     "options": {
      //       "comment": "Rejected!"
      //     }
      //   }),
      //   beforeSend: function(xhr) {
      //     const username = "sb-81c5da0d-334a-41f4-a66a-62f5eaed6a7a!b451464|it-rt-35a254d6trial!b26655";
      //     const password = "51c0d21f-3201-4b4b-8ce4-be49b5a0a4f1$9-eWniOpp2NxbHuY5tPq9tXpKqHBKa5m3tcgLM8VvnM=";
      //     const base64 = btoa(username + ":" + password);
      //     xhr.setRequestHeader("Authorization", "Basic " + base64);
      //   },
      //   success: function(response) {
      //     console.log("Success:", response);
      //   },
      //   error: function(xhr, status, error) {
      //     console.error("Error:", xhr.responseText || error);
      //   }
      // });


      //time calculate
      const submittedDate = new Date(query[0].submitted_date); // from DB
      const currentDate = new Date(); // now

      const diffMs = currentDate - submittedDate; // difference in milliseconds
      const totalMinutes = Math.floor(diffMs / (1000 * 60)); // total minutes
      const totalHours = Math.floor(totalMinutes / 60); // total hours
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;

      let daystaken = '';
      if (days > 0) {
        daystaken += `${days} day${days > 1 ? 's' : ''}`;
      }
      if (hours > 0) {
        if (daystaken.length > 0) daystaken += ' and ';
        daystaken += `${hours} hour${hours > 1 ? 's' : ''}`;
      }
      if (minutes > 0 || daystaken.length === 0) {
        if (daystaken.length > 0) daystaken += ' and ';
        daystaken += `${minutes} minute${minutes > 1 ? 's' : ''}`;
      }

      console.log(daystaken);

      //time calculate


      const work_id = query[0].Sap_workitem_id;

      const client = 'sb-eede3212-4ca0-4827-860e-dd9dfcc67594!b491107|xsuaa!b49390';
      const secret = 'dcee1b66-5488-4d1a-89fc-05cc2c0275f6$YhTZYSgi4RbdKa1ng2lXBF9vHmNbFplg3hJF_Q98VjM=';
      const auth1 = Buffer.from(client + ':' + secret, 'utf-8').toString('base64');

      // Fetch access token
      const response1 = await axios.request('https://fb1534c0trial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', {
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

      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(cancel_bpa);




      const updateResult = await UPDATE(PAN_WORKFLOW_HISTORY_APR)
        .where({
          PAN_Number: req.data.data,
          // Employee_Name: mail,
          level: existingRecord[0].level
        })
        .with({
          Remarks: `Rejected`,
          Approved_by: mail,
          Notification_Status: null,
          End_DateAND_Time: new Date(),
          Days_Taken: daystaken

        });

      const updpandet = await UPDATE(PAN_Details_APR).where({
        PAN_Number: req.data.data,
      }).with({
        status: `Rejected by ${mail}`,
         statusInd  : 1
      })

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

  this.on('clarify', async (req) => {
    debugger
    var pan_no = req.data.panno;
    const wf = await UPDATE(PAN_Details_APR)
      .where({ PAN_Number: req.data.panno })
      .with({
        status: 'need for clarification'
      });
    return "updated as need for clarification"
  })

  this.on("cbe", async (req) => {
    let data = await SELECT.from(PAN_Details_APR).where`PAN_Number = ${req.data.ID}`;
    // console.log(data);
    return JSON.stringify(data[0]);
});

})
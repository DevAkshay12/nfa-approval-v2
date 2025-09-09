namespace proj_schema;

using {
  cuid,
  managed
} from '@sap/cds/common';

@cds.persistance.exists
entity PAN_Details {
  key PAN_Number                                      : String default 'def';
      SBG                                             : String;
      SBU                                             : String;
      BUORPurchasing_Group                            : String;
      Plant_Code                                      : String;
      Project_Description                             : String;
      PR_NumberBKTsBKT                                : String;
      Subject_of_ProposalOROrder                      : String;
      Previous_PAN_References                         : String;
      Split_OrderORNo_of_vendors                      : String;
      SOP_Type                                        : String;
      Order_Type_OR_Document_tyFuuidpe                : String;
      Asset_Type                                      : String;
      Nature_of_Transaction                           : String;
      Order_Location_OR_Plant                         : String;
      Base_line_spend                                 : String;
      Project_CurrencyORBase_Currency                 : String;
      Order_CurrencyORBid_currency                    : String;
      Final_proposed_Value                            : String;
      Savings_achieved_btw_initial_and_final_quote    : String;
      Savings_against_base_line_spend_of_RFP          : String;
      Number_of_Vendors_Shortlisted_for_RFP           : String;
      Number_of_Vendors_Technically_Qualified         : String;
      Required_at_Site_Date                           : String;
      RFP_Number                                      : String;
      RFP_Publish_Date                                : String;
      Time_Taken_for_FinalizationDASHIn_DAYS          : String;
      status                                          : String;
      statusInd                                       : Integer; //used for criticality rep
      created_by                                      : String;
      task_id                                         : String;
      type                                            : String;
      status_a                                        : String;
      switch_control                                  : Boolean default false;
      ProjectId                                       : String;
      number_of_vendors_invited                       : String;
      total_levels_of_approval                        : String(2);
      Current_level_of_approval                       : String(2);
      Sap_workitem_id                                 : String;
      Comments                                        : LargeString;
      submitted_by                                    : String;
      submitted_date                                  : String;

      //new fields 1st level//
      NFAID                                           : String;
      ApprovingPlant                                  : String;
      Existing_PO_ARC_ContractValue                   : String;
      Existing_PO_number                              : String;
      Amendment_Value_Total_NFA_Amount                : String;
      Budget                                          : String;
      Rational_for_not_doing_auction                  : Boolean;
      Is_any_new_initiative_bestpractices             : String;
      Negotiation_Committee                           : String;
      Is_there_Any_Import_Supply_under_this_Proposal  : Boolean;
      Last_Purchase_Price_CLPP                        : String;
      Saving_Increase_Amount_on_LPP                   : String;
      Prices_Are                                      : String;
      //new fields 1st level//

      //new fields 2nd level//
      Amendment_In_Existing_PO_ARC_Contract           : Boolean;
      Pricing_in_Business_Plan_If_Applicable          : String;
      Price_Justification                             : String;
      Deviations_from_Group_philosophy_Cardinal_rules : String;
      List_of_Deviation                               : String;
      Penalty_clause_for_Quality                      : String;
      Penalty_criteria                                : String;
      Rationale_if_not_L1                             : String;
      SBU_Unit_Location                               : String;
      //new fields 2nd level //


      tab1toWORKFLOW_HISTORY                          : Composition of many PAN_WORKFLOW_HISTORY
                                                          on tab1toWORKFLOW_HISTORY.WORKFLOW_HISTORYtotab1 = $self;
      tab1totab2                                      : Composition of many PAN_WEB_EVENT
                                                          on tab1totab2.tab2totab1 = $self;
      tab1totab3                                      : Composition of many PAN_TYPE
                                                          on tab1totab3.tab3totab1 = $self;
      tab1tovendor_data                               : Composition of many PAN_vendor_data
                                                          on tab1tovendor_data.vendor_datatotab1 = $self;
      tab1topdf                                       : Association to many PAN_attachments
                                                          on tab1topdf.PAN_Number = PAN_Number;
      tab1tocom                                       : Composition of many PAN_Comments
                                                          on tab1tocom.comtotab1 = $self;
}

@cds.persistance.exists
entity PAN_WEB_EVENT {
  key idd                         : String;
  key PAN_Number                  : String;
      eventNo                     : String;
      number                      : String;
      date                        : String;
      numberOfVendorsParticipated : String;
      l1AmountObtained            : String;

      //////////new fields/////////////
      Comparison_of_offer         : String;
      Auction_Done                : String;
      Auction_Details             : String;
      //////////new fields/////////////

      tab2totab1                  : Association to one PAN_Details
                                      on tab2totab1.PAN_Number = PAN_Number;
}


@cds.persistance.exists
entity PAN_TYPE {
  key idd                  : String;
  key PAN_Number           : String;
      typeNo               : String;
      required             : String;
      submittedOn          : String;
      receivedOn           : String;
      timeTakenForApproval : String;
      tab3totab1           : Association to one PAN_Details
                               on tab3totab1.PAN_Number = PAN_Number;
}

@cds.persistance.exists
entity PAN_vendor_data {
      //vendor response summary table
  key Proposed_Vendor_Code                                                         : String; //disp
  key PAN_Number                                                                   : String;
      Awarded_Vendor                                                               : String;
      Vendor_Name                                                                  : String; //disp
      Vendor_Location                                                              : String;
      Technically_Approved                                                         : String;
      Client_Approved                                                              : String;
      Original_quote                                                               : String; //disp
      Final_Quote                                                                  : String; //disp
      Order_amount_OR_Split_order_amount                                           : String;
      Discount_Amount                                                              : String;
      Discount_percentage                                                          : String;
      Rank                                                                         : String;
      Proposed_Vendor_Name                                                         : String;
      Supplier_Origin_State                                                        : String;
      Destination_State_BKTShipDASHto_LocationBKT                                  : String;
      Vendor_GST_Number                                                            : String;
      Vendor_CE_Score                                                              : String;
      Vendor_CE_Date                                                               : String;
      Vendor_PE_Score                                                              : String;
      Vendor_PE_Date                                                               : String;
      Vendor_Contact_PersonDASH1                                                   : String;
      Vendor_Contact_PersonDASH2                                                   : String;
      Technical_Committee_who_cleared_the_proposal                                 : String;
      Commercial_Committee_who_cleared_the_proposal                                : String;
      Vendor_References_to_be_displayed_in_Order                                   : String;
      Shortlisted_Vendors_Response_summary                                         : String;
      Order_Value_BKTIn_Project_CurrencyBKT                                        : String;
      Order_Value_BKTIn_Bid_CurrencyBKT                                            : String;
      Vendor_Final_Quotation_Date                                                  : String;
      Vendor_Final_Quotation_Amount                                                : String;
      Project_CurrencyORBase_Currency                                              : String;
      Order_CurrencyORBid_currency                                                 : String;
      Incoterms                                                                    : String;
      //Terms_and_Conditions_Compared_with
      Number_of_Back_to_back_Terms_agreed_with_Vendor_as_per_GPC_OR_GCC            : String;
      Details_of_deviated_or_better_terms_agreed_with_the_Vendor                   : String;
      Market_Scenario_and_Demand                                                   : String;
      Companys_Position_and_Market_dynamics_of_this_purchase                       : String;
      Should_Be_Cost_estimated                                                     : String;
      Highlights_of_this_proposal_and_Price_Justification_for_this_proposal        : String;
      Price_Escalation_Agreed_if_any                                               : String;
      Particulars_of_any_Free_Service_OR_Supply_Guarantees_OR_Warrant_yfrom_Vendor : String;
      Transportation                                                               : String;
      Logistics_Cost                                                               : String;
      Delivery_Schedule                                                            : String;
      Tax_Details                                                                  : String;
      Additional_Remarks                                                           : String;
      ABG                                                                          : String;
      ABG_Value                                                                    : String;
      CPBG                                                                         : String;
      CPBG_Value                                                                   : String;
      // OTHERS TERMS AND CONDITIONS

      Scope_and_Responsibilities                                                   : LargeString;
      Commercial_Terms                                                             : LargeString;
      Compliance_Terms                                                             : LargeString;
      Others                                                                       : LargeString;


      ////////////////////////new fields///////////////////////////////
      Contract_Period                                                              : String;
      Order_Type_Parties_contacted_and_technically_accepted                        : String;
      Contract_Manager_Name                                                        : String;
      Is_Vendor_dependency                                                         : Boolean;
      Vendors_Latest_Available_Turnover                                            : String;
      Total_Vendor_Spend_for_Current_FY                                            : String;
      Shortlisted_Parties_Credentials_Background                                   : String;
      Internal_SLAs_KPIs_for_the_contract                                          : String;
      Contract_Value_Basic_Value                                                   : String;
      FTA_EPCG_any_other_benefit_availed_for_duty_saving                           : Boolean;
      Approximate_Duty_Amount_in_INR                                               : String;
      Monthly_Quantity                                                             : String;
      Reason_for_Post_Facto_NFA_If_Applicable                                      : String;
      Inco_term                                                                    : String;
      Terms_Of_Payment_milestone_on_which_payment_will_be_made                     : String;
      Packing_Forwarding                                                           : String;
      Insurance                                                                    : String;
      Delivery_Lead_Time                                                           : String;
      Liquidated_Damages                                                           : String;
      Liquidated_Damages_Clause                                                    : String;
      PBG_and_SD                                                                   : String;
      PBG_and_SD_Clause                                                            : String;
      Job_Clearance_Certificates                                                   : String;
      HR_Clearance_Certificates                                                    : String;
      Penalty_clause_for_safety_Subcontract                                        : Boolean;
      Other_Key_Terms                                                              : String;
      Rational_for_awarding_contract_to_dependent_partner                          : String;
      ////////////////////////new fields///////////////////////////////


      vendtovenr                                                                   : Composition of many PAN_vendor_response
                                                                                       on vendtovenr.venrtovend = $self;
      // vendtotnc :  Composition of many Terms_and_Conditions_Compared_with on vendtotnc.tnctovend = $self;
      vendtoptd                                                                    : Composition of many PAN_PAYMENT_TERM_DETAILS
                                                                                       on vendtoptd.ptdtovend = $self;
      vendtopd                                                                     : Composition of many PAN_PRICE_DETAILS
                                                                                       on vendtopd.pdtovend = $self;
      vendor_datatotab1                                                            : Association to one PAN_Details
                                                                                       on vendor_datatotab1.PAN_Number = PAN_Number;
}

@cds.persistance.exists
entity PAN_vendor_response {
  key Proposed_Vendor_Code                                                         : String;
  key PAN_Number                                                                   : String;
      Proposed_Vendor_Name                                                         : String;
      Supplier_Origin_State                                                        : String;
      Destination_State_BKTShipDASHto_LocationBKT                                  : String;
      Vendor_GST_Number                                                            : String;
      Vendor_CE_Score                                                              : String;
      Vendor_CE_Date                                                               : Date;
      Vendor_PE_Score                                                              : String;
      Vendor_PE_Date                                                               : Date;
      Vendor_Contact_PersonDASH1                                                   : String;
      Vendor_Contact_PersonDASH2                                                   : String;
      Technical_Committee_who_cleared_the_proposal                                 : String;
      Commercial_Committee_who_cleared_the_proposal                                : String;
      Vendor_References_to_be_displayed_in_Order                                   : String;
      Shortlisted_Vendors_Response_summary                                         : String;
      Order_Value_BKTIn_Project_CurrencyBKT                                        : String;
      Order_Value_BKTIn_Bid_CurrencyBKT                                            : String;
      Vendor_Final_Quotation_Date                                                  : String;
      Vendor_Final_Quotation_Amount                                                : String;
      Project_CurrencyORBase_Currency                                              : String;
      Order_CurrencyORBid_currency                                                 : String;
      Incoterms                                                                    : String;
      //Terms_and_Conditions_Compared_with
      Number_of_Back_to_back_Terms_agreed_with_Vendor_as_per_GPC_OR_GCC            : String;
      Details_of_deviated_or_better_terms_agreed_with_the_Vendor                   : String;
      Market_Scenario_and_Demand                                                   : String;
      Companys_Position_and_Market_dynamics_of_this_purchase                       : String;
      Should_Be_Cost_estimated                                                     : String;
      Highlights_of_this_proposal_and_Price_Justification_for_this_proposal        : String;
      Price_Escalation_Agreed_if_any                                               : String;
      Particulars_of_any_Free_Service_OR_Supply_Guarantees_OR_Warrant_yfrom_Vendor : String;
      Transportation                                                               : String;
      Logistics_Cost                                                               : String;
      Delivery_Schedule                                                            : String;
      Tax_Details                                                                  : String;
      Additional_Remarks                                                           : String;
      ABG                                                                          : String;
      ABG_Value                                                                    : String;
      CPBG                                                                         : String;
      CPBG_Value                                                                   : String;
      // OTHERS TERMS AND CONDITIONS
      Scope_and_Responsibilities                                                   : LargeString;
      Commercial_Terms                                                             : LargeString;
      Compliance_Terms                                                             : LargeString;
      Others                                                                       : LargeString;
      venrtovend                                                                   : Association to one PAN_vendor_data; // on venrtovend.Proposed_Vendor_Code =  Proposed_Vendor_Code and venrtovend.PAN_Number = PAN_Number;
}

@cds.persistance.exists
entity PAN_PAYMENT_TERM_DETAILS {
  key ptdkey                             : UUID;
      Proposed_Vendor_Code               : String;
      PAN_Number                         : String;
      iddd                               : String;
      slNo                               : Integer;
      Payment_methord                    : String default 'RTGS payment';
      Percentage                         : String;
      Description                        : String;
      Due_date                           : String;
      Mandatory_Documents_OR_Submissions : String;
      To_be_certified_in_Company         : String;
      ptdtovend                          : Association to PAN_vendor_data
                                             on  ptdtovend.Proposed_Vendor_Code = Proposed_Vendor_Code
                                             and PAN_Number                     = ptdtovend.PAN_Number;
}

@cds.persistance.exists
entity PAN_PRICE_DETAILS {
  key pdkey                                  : UUID;
      Proposed_Vendor_Code                   : String;
      PAN_Number                             : String;
      Item_Code                              : String;
      HSN_OR_SAC_Code                        : String;
      extendedPrice                          : String;
      Item_Short_Description                 : String;
      UOM                                    : String;
      Quantity                               : String;
      Unit_Price                             : String;
      Amount                                 : String;
      Indian_Tax_PER                         : String;
      Quantity_Over_Delivery_Tolerance       : String;

      //////////////////////////new fields///////////////////////////////
      Approval_Requested_For_Subject         : String;
      Product_Service_Description_Background : String;
      Comparison_of_offer                    : String;
      Tax_Amount                             : String;
      Freight                                : String;
      Delivery_Lead_Time                     : String;
      //////////////////////////new fields///////////////////////////////

      pdtovend                               : Association to PAN_vendor_data
                                                 on  pdtovend.Proposed_Vendor_Code = Proposed_Vendor_Code
                                                 and PAN_Number                    = pdtovend.PAN_Number;
}

@cds.persistance.exists
entity PAN_attachments : cuid, managed {
      //  key idd : UUID;
  key PAN_Number : String;

      // key pdfId : UUID default '10';
      // @Core.MediaType: mediaType
      // contentB: LargeBinary;
      @Core.MediaType  : mediaType
      content    : LargeBinary;

      @Core.IsMediaType: true
      mediaType  : String;
      fileName   : String;
      size       : Integer;
      url        : String;
      pdftotab1  : Association to one PAN_Details
                     on pdftotab1.PAN_Number = PAN_Number;
}

@cds.persistance.exists
entity PAN_Comments : managed {
  key idd        : UUID;
  key PAN_Number : String;
      user       : String;
      Comments   : LargeString;
      status     : String;
      comtotab1  : Association to one PAN_Details
                     on comtotab1.PAN_Number = PAN_Number;
}


@cds.persistance.exists
entity PAN_WORKFLOW_HISTORY {
  key idd                    : String;
  key PAN_Number             : String;
      Employee_ID            : String;
      level                  : String;
      Approved_by            : String;
      Employee_Name          : String;
      Title                  : String;
      Notification_Status    : String;
      Result                 : String;
      Begin_DateAND_Time     : String;
      End_DateAND_Time       : String;
      Days_Taken             : String;
      Remarks                : String;
      WORKFLOW_HISTORYtotab1 : Association to one PAN_Details
                                 on WORKFLOW_HISTORYtotab1.PAN_Number = PAN_Number;
}

@cds.persistance.exists
entity approversKeys {
  key PAN_Number : String;
  key approver   : String;
  key keyy       : String;
}

entity PAN_Payment_Method_Drop {

  key id             : UUID;
      Payment_method : String;

}

entity vendorTaxDetails {
  key Proposed_Vendor_Code : String;
  key PAN_Number           : String;
  key Item_Code            : String;
  key idd                  : UUID;
      name                 : String;
      value                : String;
}

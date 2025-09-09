using PanApproval as service from '../../srv/service';
annotate service.PAN_Details_APR with @(
     UI.DeleteHidden :true,
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'PAN_Number',
                Value : PAN_Number,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SBG',
                Value : SBG,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SBU',
                Value : SBU,
            },
            {
                $Type : 'UI.DataField',
                Label : 'BUORPurchasing_Group',
                Value : BUORPurchasing_Group,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Plant_Code',
                Value : Plant_Code,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Project_Description',
                Value : Project_Description,
            },
            {
                $Type : 'UI.DataField',
                Label : 'PR_NumberBKTsBKT',
                Value : PR_NumberBKTsBKT,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Subject_of_ProposalOROrder',
                Value : Subject_of_ProposalOROrder,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Previous_PAN_References',
                Value : Previous_PAN_References,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Split_OrderORNo_of_vendors',
                Value : Split_OrderORNo_of_vendors,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SOP_Type',
                Value : SOP_Type,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Order_Type_OR_Document_tyFuuidpe',
                Value : Order_Type_OR_Document_tyFuuidpe,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Asset_Type',
                Value : Asset_Type,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Nature_of_Transaction',
                Value : Nature_of_Transaction,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Order_Location_OR_Plant',
                Value : Order_Location_OR_Plant,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Base_line_spend',
                Value : Base_line_spend,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Project_CurrencyORBase_Currency',
                Value : Project_CurrencyORBase_Currency,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Order_CurrencyORBid_currency',
                Value : Order_CurrencyORBid_currency,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Final_proposed_Value',
                Value : Final_proposed_Value,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Savings_achieved_btw_initial_and_final_quote',
                Value : Savings_achieved_btw_initial_and_final_quote,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Savings_against_base_line_spend_of_RFP',
                Value : Savings_against_base_line_spend_of_RFP,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Number_of_Vendors_Shortlisted_for_RFP',
                Value : Number_of_Vendors_Shortlisted_for_RFP,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Number_of_Vendors_Technically_Qualified',
                Value : Number_of_Vendors_Technically_Qualified,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Required_at_Site_Date',
                Value : Required_at_Site_Date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'RFP_Number',
                Value : RFP_Number,
            },
            {
                $Type : 'UI.DataField',
                Label : 'RFP_Publish_Date',
                Value : RFP_Publish_Date,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Time_Taken_for_FinalizationDASHIn_DAYS',
                Value : Time_Taken_for_FinalizationDASHIn_DAYS,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'statusInd',
                Value : statusInd,
            },
            {
                $Type : 'UI.DataField',
                Label : 'created_by',
                Value : created_by,
            },
            {
                $Type : 'UI.DataField',
                Label : 'task_id',
                Value : task_id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'type',
                Value : type,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status_a',
                Value : status_a,
            },
            {
                $Type : 'UI.DataField',
                Label : 'switch_control',
                Value : switch_control,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ProjectId',
                Value : ProjectId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'number_of_vendors_invited',
                Value : number_of_vendors_invited,
            },
            {
                $Type : 'UI.DataField',
                Label : 'total_levels_of_approval',
                Value : total_levels_of_approval,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Current_level_of_approval',
                Value : Current_level_of_approval,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Sap_workitem_id',
                Value : Sap_workitem_id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Comments',
                Value : Comments,
            },
            {
                $Type : 'UI.DataField',
                Label : 'submitted_by',
                Value : submitted_by,
            },
            {
                $Type : 'UI.DataField',
                Label : 'submitted_date',
                Value : submitted_date,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : 'General Details',
            ID : 'GeneralDetails',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'GeneralDetails',
                    ID : 'GeneralDetails1',
                    Target : '@UI.FieldGroup#GeneralDetails',
                },
                {
                    $Type : 'UI.CollectionFacet',
                    Label : 'Header Details',
                    ID : 'HeaderDetails',
                    Facets : [
                        {
                            $Type : 'UI.ReferenceFacet',
                            Label : 'Header Details',
                            ID : 'HeaderDetails1',
                            Target : '@UI.FieldGroup#HeaderDetails',
                        },
                    ],
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Event History',
                    ID : 'EventHistory',
                    Target : 'tab1totab2/@UI.LineItem#EventHistory',
                },
            ],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Vendor Response Details',
            ID : 'VendorResponseDetails',
            Target : 'tab1tovendor_data/@UI.LineItem#VendorResponseDetails',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'PAN_Number',
            Value : PAN_Number,
        },
        {
            $Type : 'UI.DataField',
            Label : 'BUORPurchasing_Group',
            Value : BUORPurchasing_Group,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Plant_Code',
            Value : Plant_Code,
        },
        {
            $Type : 'UI.DataField',
            Value : status,
            Label : 'status',
        },
    ],
    UI.FieldGroup #GeneralDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : SBU_Unit_Location,
                Label : 'SBU Unit Location',
            },
            {
                $Type : 'UI.DataField',
                Value : Amendment_In_Existing_PO_ARC_Contract,
                Label : 'Amendment In Existing PO ARC Contract',
            },
            {
                $Type : 'UI.DataField',
                Value : Pricing_in_Business_Plan_If_Applicable,
                Label : 'Pricing In Business Plan If Applicable',
            },
            {
                $Type : 'UI.DataField',
                Value : Price_Justification,
                Label : 'Price Justification',
            },
            {
                $Type : 'UI.DataField',
                Value : Deviations_from_Group_philosophy_Cardinal_rules,
                Label : 'Deviations From Group Philosophy Cardinal Rules',
            },
            {
                $Type : 'UI.DataField',
                Value : List_of_Deviation,
                Label : 'List Of Deviation',
            },
            {
                $Type : 'UI.DataField',
                Value : Penalty_clause_for_Quality,
                Label : 'Penalty Clause For Quality',
            },
            {
                $Type : 'UI.DataField',
                Value : Penalty_criteria,
                Label : 'Penalty Criteria',
            },
            {
                $Type : 'UI.DataField',
                Value : Rationale_if_not_L1,
                Label : 'Rationale If Not L1',
            },
            {
                $Type : 'UI.DataField',
                Value : NFAID,
                Label : 'NFAID',
            },
            {
                $Type : 'UI.DataField',
                Value : ApprovingPlant,
                Label : 'Approving Plant',
            },
            {
                $Type : 'UI.DataField',
                Value : Existing_PO_number,
                Label : 'Existing PO Number',
            },
        ],
    },
    UI.SelectionFields : [
        PAN_Number,
    ],
    UI.FieldGroup #HeaderDetails : {
        $Type : 'UI.FieldGroupType',
         Data : [
            {
                $Type: 'UI.DataField',
                Value: Amendment_Value_Total_NFA_Amount,
                Label: 'Amendment Value Total NFA Amount',
            },
            {
                $Type: 'UI.DataField',
                Value: Budget,
                Label: 'Budget',
            },
            {
                $Type: 'UI.DataField',
                Value: Rational_for_not_doing_auction,
                Label: 'Rational For Not Doing Auction',
            },
            {
                $Type: 'UI.DataField',
                Value: Is_any_new_initiative_bestpractices,
                Label: 'Is any New Initiative Bestpractices',
            },
            {
                $Type: 'UI.DataField',
                Value: Negotiation_Committee,
                Label: 'Negotiation Committee',
            },
            {
                $Type: 'UI.DataField',
                Value: Is_there_Any_Import_Supply_under_this_Proposal,
                Label: 'Is There Any Import Supply Under This Proposal',
            },
            {
                $Type: 'UI.DataField',
                Value: Last_Purchase_Price_CLPP,
                Label: 'Last Purchase Price CLPP',
            },
            {
                $Type: 'UI.DataField',
                Value: Saving_Increase_Amount_on_LPP,
                Label: 'Saving Increase Amount on LPP',
            },
            {
                $Type: 'UI.DataField',
                Value: Prices_Are,
                Label: 'Prices Are',
            },
        ],
    },
    UI.HeaderInfo : {
        TypeName : 'PAN Data',
        TypeNamePlural : '',
    },
);

annotate service.PAN_WEB_EVENT_APR with @(
    UI.LineItem #EventHistory : [
        {
            $Type: 'UI.DataField',
            Value: eventNo,
            Label: 'Event No',
        },
        {
            $Type: 'UI.DataField',
            Value: number,
            Label: 'Number',
        },
        {
            $Type: 'UI.DataField',
            Value: date,
            Label: 'Date',
        },
        {
            $Type: 'UI.DataField',
            Value: numberOfVendorsParticipated,
            Label: 'Number Of Vendors Participated',
        },
        {
            $Type: 'UI.DataField',
            Value: l1AmountObtained,
            Label: 'L1 Amount Obtained',
        },
        {
            $Type: 'UI.DataField',
            Value: Auction_Done,
            Label: 'Auction Done',
        },
        {
            $Type: 'UI.DataField',
            Value: Auction_Details,
            Label: 'Auction Details',
        },
    ]
);

annotate service.PAN_vendor_data_APR with @(
    UI.LineItem #VendorResponseDetails : [
        {
            $Type : 'UI.DataField',
            Value : Awarded_Vendor,
            Label : 'Awarded Vendor',
        },
        {
            $Type : 'UI.DataField',
            Value : Vendor_Name,
            Label : 'Vendor Name',
        },
        {
            $Type : 'UI.DataField',
            Value : Original_quote,
            Label : 'Original quote',
        },
        {
            $Type : 'UI.DataField',
            Value : Final_Quote,
            Label : 'Final Quote',
        },
        {
            $Type : 'UI.DataField',
            Value : Vendor_Location,
            Label : 'Vendor Location',
        },
        {
            $Type : 'UI.DataField',
            Value : Order_amount_OR_Split_order_amount,
            Label : 'Order Amount Or Split Order Amount',
        },
        {
            $Type : 'UI.DataField',
            Value : Discount_Amount,
            Label : 'Discount Amount',
        },
        {
            $Type : 'UI.DataField',
            Value : Discount_percentage,
            Label : 'Discount Percentage',
        },
        {
            $Type : 'UI.DataField',
            Value : Rank,
            Label : 'Rank',
        },
    ],
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Vendor Response',
            ID : 'VendorResponse',
            Target : '@UI.FieldGroup#VendorResponse',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Terms and Conditions',
            ID : 'TermsandConditions',
            Target : '@UI.FieldGroup#TermsandConditions',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Item Details',
            ID : 'ItemDetails',
            Target : 'vendtopd/@UI.LineItem#ItemDetails',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'item level info',
            ID : 'itemlevelinfo',
            Target : '@UI.FieldGroup#itemlevelinfo',
        },
    ],
    UI.FieldGroup #VendorResponse : {
        $Type : 'UI.FieldGroupType',
           Data : [
            {
                $Type: 'UI.DataField',
                Value: Contract_Period,
                Label: 'Contract Period',
            },
            {
                $Type: 'UI.DataField',
                Value: Order_Type_Parties_contacted_and_technically_accepted,
                Label: 'Order Type Parties Contacted And Technically Accepted ( Rational If On Single Vendor Basis)',
            },
            {
                $Type: 'UI.DataField',
                Value: Contract_Manager_Name,
                Label: 'Contract Manager Name (Incase Of Services): Group Price Benchmarking( Applicable For Supply) Kindly Provide Details In Standard Format',
            },
            {
                $Type: 'UI.DataField',
                Value: Is_Vendor_dependency,
                Label: ' Is Vendor dependency > 50%',
            },
            {
                $Type: 'UI.DataField',
                Value: Vendors_Latest_Available_Turnover,
                Label: 'Vendors Latest Available Turnover ( In INR Cr.) ₹',
            },
            {
                $Type: 'UI.DataField',
                Value: Total_Vendor_Spend_for_Current_FY,
                Label: 'Total Vendor Spend For Current FY (In INR Cr.) (Total Open Value As On NFA Date + Proposed Annual Value)₹',
            },
            {
                $Type: 'UI.DataField',
                Value: Shortlisted_Parties_Credentials_Background,
                Label: 'Shortlisted Parties Credentials/Background',
            },
            {
                $Type: 'UI.DataField',
                Value: Internal_SLAs_KPIs_for_the_contract,
                Label: 'Internal SLAs/KPIs For The Contract:',
            },
            {
                $Type: 'UI.DataField',
                Value: Contract_Value_Basic_Value,
                Label: 'Contract Value (Basic Value)',
            },
            {
                $Type: 'UI.DataField',
                Value: FTA_EPCG_any_other_benefit_availed_for_duty_saving,
                Label: 'FTA/EPCG/ Any Other Benefit Availed For Duty Saving',
            },
            {
                $Type: 'UI.DataField',
                Value: Approximate_Duty_Amount_in_INR,
                Label: 'Approximate Duty Amount In INR ₹',
            },
            {
                $Type: 'UI.DataField',
                Value: Monthly_Quantity,
                Label: 'Monthly Quantity',
            },
            {
                $Type: 'UI.DataField',
                Value: Reason_for_Post_Facto_NFA_If_Applicable,
                Label: 'Reason For Post Facto NFA ( If Applicable)',
            },
            {
                $Type: 'UI.DataField',
                Value: Inco_term,
                Label: 'Inco Term',
            },
            {
                $Type: 'UI.DataField',
                Value: Terms_Of_Payment_milestone_on_which_payment_will_be_made,
                Label: 'Terms Of Payment & Milestone On Which Payment Will Be Made:',
            },
            {
                $Type: 'UI.DataField',
                Value: Packing_Forwarding,
                Label: 'Packing & Forwarding',
            },
            {
                $Type: 'UI.DataField',
                Value: Insurance,
                Label: 'Insurance',
            },
            {
                $Type: 'UI.DataField',
                Value: Liquidated_Damages,
                Label: 'Liquidated Damages',
            },
            {
                $Type: 'UI.DataField',
                Value: Liquidated_Damages_Clause,
                Label: 'Liquidated Damages Clause',
            },
            {
                $Type: 'UI.DataField',
                Value: PBG_and_SD,
                Label: 'PBG and SD',
            },
            {
                $Type: 'UI.DataField',
                Value: PBG_and_SD_Clause,
                Label: 'PBG and SD Clause',
            },
            {
                $Type: 'UI.DataField',
                Value: Job_Clearance_Certificates,
                Label: 'Job Clearance Certificates',
            },
            {
                $Type: 'UI.DataField',
                Value: HR_Clearance_Certificates,
                Label: 'HR Clearance Certificates',
            },
            {
                $Type: 'UI.DataField',
                Value: Other_Key_Terms,
                Label: 'Other Key Terms (Eg: Warranty, Inspection Clause, GTC Deviation, Party Delivery. Etc)',
            },
        ],
    },
    UI.FieldGroup #TermsandConditions : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: Rational_for_awarding_contract_to_dependent_partner,
                Label: 'Rational For Awarding Contract To Dependent Partner',
            }
        ],
    },
    UI.FieldGroup #itemlevelinfo : {
        $Type : 'UI.FieldGroupType',
       Data : [
            {
                $Type : 'UI.DataField',
                Value : vendtopd.Product_Service_Description_Background,
                Label : 'Product Service Description Background',
            },
            {
                $Type : 'UI.DataField',
                Value : vendtopd.Approval_Requested_For_Subject,
                Label : 'Approval Requested For Subject',
            },
            {
                $Type : 'UI.DataField',
                Value : vendtopd.Comparison_of_offer,
                Label : 'Comparison of offer',
            },
            {
                $Type : 'UI.DataField',
                Value : vendtopd.Tax_Amount,
                Label : 'Tax Amount',
            },
            {
                $Type : 'UI.DataField',
                Value : vendtopd.Freight,
                Label : 'Freight',
            },
            {
                $Type : 'UI.DataField',
                Value : Delivery_Lead_Time,
                Label : 'Delivery Lead Time',
            },
        ],
    },
    UI.HeaderInfo : {
        TypeName : 'PAN Vendor Data',
        TypeNamePlural : '',
    },
);

annotate service.PAN_PAYMENT_TERM_DETAILS_APR with @(
    UI.LineItem #PaymentTermDetails : [
        {
        $Type: 'UI.DataField',
        Value: slNo,
        Label: 'SlNo',
    },
    {
        $Type: 'UI.DataField',
        Value: Payment_methord,
        Label: 'Payment Method',
    },
    {
        $Type: 'UI.DataField',
        Value: Percentage,
        Label: 'Percentage',
    },
    {
        $Type: 'UI.DataField',
        Value: Description,
        Label: 'Description',
    },
    {
        $Type: 'UI.DataField',
        Value: Due_date,
        Label: 'Due Date',
    },
    {
        $Type: 'UI.DataField',
        Value: Mandatory_Documents_OR_Submissions,
        Label: 'Mandatory Documents OR Submissions',
    },
    {
        $Type: 'UI.DataField',
        Value: To_be_certified_in_Company,
        Label: 'To Be Certified In Company',
    },
    ]
);

annotate service.PAN_PRICE_DETAILS_APR with @(
    UI.LineItem #ItemDetails : [
          {
            $Type : 'UI.DataField',
            Value : Item_Code,
            Label : 'Item Code',
        },
        {
            $Type : 'UI.DataField',
            Value : HSN_OR_SAC_Code,
            Label : 'HSN Or SAC Code',
        },
        {
            $Type : 'UI.DataField',
            Value : Item_Short_Description,
            Label : 'Item Short Description',
        },
        {
            $Type : 'UI.DataField',
            Value : UOM,
            Label : 'UOM',
        },
        {
            $Type : 'UI.DataField',
            Value : Quantity,
            Label : 'Quantity',
        },
        {
            $Type : 'UI.DataField',
            Value : Unit_Price,
            Label : 'Unit Price',
        },
        {
            $Type : 'UI.DataField',
            Value : Amount,
            Label : 'Amount',
        },
        {
            $Type : 'UI.DataField',
            Value : Indian_Tax_PER,
            Label : 'Indian Tax PER',
        },
    ]
);

annotate service.PAN_Details_APR with {
    PAN_Number @Common.Label : 'PAN_Number'
};


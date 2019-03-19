package com.wsplanning.webapp.dto;

import java.text.SimpleDateFormat;
import java.util.List;

public class WOCustomerDTO {

    public Integer CustNo;
    public Integer CustId;
    public String Skey;
    public String Email;
    public String LName;
    public String FName;
    public String Tel1;  
    public String Tel2;
    public String Tel3;
    public String Tel4;
    public String Address;
    public String City;
    public String PostalCode;
    public String AccountGroup;
    public String InvoiceGroup;
    public String CreditHold;
    public String CustomerName;
    //
    public List<DynamicDataDTO> DynamicDataFields;

   

    // //
    // public List<DynamicDataDTO> getDynamicDataFields() {
    //     return this.DynamicDataFields;
    // }

    // public void setDynamicDataFields(List<DynamicDataDTO> DynamicDataFields) {
    //     this.DynamicDataFields = DynamicDataFields;
    // }

}
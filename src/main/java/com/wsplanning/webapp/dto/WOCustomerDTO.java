package com.wsplanning.webapp.dto;

import java.text.SimpleDateFormat;

public class WOCustomerDTO {

    private Integer CustNo;
    private Integer CustId;
    private String Skey;
    private String Email;
    private String LName;
    private String FName;
    private String Tel1;  
    private String Tel2;
    private String Tel3;
    private String Tel4;
    private String Address;
    private String City;
    private String PostalCode;
    private String AccountGroup;
    private String InvoiceGroup;
    private String CreditHold;
    private String CustomerName;
    //
    private String DynamicDataFields;

    public Integer getCustNo() {
        return this.CustNo;
    }

    public void setCustNo(Integer CustNo) {
        this.CustNo = CustNo;
    }

    public Integer getCustId() {
        return this.CustId;
    }

    public void setCustId(Integer CustId) {
        this.CustId = CustId;
    }

    public String getSkey() {
        return this.Skey;
    }

    public void setSkey(String Skey) {
        this.Skey = Skey;
    }

    public String getEmail() {
        return this.Email;
    }

    public void setEmail(String Email) {
        this.Email = Email;
    }

    public String getLName() {
        return this.LName;
    }

    public void setLName(String LName) {
        this.LName = LName;
    }

    public String getFName() {
        return this.FName;
    }

    public void setFName(String FName) {
        this.FName = FName;
    }

    public String getTel1() {
        return this.Tel1;
    }

    public void setTel1(String Tel1) {
        this.Tel1 = Tel1;
    }

    public String getTel2() {
        return this.Tel2;
    }

    public void setTel2(String Tel2) {
        this.Tel2 = Tel2;
    }

    public String getTel3() {
        return this.Tel3;
    }

    public void setTel3(String Tel3) {
        this.Tel3 = Tel3;
    }

    public String getTel4() {
        return this.Tel4;
    }

    public void setTel4(String Tel4) {
        this.Tel4 = Tel4;
    }

    public String getAddress() {
        return this.Address;
    }

    public void setAddress(String Address) {
        this.Address = Address;
    }

    public String getCity() {
        return this.City;
    }

    public void setCity(String City) {
        this.City = City;
    }

    public String getPostalCode() {
        return this.PostalCode;
    }

    public void setPostalCode(String PostalCode) {
        this.PostalCode = PostalCode;
    }

    public String getAccountGroup() {
        return this.AccountGroup;
    }

    public void setAccountGroup(String AccountGroup) {
        this.AccountGroup = AccountGroup;
    }

    public String getInvoiceGroup() {
        return this.InvoiceGroup;
    }

    public void setInvoiceGroup(String InvoiceGroup) {
        this.InvoiceGroup = InvoiceGroup;
    }

    public String getCreditHold() {
        return this.CreditHold;
    }

    public void setCreditHold(String CreditHold) {
        this.CreditHold = CreditHold;
    }

    public String getCustomerName() {
        return this.CustomerName;
    }

    public void setCustomerName(String CustomerName) {
        this.CustomerName = CustomerName;
    }

    //
    public String getDynamicDataFields() {
        return this.DynamicDataFields;
    }

    public void setDynamicDataFields(String DynamicDataFields) {
        this.DynamicDataFields = DynamicDataFields;
    }

}
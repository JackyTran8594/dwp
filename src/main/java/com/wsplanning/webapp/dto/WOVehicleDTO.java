package com.wsplanning.webapp.dto;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Date;

public class WOVehicleDTO {

    public Integer VehiId;
    private String LicenseNo;
    private String VIN;
    private String Make;
    private String Model;
    private String SubModel;
    private String WarrantyInfo;
    private Date NextMOTDate;
    private WOCustomerDTO PayerCustomer;
    private WOCustomerDTO HolderCustomer;
    private WOCustomerDTO UserCustomer;
    //
    private List<DynamicDataDTO> DynamicDataFields;

    public Integer getVehiId() {
        return this.VehiId;
    }

    public void setVehiId(Integer VehiId) {
        this.VehiId = VehiId;
    }

    public String getLicenseNo() {
        return this.LicenseNo;
    }

    public void setLicenseNo(String LicenseNo) {
        this.LicenseNo = LicenseNo;
    }

    public String getVIN() {
        return this.VIN;
    }

    public void setVIN(String VIN) {
        this.VIN = VIN;
    }

    public String getMake() {
        return this.Make;
    }

    public void setMake(String Make) {
        this.Make = Make;
    }

    public String getModel() {
        return this.Model;
    }

    public void setModel(String Model) {
        this.Model = Model;
    }

    public String getSubModel() {
        return this.SubModel;
    }

    public void setSubModel(String SubModel) {
        this.SubModel = SubModel;
    }

    public String getWarrantyInfo() {
        return this.WarrantyInfo;
    }

    public void setWarrantyInfo(String WarrantyInfo) {
        this.WarrantyInfo = WarrantyInfo;
    }

    public Date getNextMOTDate() {
        return this.NextMOTDate;
    }

    public void setNextMOTDate(Date NextMOTDate) {
        this.NextMOTDate = NextMOTDate;
    }

    public WOCustomerDTO getPayerCustomer() {
        return this.PayerCustomer;
    }

    public void setPayerCustomer(WOCustomerDTO PayerCustomer) {
        this.PayerCustomer = PayerCustomer;
    }

    public WOCustomerDTO getHolderCustomer() {
        return this.HolderCustomer;
    }

    public void setHolderCustomer(WOCustomerDTO HolderCustomer) {
        this.HolderCustomer = HolderCustomer;
    }

    public WOCustomerDTO getUserCustomer() {
        return this.UserCustomer;
    }

    public void setUserCustomer(WOCustomerDTO UserCustomer) {
        this.UserCustomer = UserCustomer;
    }

    public List<DynamicDataDTO> getDynamicDataFields() {
        return this.DynamicDataFields;
    }

    public void setDynamicDataFields(List<DynamicDataDTO> DynamicDataFields) {
        this.DynamicDataFields = DynamicDataFields;
    }

}
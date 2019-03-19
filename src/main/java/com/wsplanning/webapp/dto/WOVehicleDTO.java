package com.wsplanning.webapp.dto;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Date;

public class WOVehicleDTO {

    public Integer VehiId;
    public String LicenseNo;
    public String VIN;
    public String Make;
    public String Model;
    public String SubModel;
    public String WarrantyInfo;
    public Date NextMOTDate;
    public WOCustomerDTO PayerCustomer;
    public WOCustomerDTO HolderCustomer;
    public WOCustomerDTO UserCustomer;
    //
    public List<DynamicDataDTO> DynamicDataFields;

}
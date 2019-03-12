package com.wsplanning.webapp.dto;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class WODTO {

    public Integer WorkOrderNo;
    public Integer WorkOrderId;
    public Date ServiceDate;
    public Date ExecutionDate;
    public Date CheckInDate;
    public Date CheckOutDate;
    public Date BookMOTDate;
    public Date BookTireDate;
    public String ServiceAdvisorId;
    public String DeliveredBy;
    public String TransactionType;
    public String DeptId;
    public String StampStatus;
    public Date WorkReadyDate;
    public Date WorkReadyForInvoiceDate;
    public Integer IsCustomerWaiting;
    public Integer IsRework;
    public String TimeBarText;
    public String SiteId;
    public Integer IsTimeReservation;
    public Integer Mileage;
    public String StampId;
    public String VisitReasonCode;
    public Integer BookingId;
    public String JobTitle;
    public String CustomerComplaint;
    
    public String Vehicle;
    public WOVehicleDTO WOVehicle;
    public WOCustomerDTO WOCustomer;
    public WOCustomerDTO WOContact;
    public String WOAttachments;
    public String BookedResources;
    public String BookedResourcePools;
    public List<WOJobDTO> WOJobs;
    public String Token;

    public WOVehicleDTO getWOVehicle() {
        return WOVehicle;
    }


}
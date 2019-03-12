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
    public List<WOAttachmentDTO> WOAttachments;
    public List<WOResourceDTO> BookedResources;
    public List<WOResourcePoolDTO> BookedResourcePools;
    public List<WOJobDTO> WOJobs;
    public TokenDTO Token;

    public WOVehicleDTO getWOVehicle() {
        return WOVehicle;
    }

    public WOCustomerDTO getWOCustomer() {
        return WOCustomer;
    }

    public WOCustomerDTO getWOContact() {
        return WOContact;
    }

    public List<WOAttachmentDTO> getWOAttachments() {
        return WOAttachments;
    }


    public List<WOJobDTO> getWOJobs() {
        return WOJobs;
    }

    public TokenDTO getToken() {
        return Token;
    }

}
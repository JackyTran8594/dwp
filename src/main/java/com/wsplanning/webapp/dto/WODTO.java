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
    // public Integer IsRework;
    public String TimeBarText;
    public String SiteId;
    public Integer IsTimeReservation;
    public Integer Mileage;
    public Integer StampId;
    public String VisitReasonCode;
    public Integer BookingId;
    public String JobTitle;
    public String CustomerComplaint;
    public Integer IsPickupService;
    public String PickupSmanId;
    public String PickupNote;
    public Integer IsReturnService;
    public String ReturnSmanId;
    public String ReturnNote;
    public String Vehicle;
    public WOVehicleDTO WOVehicle;
    public WOCustomerDTO WOCustomer;
    public WOCustomerDTO WOContact;
    public List<WOAttachmentDTO> WOAttachments;
    public List<WOResourceDTO> BookedResources;
    public List<WOResourcePoolDTO> BookedResourcePools;
    public List<WOJobDTO> WOJobs;
    public TokenDTO Token;



    // public WOVehicleDTO getWOVehicle() {
    //     return this.WOVehicle;
    // }

    // public void setWOVehicle(WOVehicleDTO WOVehicle) {
    //     this.WOVehicle = WOVehicle;
    // }

    // public WOCustomerDTO getWOCustomer() {
    //     return this.WOCustomer;
    // }

    // public void setWOCustomer(WOCustomerDTO WOCustomer) {
    //     this.WOCustomer = WOCustomer;
    // }

    // public WOCustomerDTO getWOContact() {
    //     return this.WOContact;
    // }

    // public void setWOContact(WOCustomerDTO WOContact) {
    //     this.WOContact = WOContact;
    // }

    // public List<WOAttachmentDTO> getWOAttachments() {
    //     return this.WOAttachments;
    // }

    // public void setWOAttachments(List<WOAttachmentDTO> WOAttachments) {
    //     this.WOAttachments = WOAttachments;
    // }

    // public List<WOResourceDTO> getBookedResources() {
    //     return this.BookedResources;
    // }

    // public void setBookedResources(List<WOResourceDTO> BookedResources) {
    //     this.BookedResources = BookedResources;
    // }

    // public List<WOResourcePoolDTO> getBookedResourcePools() {
    //     return this.BookedResourcePools;
    // }

    // public void setBookedResourcePools(List<WOResourcePoolDTO> BookedResourcePools) {
    //     this.BookedResourcePools = BookedResourcePools;
    // }

    // public List<WOJobDTO> getWOJobs() {
    //     return this.WOJobs;
    // }

    // public void setWOJobs(List<WOJobDTO> WOJobs) {
    //     this.WOJobs = WOJobs;
    // }

    // public TokenDTO getToken() {
    //     return this.Token;
    // }

    // public void setToken(TokenDTO Token) {
    //     this.Token = Token;
    // }

   
}
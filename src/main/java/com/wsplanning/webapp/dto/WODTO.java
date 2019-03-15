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


    public Integer getWorkOrderNo() {
        return this.WorkOrderNo;
    }

    public void setWorkOrderNo(Integer WorkOrderNo) {
        this.WorkOrderNo = WorkOrderNo;
    }

    public Integer getWorkOrderId() {
        return this.WorkOrderId;
    }

    public void setWorkOrderId(Integer WorkOrderId) {
        this.WorkOrderId = WorkOrderId;
    }

    public Date getServiceDate() {
        return this.ServiceDate;
    }

    public void setServiceDate(Date ServiceDate) {
        this.ServiceDate = ServiceDate;
    }

    public Date getExecutionDate() {
        return this.ExecutionDate;
    }

    public void setExecutionDate(Date ExecutionDate) {
        this.ExecutionDate = ExecutionDate;
    }

    public Date getCheckInDate() {
        return this.CheckInDate;
    }

    public void setCheckInDate(Date CheckInDate) {
        this.CheckInDate = CheckInDate;
    }

    public Date getCheckOutDate() {
        return this.CheckOutDate;
    }

    public void setCheckOutDate(Date CheckOutDate) {
        this.CheckOutDate = CheckOutDate;
    }

    public Date getBookMOTDate() {
        return this.BookMOTDate;
    }

    public void setBookMOTDate(Date BookMOTDate) {
        this.BookMOTDate = BookMOTDate;
    }

    public Date getBookTireDate() {
        return this.BookTireDate;
    }

    public void setBookTireDate(Date BookTireDate) {
        this.BookTireDate = BookTireDate;
    }

    public String getServiceAdvisorId() {
        return this.ServiceAdvisorId;
    }

    public void setServiceAdvisorId(String ServiceAdvisorId) {
        this.ServiceAdvisorId = ServiceAdvisorId;
    }

    public String getDeliveredBy() {
        return this.DeliveredBy;
    }

    public void setDeliveredBy(String DeliveredBy) {
        this.DeliveredBy = DeliveredBy;
    }

    public String getTransactionType() {
        return this.TransactionType;
    }

    public void setTransactionType(String TransactionType) {
        this.TransactionType = TransactionType;
    }

    public String getDeptId() {
        return this.DeptId;
    }

    public void setDeptId(String DeptId) {
        this.DeptId = DeptId;
    }

    public String getStampStatus() {
        return this.StampStatus;
    }

    public void setStampStatus(String StampStatus) {
        this.StampStatus = StampStatus;
    }

    public Date getWorkReadyDate() {
        return this.WorkReadyDate;
    }

    public void setWorkReadyDate(Date WorkReadyDate) {
        this.WorkReadyDate = WorkReadyDate;
    }

    public Date getWorkReadyForInvoiceDate() {
        return this.WorkReadyForInvoiceDate;
    }

    public void setWorkReadyForInvoiceDate(Date WorkReadyForInvoiceDate) {
        this.WorkReadyForInvoiceDate = WorkReadyForInvoiceDate;
    }

    public Integer getIsCustomerWaiting() {
        return this.IsCustomerWaiting;
    }

    public void setIsCustomerWaiting(Integer IsCustomerWaiting) {
        this.IsCustomerWaiting = IsCustomerWaiting;
    }

    // public Integer getIsRework() {
    //     return this.IsRework;
    // }

    // public void setIsRework(Integer IsRework) {
    //     this.IsRework = IsRework;
    // }

    public String getTimeBarText() {
        return this.TimeBarText;
    }

    public void setTimeBarText(String TimeBarText) {
        this.TimeBarText = TimeBarText;
    }

    public String getSiteId() {
        return this.SiteId;
    }

    public void setSiteId(String SiteId) {
        this.SiteId = SiteId;
    }

    public Integer getIsTimeReservation() {
        return this.IsTimeReservation;
    }

    public void setIsTimeReservation(Integer IsTimeReservation) {
        this.IsTimeReservation = IsTimeReservation;
    }

    public Integer getMileage() {
        return this.Mileage;
    }

    public void setMileage(Integer Mileage) {
        this.Mileage = Mileage;
    }

    public Integer getStampId() {
        return this.StampId;
    }

    public void setStampId(Integer StampId) {
        this.StampId = StampId;
    }

    public String getVisitReasonCode() {
        return this.VisitReasonCode;
    }

    public void setVisitReasonCode(String VisitReasonCode) {
        this.VisitReasonCode = VisitReasonCode;
    }

    public Integer getBookingId() {
        return this.BookingId;
    }

    public void setBookingId(Integer BookingId) {
        this.BookingId = BookingId;
    }

    public String getJobTitle() {
        return this.JobTitle;
    }

    public void setJobTitle(String JobTitle) {
        this.JobTitle = JobTitle;
    }

    public String getCustomerComplaint() {
        return this.CustomerComplaint;
    }

    public void setCustomerComplaint(String CustomerComplaint) {
        this.CustomerComplaint = CustomerComplaint;
    }

    public Integer getIsPickupService() {
        return this.IsPickupService;
    }

    public void setIsPickupService(Integer IsPickupService) {
        this.IsPickupService = IsPickupService;
    }

    public String getPickupSmanId() {
        return this.PickupSmanId;
    }

    public void setPickupSmanId(String PickupSmanId) {
        this.PickupSmanId = PickupSmanId;
    }

    public String getPickupNote() {
        return this.PickupNote;
    }

    public void setPickupNote(String PickupNote) {
        this.PickupNote = PickupNote;
    }

    public Integer getIsReturnService() {
        return this.IsReturnService;
    }

    public void setIsReturnService(Integer IsReturnService) {
        this.IsReturnService = IsReturnService;
    }

    public String getReturnSmanId() {
        return this.ReturnSmanId;
    }

    public void setReturnSmanId(String ReturnSmanId) {
        this.ReturnSmanId = ReturnSmanId;
    }

    public String getReturnNote() {
        return this.ReturnNote;
    }

    public void setReturnNote(String ReturnNote) {
        this.ReturnNote = ReturnNote;
    }

    public String getVehicle() {
        return this.Vehicle;
    }

    public void setVehicle(String Vehicle) {
        this.Vehicle = Vehicle;
    }

    public WOVehicleDTO getWOVehicle() {
        return this.WOVehicle;
    }

    public void setWOVehicle(WOVehicleDTO WOVehicle) {
        this.WOVehicle = WOVehicle;
    }

    public WOCustomerDTO getWOCustomer() {
        return this.WOCustomer;
    }

    public void setWOCustomer(WOCustomerDTO WOCustomer) {
        this.WOCustomer = WOCustomer;
    }

    public WOCustomerDTO getWOContact() {
        return this.WOContact;
    }

    public void setWOContact(WOCustomerDTO WOContact) {
        this.WOContact = WOContact;
    }

    public List<WOAttachmentDTO> getWOAttachments() {
        return this.WOAttachments;
    }

    public void setWOAttachments(List<WOAttachmentDTO> WOAttachments) {
        this.WOAttachments = WOAttachments;
    }

    public List<WOResourceDTO> getBookedResources() {
        return this.BookedResources;
    }

    public void setBookedResources(List<WOResourceDTO> BookedResources) {
        this.BookedResources = BookedResources;
    }

    public List<WOResourcePoolDTO> getBookedResourcePools() {
        return this.BookedResourcePools;
    }

    public void setBookedResourcePools(List<WOResourcePoolDTO> BookedResourcePools) {
        this.BookedResourcePools = BookedResourcePools;
    }

    public List<WOJobDTO> getWOJobs() {
        return this.WOJobs;
    }

    public void setWOJobs(List<WOJobDTO> WOJobs) {
        this.WOJobs = WOJobs;
    }

    public TokenDTO getToken() {
        return this.Token;
    }

    public void setToken(TokenDTO Token) {
        this.Token = Token;
    }

   
}
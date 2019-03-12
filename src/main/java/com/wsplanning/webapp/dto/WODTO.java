package com.wsplanning.webapp.dto;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class WODTO {

    public String WorkOrderNo;
    public String WorkOrderId;
    public Date ServiceDate;
    public String ExecutionDate;
    public String CheckInDate;
    public String CheckOutDate;
    public String BookMOTDate;
    public String BookTireDate;
    public String ServiceAdvisorId;
    public String DeliveredBy;
    public String TransactionType;
    public String DeptId;
    public String StampStatus;
    public String WorkReadyDate;
    public String WorkReadyForInvoiceDate;
    public String IsCustomerWaiting;
    public String IsRework;
    public String TimeBarText;
    public String SiteId;
    public int IsTimeReservation;
    public int Mileage;
    public String StampId;
    public String VisitReasonCode;
    public String BookingId;
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

    public void setWOVehicle(WOVehicleDTO WOVehicle) {
        this.WOVehicle = WOVehicle;
    }

    public WOCustomerDTO getWOContact() {
        return WOContact;
    }

    public void setWOContact(WOCustomerDTO WOContact) {
        this.WOContact = WOContact;
    }

    public WOCustomerDTO getWOCustomer() {
        return WOCustomer;
    }

    public void setWOCustomer(WOCustomerDTO WOCustomer) {
        this.WOCustomer = WOCustomer;
    }

    public String getWorkOrderNo() {
        return this.WorkOrderNo;
    }

    public void setWorkOrderNo(String WorkOrderNo) {
        this.WorkOrderNo = WorkOrderNo;
    }

    public String getWorkOrderId() {
        return this.WorkOrderId;
    }

    public void setWorkOrderId(String WorkOrderId) {
        this.WorkOrderId = WorkOrderId;
    }

    public Date getServiceDate() {
        return this.ServiceDate;
    }

    public void setServiceDate(Date ServiceDate) {
        this.ServiceDate = ServiceDate;
    }

    public String getExecutionDate() {
        return this.ExecutionDate;
    }

    public void setExecutionDate(String ExecutionDate) {
        this.ExecutionDate = ExecutionDate;
    }

    public String getCheckInDate() {
        return this.CheckInDate;
    }

    public void setCheckInDate(String CheckInDate) {
        this.CheckInDate = CheckInDate;
    }

    public String getCheckOutDate() {
        return this.CheckOutDate;
    }

    public void setCheckOutDate(String CheckOutDate) {
        this.CheckOutDate = CheckOutDate;
    }

    public String getBookMOTDate() {
        return this.BookMOTDate;
    }

    public void setBookMOTDate(String BookMOTDate) {
        this.BookMOTDate = BookMOTDate;
    }

    public String getBookTireDate() {
        return this.BookTireDate;
    }

    public void setBookTireDate(String BookTireDate) {
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

    public String getWorkReadyDate() {
        return this.WorkReadyDate;
    }

    public void setWorkReadyDate(String WorkReadyDate) {
        this.WorkReadyDate = WorkReadyDate;
    }

    public String getWorkReadyForInvoiceDate() {
        return this.WorkReadyForInvoiceDate;
    }

    public void setWorkReadyForInvoiceDate(String WorkReadyForInvoiceDate) {
        this.WorkReadyForInvoiceDate = WorkReadyForInvoiceDate;
    }

    public String getIsCustomerWaiting() {
        return this.IsCustomerWaiting;
    }

    public void setIsCustomerWaiting(String IsCustomerWaiting) {
        this.IsCustomerWaiting = IsCustomerWaiting;
    }

    public String getIsRework() {
        return this.IsRework;
    }

    public void setIsRework(String IsRework) {
        this.IsRework = IsRework;
    }

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

    public int getIsTimeReservation() {
        return this.IsTimeReservation;
    }

    public void setIsTimeReservation(int IsTimeReservation) {
        this.IsTimeReservation = IsTimeReservation;
    }

    public int getMileage() {
        return this.Mileage;
    }

    public void setMileage(int Mileage) {
        this.Mileage = Mileage;
    }

    public String getStampId() {
        return this.StampId;
    }

    public void setStampId(String StampId) {
        this.StampId = StampId;
    }

    public String getVisitReasonCode() {
        return this.VisitReasonCode;
    }

    public void setVisitReasonCode(String VisitReasonCode) {
        this.VisitReasonCode = VisitReasonCode;
    }

    public String getBookingId() {
        return this.BookingId;
    }

    public void setBookingId(String BookingId) {
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

    public String getVehicle() {
        return this.Vehicle;
    }

    public void setVehicle(String Vehicle) {
        this.Vehicle = Vehicle;
    }

    public String getWOAttachments() {
        return this.WOAttachments;
    }

    public void setWOAttachments(String WOAttachments) {
        this.WOAttachments = WOAttachments;
    }

    public String getBookedResources() {
        return this.BookedResources;
    }

    public void setBookedResources(String BookedResources) {
        this.BookedResources = BookedResources;
    }

    public String getBookedResourcePools() {
        return this.BookedResourcePools;
    }

    public void setBookedResourcePools(String BookedResourcePools) {
        this.BookedResourcePools = BookedResourcePools;
    }

    public List<WOJobDTO> getWOJobs() {
        return WOJobs;
    }

    public void setWOJobs(List<WOJobDTO> WOJobs) {
        this.WOJobs = WOJobs;
    }

    public String getToken() {
        return this.Token;
    }

    public void setToken(String Token) {
        this.Token = Token;
    }

}
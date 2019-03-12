package com.wsplanning.webapp.dto;

import java.text.SimpleDateFormat;
import java.util.List;

import org.apache.poi.hpsf.Decimal;

public class WOJobDTO {
    
    public Integer RowId;
    public Integer JobNo;
    public String Note;
    public String Complaint;
    public Number EstimatedTime;
    public String SmanId;
    public Integer ChargeCategoryId;
    public String DeptId;
    public String JobType;
    public String JobCategory;
    public String Payer;
    public String MainGroupId;
    public String SubGroupId;
    public List<ServiceItemDTO> Items;
    public List<WOAttachmentDTO> JobAttachments;
    public List<DynamicDataDTO> AdditionalData;


    public Integer getRowId() {
        return this.RowId;
    }

    public void setRowId(Integer RowId) {
        this.RowId = RowId;
    }

    public Integer getJobNo() {
        return this.JobNo;
    }

    public void setJobNo(Integer JobNo) {
        this.JobNo = JobNo;
    }

    public String getNote() {
        return this.Note;
    }

    public void setNote(String Note) {
        this.Note = Note;
    }

    public String getComplaint() {
        return this.Complaint;
    }

    public void setComplaint(String Complaint) {
        this.Complaint = Complaint;
    }

    public Number getEstimatedTime() {
        return this.EstimatedTime;
    }

    public void setEstimatedTime(Number EstimatedTime) {
        this.EstimatedTime = EstimatedTime;
    }

    public String getSmanId() {
        return this.SmanId;
    }

    public void setSmanId(String SmanId) {
        this.SmanId = SmanId;
    }

    public Integer getChargeCategoryId() {
        return this.ChargeCategoryId;
    }

    public void setChargeCategoryId(Integer ChargeCategoryId) {
        this.ChargeCategoryId = ChargeCategoryId;
    }

    public String getDeptId() {
        return this.DeptId;
    }

    public void setDeptId(String DeptId) {
        this.DeptId = DeptId;
    }

    public String getJobType() {
        return this.JobType;
    }

    public void setJobType(String JobType) {
        this.JobType = JobType;
    }

    public String getJobCategory() {
        return this.JobCategory;
    }

    public void setJobCategory(String JobCategory) {
        this.JobCategory = JobCategory;
    }

    public String getPayer() {
        return this.Payer;
    }

    public void setPayer(String Payer) {
        this.Payer = Payer;
    }

    public String getMainGroupId() {
        return this.MainGroupId;
    }

    public void setMainGroupId(String MainGroupId) {
        this.MainGroupId = MainGroupId;
    }

    public String getSubGroupId() {
        return this.SubGroupId;
    }

    public void setSubGroupId(String SubGroupId) {
        this.SubGroupId = SubGroupId;
    }

    public List<ServiceItemDTO> getItems() {
        return this.Items;
    }

    public void setItems(List<ServiceItemDTO> Items) {
        this.Items = Items;
    }

    public List<WOAttachmentDTO> getJobAttachments() {
        return this.JobAttachments;
    }

    public void setJobAttachments(List<WOAttachmentDTO> JobAttachments) {
        this.JobAttachments = JobAttachments;
    }

    public List<DynamicDataDTO> getAdditionalData() {
        return this.AdditionalData;
    }

    public void setAdditionalData(List<DynamicDataDTO> AdditionalData) {
        this.AdditionalData = AdditionalData;
    }
   

}


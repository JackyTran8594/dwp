package com.wsplanning.webapp.dto;

import java.text.SimpleDateFormat;

import org.apache.poi.hpsf.Decimal;

public class WOJobDTO {
    
    public Integer RowId;
    public Integer JobNo;
    public String Note;
    public String Complaint;
    public Decimal EstimatedTime;
    public String SmanId;
    public Integer ChargeCategoryId;
    public String DeptId;
    public String JobType;
    public String JobCategory;
    public String Payer;
    public String MainGroupId;
    public String SubGroupId;
    public String Items;
    public String JobAttachments;
    public String AdditionalData;

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

    public Decimal getEstimatedTime() {
        return this.EstimatedTime;
    }

    public void setEstimatedTime(Decimal EstimatedTime) {
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

    public String getItems() {
        return this.Items;
    }

    public void setItems(String Items) {
        this.Items = Items;
    }

    public String getJobAttachments() {
        return this.JobAttachments;
    }

    public void setJobAttachments(String JobAttachments) {
        this.JobAttachments = JobAttachments;
    }

    public String getAdditionalData() {
        return this.AdditionalData;
    }

    public void setAdditionalData(String AdditionalData) {
        this.AdditionalData = AdditionalData;
    }


}


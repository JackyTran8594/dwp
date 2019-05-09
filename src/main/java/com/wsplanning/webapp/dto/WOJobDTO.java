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
	public String DiagnosticInfo ;
    public String SolutionInfo;
    public List<ServiceItemDTO> Items;
    public List<WOAttachmentDTO> JobAttachments;
    public List<DynamicDataDTO> AdditionalData;

}


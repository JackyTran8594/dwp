package com.wsplanning.webapp.dto;

import java.util.Date;

import org.apache.poi.hpsf.Decimal;

public class TokenDTO {
    
    public String Token;
    public String LangId;
    public Date Expired;
    public String DMSUserId;
    public String ProfileId;
    public String SiteId;
    public Integer ErrorCode;
    public String ErrorDesc;
    public EmployeeDTO EmployeeData;


    public String getToken() {
        return this.Token;
    }

    public void setToken(String Token) {
        this.Token = Token;
    }

    public String getLangId() {
        return this.LangId;
    }

    public void setLangId(String LangId) {
        this.LangId = LangId;
    }

    public Date getExpired() {
        return this.Expired;
    }

    public void setExpired(Date Expired) {
        this.Expired = Expired;
    }

    public String getDMSUserId() {
        return this.DMSUserId;
    }

    public void setDMSUserId(String DMSUserId) {
        this.DMSUserId = DMSUserId;
    }

    public String getProfileId() {
        return this.ProfileId;
    }

    public void setProfileId(String ProfileId) {
        this.ProfileId = ProfileId;
    }

    public String getSiteId() {
        return this.SiteId;
    }

    public void setSiteId(String SiteId) {
        this.SiteId = SiteId;
    }

    public Integer getErrorCode() {
        return this.ErrorCode;
    }

    public void setErrorCode(Integer ErrorCode) {
        this.ErrorCode = ErrorCode;
    }

    public String getErrorDesc() {
        return this.ErrorDesc;
    }

    public void setErrorDesc(String ErrorDesc) {
        this.ErrorDesc = ErrorDesc;
    }

    public EmployeeDTO getEmployeeData() {
        return this.EmployeeData;
    }

    public void setEmployeeData(EmployeeDTO EmployeeData) {
        this.EmployeeData = EmployeeData;
    }

   

  
}
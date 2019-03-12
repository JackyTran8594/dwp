package com.wsplanning.webapp.dto;
import java.util.Date;

public class WOResourceDTO {
    public Integer RowId;
    public Integer Duration;
    public Date EndTime;
    public String ResourceId;
    public Integer ResourceType;
    public Date StartTime;

    public Integer getRowId() {
        return this.RowId;
    }

    public void setRowId(Integer RowId) {
        this.RowId = RowId;
    }

    public Integer getDuration() {
        return this.Duration;
    }

    public void setDuration(Integer Duration) {
        this.Duration = Duration;
    }

    public Date getEndTime() {
        return this.EndTime;
    }

    public void setEndTime(Date EndTime) {
        this.EndTime = EndTime;
    }

    public String getResourceId() {
        return this.ResourceId;
    }

    public void setResourceId(String ResourceId) {
        this.ResourceId = ResourceId;
    }

    public Integer getResourceType() {
        return this.ResourceType;
    }

    public void setResourceType(Integer ResourceType) {
        this.ResourceType = ResourceType;
    }

    public Date getStartTime() {
        return this.StartTime;
    }

    public void setStartTime(Date StartTime) {
        this.StartTime = StartTime;
    }



}
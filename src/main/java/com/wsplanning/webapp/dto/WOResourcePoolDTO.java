package com.wsplanning.webapp.dto;

import org.apache.poi.hpsf.Decimal;

public class WOResourcePoolDTO {
    public Integer RowId;
    public Number Duration;
    public String WorkDay;
    public String DeptId;
    public String ShiftId;

    public Integer getRowId() {
        return this.RowId;
    }

    public void setRowId(Integer RowId) {
        this.RowId = RowId;
    }

    public Number getDuration() {
        return this.Duration;
    }

    public void setDuration(Number Duration) {
        this.Duration = Duration;
    }

    public String getWorkDay() {
        return this.WorkDay;
    }

    public void setWorkDay(String WorkDay) {
        this.WorkDay = WorkDay;
    }

    public String getDeptId() {
        return this.DeptId;
    }

    public void setDeptId(String DeptId) {
        this.DeptId = DeptId;
    }

    public String getShiftId() {
        return this.ShiftId;
    }

    public void setShiftId(String ShiftId) {
        this.ShiftId = ShiftId;
    }
    
}
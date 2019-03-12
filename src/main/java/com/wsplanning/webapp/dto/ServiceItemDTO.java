package com.wsplanning.webapp.dto;

import java.text.SimpleDateFormat;

import org.apache.poi.hpsf.Decimal;

public class ServiceItemDTO {
    
    public Integer RowId;
    public String ItemNo;
    public String SuplNo;
    public String Name;
    public Number Quantity;
    public Number StockQty;
    public Integer ItemType;
    public String StockId;
    public String ModelCode;
    public Integer ChargeCategoryId;
    public String MechanicId;
    public String WorkType;
    public Number UNITPR;
    public Number BUYPR;
    public Integer IGROUPID;
    public String VATCD;
    public String WorkGroupId;
    public Number RecmTime;
    public Number SaleTime;
    public Number FactTime;


    public Integer getRowId() {
        return this.RowId;
    }

    public void setRowId(Integer RowId) {
        this.RowId = RowId;
    }

    public String getItemNo() {
        return this.ItemNo;
    }

    public void setItemNo(String ItemNo) {
        this.ItemNo = ItemNo;
    }

    public String getSuplNo() {
        return this.SuplNo;
    }

    public void setSuplNo(String SuplNo) {
        this.SuplNo = SuplNo;
    }

    public String getName() {
        return this.Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public Number getQuantity() {
        return this.Quantity;
    }

    public void setQuantity(Number Quantity) {
        this.Quantity = Quantity;
    }

    public Number getStockQty() {
        return this.StockQty;
    }

    public void setStockQty(Number StockQty) {
        this.StockQty = StockQty;
    }

    public Integer getItemType() {
        return this.ItemType;
    }

    public void setItemType(Integer ItemType) {
        this.ItemType = ItemType;
    }

    public String getStockId() {
        return this.StockId;
    }

    public void setStockId(String StockId) {
        this.StockId = StockId;
    }

    public String getModelCode() {
        return this.ModelCode;
    }

    public void setModelCode(String ModelCode) {
        this.ModelCode = ModelCode;
    }

    public Integer getChargeCategoryId() {
        return this.ChargeCategoryId;
    }

    public void setChargeCategoryId(Integer ChargeCategoryId) {
        this.ChargeCategoryId = ChargeCategoryId;
    }

    public String getMechanicId() {
        return this.MechanicId;
    }

    public void setMechanicId(String MechanicId) {
        this.MechanicId = MechanicId;
    }

    public String getWorkType() {
        return this.WorkType;
    }

    public void setWorkType(String WorkType) {
        this.WorkType = WorkType;
    }

    public Number getUNITPR() {
        return this.UNITPR;
    }

    public void setUNITPR(Number UNITPR) {
        this.UNITPR = UNITPR;
    }

    public Number getBUYPR() {
        return this.BUYPR;
    }

    public void setBUYPR(Number BUYPR) {
        this.BUYPR = BUYPR;
    }

    public Integer getIGROUPID() {
        return this.IGROUPID;
    }

    public void setIGROUPID(Integer IGROUPID) {
        this.IGROUPID = IGROUPID;
    }

    public String getVATCD() {
        return this.VATCD;
    }

    public void setVATCD(String VATCD) {
        this.VATCD = VATCD;
    }

    public String getWorkGroupId() {
        return this.WorkGroupId;
    }

    public void setWorkGroupId(String WorkGroupId) {
        this.WorkGroupId = WorkGroupId;
    }

    public Number getRecmTime() {
        return this.RecmTime;
    }

    public void setRecmTime(Number RecmTime) {
        this.RecmTime = RecmTime;
    }

    public Number getSaleTime() {
        return this.SaleTime;
    }

    public void setSaleTime(Number SaleTime) {
        this.SaleTime = SaleTime;
    }

    public Number getFactTime() {
        return this.FactTime;
    }

    public void setFactTime(Number FactTime) {
        this.FactTime = FactTime;
    }
  
  
}
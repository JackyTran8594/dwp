package com.wsplanning.webapp.dto;

import java.text.SimpleDateFormat;

import org.apache.poi.hpsf.Decimal;

public class ServiceItemDTO {
    
    private Integer RowId;
    private String ItemNo;
    private String SuplNo;
    private String Name;
    private Decimal Quantity;
    private Decimal StockQty;
    private Integer ItemType;
    private String StockId;
    private String ModelCode;
    private Integer ChargeCategoryId;
    private String MechanicId;
    private String WorkType;
    private Decimal UNITPR;
    private Decimal BUYPR;
    private Integer IGROUPID;
    private String VATCD;
    private String WorkGroupId;
    private Decimal RecmTime;
    private Decimal SaleTime;
    private Decimal FactTime;

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

    public Decimal getQuantity() {
        return this.Quantity;
    }

    public void setQuantity(Decimal Quantity) {
        this.Quantity = Quantity;
    }

    public Decimal getStockQty() {
        return this.StockQty;
    }

    public void setStockQty(Decimal StockQty) {
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

    public Decimal getUNITPR() {
        return this.UNITPR;
    }

    public void setUNITPR(Decimal UNITPR) {
        this.UNITPR = UNITPR;
    }

    public Decimal getBUYPR() {
        return this.BUYPR;
    }

    public void setBUYPR(Decimal BUYPR) {
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

    public Decimal getRecmTime() {
        return this.RecmTime;
    }

    public void setRecmTime(Decimal RecmTime) {
        this.RecmTime = RecmTime;
    }

    public Decimal getSaleTime() {
        return this.SaleTime;
    }

    public void setSaleTime(Decimal SaleTime) {
        this.SaleTime = SaleTime;
    }

    public Decimal getFactTime() {
        return this.FactTime;
    }

    public void setFactTime(Decimal FactTime) {
        this.FactTime = FactTime;
    }
   

  
}
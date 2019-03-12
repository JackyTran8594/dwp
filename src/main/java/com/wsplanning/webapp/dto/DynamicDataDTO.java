package com.wsplanning.webapp.dto;

public class DynamicDataDTO {
    public String Id;
    public String Category;
    public String Label;
    public String DeptId;
    public Boolean Editable;
    public String Value;
    public String DBField;
  

    public String getId() {
        return this.Id;
    }

    public void setId(String Id) {
        this.Id = Id;
    }

    public String getCategory() {
        return this.Category;
    }

    public void setCategory(String Category) {
        this.Category = Category;
    }

    public String getLabel() {
        return this.Label;
    }

    public void setLabel(String Label) {
        this.Label = Label;
    }

    public String getDeptId() {
        return this.DeptId;
    }

    public void setDeptId(String DeptId) {
        this.DeptId = DeptId;
    }

    public Boolean isEditable() {
        return this.Editable;
    }

    public Boolean getEditable() {
        return this.Editable;
    }

    public void setEditable(Boolean Editable) {
        this.Editable = Editable;
    }

    public String getValue() {
        return this.Value;
    }

    public void setValue(String Value) {
        this.Value = Value;
    }

    public String getDBField() {
        return this.DBField;
    }

    public void setDBField(String DBField) {
        this.DBField = DBField;
    }

}
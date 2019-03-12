package com.wsplanning.webapp.dto;

public class WOAttachmentDTO {
    public Integer Field;
    public String FileName;
    public String FileDescription;
    public String AttachType;
    public String AttachTypeDescription;
    public String ImageData;

    public Integer getField() {
        return this.Field;
    }

    public void setField(Integer Field) {
        this.Field = Field;
    }

    public String getFileName() {
        return this.FileName;
    }

    public void setFileName(String FileName) {
        this.FileName = FileName;
    }

    public String getFileDescription() {
        return this.FileDescription;
    }

    public void setFileDescription(String FileDescription) {
        this.FileDescription = FileDescription;
    }

    public String getAttachType() {
        return this.AttachType;
    }

    public void setAttachType(String AttachType) {
        this.AttachType = AttachType;
    }

    public String getAttachTypeDescription() {
        return this.AttachTypeDescription;
    }

    public void setAttachTypeDescription(String AttachTypeDescription) {
        this.AttachTypeDescription = AttachTypeDescription;
    }

    public String getImageData() {
        return this.ImageData;
    }

    public void setImageData(String ImageData) {
        this.ImageData = ImageData;
    }
}
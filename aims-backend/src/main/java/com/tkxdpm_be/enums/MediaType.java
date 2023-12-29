package com.tkxdpm_be.enums;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public enum MediaType {
    BOOK("BOOK"),
    CD("CD"),
    DISK("DISK");

    private final String value;

    MediaType(String value) {
        this.value = value;
    }

    private static Map<String, MediaType> mediaTypeMap;

    public static MediaType getMediaType(String type) {
        if (mediaTypeMap == null) {
            mediaTypeMap = new HashMap<>();
            mediaTypeMap.put("BOOK", MediaType.BOOK);
            mediaTypeMap.put("CD", MediaType.CD);
            mediaTypeMap.put("DISK", MediaType.DISK);
        }
        return mediaTypeMap.get(type);
    }
}

package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tag {

    private String id;
    private String name;
    private String color;

    private String areaId;
    private String areaName;

    private String coordinateSystemId;
    private String coordinateSystemName;

    private Position position;

	private boolean missing = false;
	private boolean inside;
}

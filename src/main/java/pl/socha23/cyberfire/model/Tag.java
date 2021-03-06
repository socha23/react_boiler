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

    public enum State {MISSING, INSIDE, IN_CONTAINER}

    private String id;
    private String name;
    private String color;

    private String areaId;
    private String areaName;

    private String coordinateSystemId;
    private String coordinateSystemName;

    private Position position;
    private Position pinned;

	private State state = State.INSIDE;
}

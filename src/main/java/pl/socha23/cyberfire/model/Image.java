package pl.socha23.cyberfire.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Image {

    private String id;
    private String filename;
    private String format;
    private byte[] thumbnail;
    private byte[] fullSized;

}

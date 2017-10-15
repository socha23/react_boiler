package pl.socha23.cyberfire.services;

import org.apache.commons.imaging.ImageReadException;
import org.apache.commons.imaging.Imaging;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Image;

import javax.imageio.ImageIO;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;

@Component
public class ImageService {

    public Image createImage(String filename, byte[] bytes) {
        return Image.builder()
                .filename(filename)
                .format(determineFormat(bytes))
                .fullSized(normalize(bytes, 1000, 1000))
                .thumbnail(normalize(bytes, 100, 100))
                .build();
    }

    private String determineFormat(byte[] bytes) {
        try {
            return Imaging.getImageInfo(bytes).getFormat().getExtension();
        } catch (IOException | ImageReadException e) {
            throw new RuntimeException(e);
        }
    }

    private byte[] normalize(byte[] bytes, int maxWidth, int maxHeight) {
        try {
            BufferedImage img = ImageIO.read(new ByteArrayInputStream(bytes));
            double scale = Math.min((double)maxWidth / (double)img.getWidth(), (double)maxHeight / (double)img.getHeight());
            BufferedImage after = new BufferedImage((int)(scale * img.getWidth()),(int)(scale * img.getHeight()), img.getType());
            AffineTransformOp transform = new AffineTransformOp(AffineTransform.getScaleInstance(scale, scale), AffineTransformOp.TYPE_BILINEAR);
            transform.filter(img, after);
            ByteArrayOutputStream baos = new org.apache.commons.io.output.ByteArrayOutputStream();
            ImageIO.write(after, determineFormat(bytes), baos);
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

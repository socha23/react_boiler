package pl.socha23.cyberfire.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.NearbyDevice;

import java.util.List;
import java.util.stream.Collectors;

@Profile("prod")
@Component
public class InodeLocatorUpdater {

    @Value("${inode.locatorId:1039673}")
    private String locatorId = "1039673";

    private InodeClient inodeClient;
    private ILocatorsService locatorsService;
    private TagsService tagsService;

    public InodeLocatorUpdater(InodeClient inodeClient, ILocatorsService locatorsService, TagsService tagsService) {
        this.inodeClient = inodeClient;
        this.locatorsService = locatorsService;
        this.tagsService = tagsService;
    }

    @Scheduled(fixedRate = 1000)
	public void updateLocator() {
        List<NearbyDevice> devices = inodeClient
                .getDevicesSeen()
                .filter(d -> tagsService.findTagById(d.getId()) != null)
                .collect(Collectors.toList());
        locatorsService
                .findById(locatorId)
                .ifPresent(loc -> {
                    loc.setNearbyDevices(devices);
                    locatorsService.updateOrCreate(loc);
        });

    }
}

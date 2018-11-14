package pl.socha23.cyberfire.services;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pl.socha23.cyberfire.model.Locator;

import java.util.Collection;
import java.util.Optional;

@Component
public class TrackimoLocatorUpdater {

	private TrackimoLocatorProvider trackimoLocatorProvider;
	private ILocatorsService locatorsService;

    public TrackimoLocatorUpdater(TrackimoLocatorProvider trackimoLocatorProvider, ILocatorsService locatorsService) {
        this.trackimoLocatorProvider = trackimoLocatorProvider;
        this.locatorsService = locatorsService;
    }

    @Scheduled(fixedRate = 1000)
	public void updateLocators() {
        Collection<TrackimoLocatorProvider.TrackimoLocator> locators = trackimoLocatorProvider.listLocators();
        for (TrackimoLocatorProvider.TrackimoLocator locator : locators) {
            if (locator.getName().startsWith("_")) {
                removeLocator(locator);
            } else {
                updateLocator(locator);
            }
        }
    }

    private void updateLocator(TrackimoLocatorProvider.TrackimoLocator trackimo) {
        Optional<Locator> searchResult = locatorsService.findById(trackimo.getId());
        if (searchResult.isPresent()) {
            // update
            Locator loc = searchResult.get();
            loc.setName(loc.getName());
            locatorsService.updateOrCreate(loc);
            locatorsService.updateLocation(loc.getId(), trackimo.getLocation());
        } else {
            // create
            Locator loc = Locator.builder()
                    .id(trackimo.getId())
                    .name(trackimo.getName())
                    .type(Locator.Type.CONTAINER)
                    .location(trackimo.getLocation())
                    .build();
            locatorsService.updateOrCreate(loc);
        }

    }

    private void removeLocator(TrackimoLocatorProvider.TrackimoLocator trackimo) {
        locatorsService.deleteById(trackimo.getId());
    }

}

package pl.socha23.cyberfire.services

import pl.socha23.cyberfire.model.Locator
import pl.socha23.cyberfire.model.MapCoords
import spock.lang.Specification

class LocatorsServiceSpec extends Specification {

    LocatorsService service

    Locator LOCATOR_A = Locator.builder()
            .id("loc_a")
            .name("Locator a")
            .type(Locator.Type.CONTAINER)
            .location(MapCoords.of(52, 21))
            .build()

    def setup() {
        service = new LocatorsService(new MemLocatorDatasource())
    }

    private Locator locatorById(String id) {
        service.getAllLocators().find {it.id == id}
    }

    def "locators are saved"() {
        given:
        service.updateOrCreate(LOCATOR_A)

        expect:
         locatorById(LOCATOR_A.id) != null

    }

    def "change map coords without changing anything else"() {
        given:
        service.updateOrCreate(LOCATOR_A)

        when:
        Optional<Locator> result = service.updateLocation(LOCATOR_A.id, MapCoords.of(20, 30))

        then:
        result.isPresent()
        result.get().location.longitude == 20
        result.get().location.latitude == 30
        locatorById(LOCATOR_A.id).location.longitude == 20
        locatorById(LOCATOR_A.id).location.latitude == 30


    }

    def "change map coords for nonexistant is noop"() {
        expect:
        !service.updateLocation("no such", MapCoords.of(20, 30)).isPresent()
    }

}

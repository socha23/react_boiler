package pl.socha23.cyberfire.services

import pl.socha23.cyberfire.model.Locator
import spock.lang.Specification

class LocatorsServiceSpec extends Specification {

    LocatorsService service

    Locator LOCATOR_A = Locator.builder()
            .id("loc_a")
            .name("Locator a")
            .type(Locator.Type.CONTAINER)
            .latitude(52)
            .longitude(21)
            .build()

    def setup() {
        service = new LocatorsService(new MemLocatorDatasource())
    }

    def "locators are saved"() {
        given:
        service.updateOrCreate(LOCATOR_A)

        expect:
        service.getAllLocators().find {it.id == LOCATOR_A.id} != null

    }

}

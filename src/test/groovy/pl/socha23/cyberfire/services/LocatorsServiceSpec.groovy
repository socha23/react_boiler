package pl.socha23.cyberfire.services

import pl.socha23.cyberfire.model.Locator
import pl.socha23.cyberfire.model.MapCoords
import spock.lang.Specification
import spock.lang.Unroll

class LocatorsServiceSpec extends Specification {

    LocatorsService service

    Locator.LocatorBuilder LOCATOR_A_BUILDER = Locator.builder()
                .id("loc_a")
                .name("Locator a")
                .type(Locator.Type.CONTAINER)
                .location(MapCoords.of(0, 0))

    Locator LOCATOR_A = LOCATOR_A_BUILDER.build()

    def setup() {
        service = new LocatorsService(new MemLocatorDatasource())
        service.setSnapToPin(10)
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

    @Unroll
    def "update location to #target when pin=#pin and snap=#snap results in #result"() {
        given:
        LOCATOR_A.pinned = (pin != null ? MapCoords.of(pin, pin) : null)
        service.updateOrCreate(LOCATOR_A)
        service.setSnapToPin(snap)

        when:
        service.updateLocation(LOCATOR_A.id, MapCoords.of(target, target))

        then:
        locatorById(LOCATOR_A.id).location == MapCoords.of(result, result)

        where:
        target | pin  | snap | result
        0.01   | null |  10  | 0.01
        1      | null |  10  | 1
        0.01   | 0    |  10  | 0
        5      | 0    |  10  | 5
    }

    @Unroll
    def "updateButCopyPin locator to #target when pin=#pin and snap=#snap results in #result"() {
        given:
        LOCATOR_A.pinned = (pin != null ? MapCoords.of(pin, pin) : null)
        service.updateOrCreate(LOCATOR_A)
        service.setSnapToPin(snap)

        when:
        Locator updated = LOCATOR_A_BUILDER.build()
        updated.location = MapCoords.of(target, target)
        service.updateButCopyPinFromPrevious(updated)

        then:
        locatorById(LOCATOR_A.id).location == MapCoords.of(result, result)

        where:
        target | pin  | snap | result
        0.01   | null |  10  | 0.01
        1      | null |  10  | 1
        0.01   | 0    |  10  | 0
        5      | 0    |  10  | 5
    }


    def "haversine distance"() {
        expect:
        double dist = MapCoords.of(0, 0).distanceTo(MapCoords.of(180, 0))
        19500 < dist && dist < 20500
    }

}

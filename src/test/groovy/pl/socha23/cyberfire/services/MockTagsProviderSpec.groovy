package pl.socha23.cyberfire.services

import pl.socha23.cyberfire.model.Tag
import pl.socha23.cyberfire.repositories.ArtifactRepository
import pl.socha23.cyberfire.repositories.FireteamRepository
import spock.lang.Specification

class MockTagsProviderSpec extends Specification {

    MockTagsProvider service;

    def setup() {
        service = new MockTagsProvider(
                missingTagsService: new MissingTagsService(
                        Mock(ArtifactRepository),
                        Mock(FireteamRepository)
                )
        )
    }

    def "update of nonexisting tag adds it to returned tags"() {
        given:
        service.updateOrCreate(Tag.builder()
                .id("non_existing")
                .areaId("aId")
                .build()
        );

        expect:
        service.allTags.find {it.id == "non_existing"} != null
        service.allTags.find {it.id == "non_existing"}.areaId == "aId"
    }

    def "update changes existing tag"() {
        given:
        service.updateOrCreate(Tag.builder()
                .id("a")
                .areaId("A")
                .build()
        );
        service.updateOrCreate(Tag.builder()
                .id("b")
                .areaId("B")
                .build()
        );

        when:
        service.updateOrCreate(Tag.builder()
                .id("a")
                .areaId("A_changed")
                .build()
        );

        then:
        service.allTags.size() == 2
        service.allTags.find {it.id == "a"}.areaId == "A_changed"
    }

}

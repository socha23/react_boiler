package pl.socha23.cyberfire.services

import pl.socha23.cyberfire.model.Artifact
import pl.socha23.cyberfire.model.Fireteam
import pl.socha23.cyberfire.model.Tag
import pl.socha23.cyberfire.repositories.ArtifactRepository
import pl.socha23.cyberfire.repositories.FireteamRepository
import spock.lang.Specification

class MissingTagsServiceSpec extends Specification {

    List<Artifact> artifacts
    List<Fireteam> fireteams
    List<Tag> tags

    def "no virtual tags when no artifacts or fireteams"() {
        given:
        artifacts = []
        fireteams = []
        tags = []

        expect:
        virtualTags.empty
    }

    def "no virtual tags when right artifact tag exists"() {
        given:
        artifacts << new Artifact(tagId: "t1")
        tags << new Tag(id: "t1")

        expect:
        virtualTags.empty
    }

    def "virtual tag created for artifact"() {
        given:
        artifacts << new Artifact(tagId: "tx")

        expect:
        virtualTags.size() == 1
        virtualTags[0].id == "tx"
    }

    def "no virtual tags when right fireteam tag exists"() {
        given:
        fireteams << new Fireteam(tagId: "t1")
        tags << new Tag(id: "t1")

        expect:
        virtualTags.empty
    }

    def "virtual tag created for fireteam"() {
        given:
        fireteams << new Fireteam(tagId: "tx")

        expect:
        virtualTags.size() == 1
        virtualTags[0].id == "tx"
    }

    def "no virtual tags when right fireteam target tag exists"() {
        given:
        fireteams << new Fireteam(targetTagId: "t1")
        tags << new Tag(id: "t1")

        expect:
        virtualTags.empty
    }

    def "virtual tag created for fireteam target"() {
        given:
        fireteams << new Fireteam(targetTagId: "tx")

        expect:
        virtualTags.size() == 1
        virtualTags[0].id == "tx"
    }

    def "virtual tag has a name"() {
        expect:
        sampleVirtualTag.name != null
        sampleVirtualTag.name != ""
    }

    def "virtual tag has a position"() {
        expect:
        sampleVirtualTag.position != null
        sampleVirtualTag.position.x != null
        sampleVirtualTag.position.y != null
    }


    def "virtual tag is virtual and not inside"() {
        expect:
        sampleVirtualTag.state == Tag.State.MISSING
    }

    //////////////////////////////////////////////////////////////////////////

    def setup() {
        artifacts = []
        fireteams = []
        tags = []
    }

    private def getVirtualTags() {
        ArtifactRepository artRepo = Mock(ArtifactRepository)
        artRepo.findAll() >> artifacts

        FireteamRepository ftRepo = Mock(FireteamRepository)
        ftRepo.findAll() >> fireteams

        MissingTagsService vts = new MissingTagsService(artRepo, ftRepo)
        return vts.createVirtualTags(tags)
    }

    private def getSampleVirtualTag() {
        artifacts << new Artifact(tagId: "tx")
        return virtualTags[0]
    }

}

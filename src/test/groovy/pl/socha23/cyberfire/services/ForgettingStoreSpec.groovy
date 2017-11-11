package pl.socha23.cyberfire.services

import spock.lang.Specification

import java.time.Instant
import java.time.temporal.ChronoUnit

class ForgettingStoreSpec extends Specification {

    ForgettingStore<String> store

    def setup() {
        store = new ForgettingStore<>(1000)
    }

    def "store remembers"() {
        when:
        store.put("A", "a")

        then:
        store.list() == ["a"]
    }

    def "store forgets"() {
        when:
        store.put("A", "a", twoSecondsAgo())

        then:
        store.list().empty
    }

    def "store forgets only those put long ago"() {
        when:
        store.put("A", "a")
        store.put("B", "b", twoSecondsAgo())
        store.put("C", "c")

        then:
        store.list() == ["a", "c"]
    }

    def "store returns values by sorted id"() {
        when:
        store.put("B", "b")
        store.put("C", "c")
        store.put("A", "a")

        then:
        store.list() == ["a", "b", "c"]
    }


    private static Instant twoSecondsAgo() {
        Instant.now().minus(2, ChronoUnit.SECONDS)
    }

}

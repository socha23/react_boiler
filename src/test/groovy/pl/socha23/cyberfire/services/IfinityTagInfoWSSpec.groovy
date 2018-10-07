package pl.socha23.cyberfire.services

import spock.lang.Specification
import spock.lang.Unroll

class IfinityTagInfoWSSpec extends Specification {

    @Unroll
    def "acceleration in value '#accel' bigger than treshold 5 == #result"(String accel, boolean  result) {
        expect:
        IfinityTagInfoWS.accelerationBiggerThanTreshold(accel, 5) == result

        where:
        accel        | result
        null         | true
        ""           | true
        "1,1,zz"     | true
        "zzzz"       | true
        "3"          | false
        "1,2,3"      | false
        "5,5,5.1"    | true
        "5,5,5"      | false
        "1,2"        | false
        "5,6"        | true

    }


}

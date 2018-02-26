import React from 'react'
import {expectElemWithProvider} from '../testUtils'

import {FireteamChooserComponent} from 'rescue/FireteamChooser'
import FireteamChooser from "../../../main/js/rescue/FireteamChooser";

const FT_1 = {
    id: "FT_1",
    name: "fireteam 1"
};

const FT_2 = {
    id: "FT_2",
    name: "fireteam 2"
};

const FT_3 = {
    id: "FT_3",
    name: "fireteam 3"
};


function stateWithFireteams(fireteams) {
    return {
        fireteams: {
            items: fireteams
        },
        tags: {
            items: []
        }
    }
}


it('renders correctly', () => {
    expectElemWithProvider(
        <FireteamChooser fireteams={[FT_1, FT_2]}/>, stateWithFireteams([FT_1, FT_2])
    ).toMatchSnapshot()
});

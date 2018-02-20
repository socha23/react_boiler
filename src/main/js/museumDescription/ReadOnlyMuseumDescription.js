import React from 'react'
import {PropTypes} from 'prop-types'

const ReadOnlyDescriptionField = ({title, value}) => <div style={{marginBottom: 30}}>
    <h4>{title}</h4>
    <pre style={{
        border: 0,
        backgroundColor: "transparent",
        fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: 14,
        padding: 0
    }}>
        {value == "" ? <span>Nie uzupełniono</span> : value}
    </pre>
</div>;

const ReadOnlyMuseumDescription = ({value}) => <div>
    <ReadOnlyDescriptionField
        title="Potencjalne zagrożenia pożarowe"
        value={value.dangers}
    />
    <ReadOnlyDescriptionField
        title="Drogi i kierunki ewakuacji zbiorów"
        value={value.evacuationRoutes}
    />
    < ReadOnlyDescriptionField
        title="Sposób sprawdzania organizacji i warunków ewakuacji zbiorów"
        value={value.drillProcedure}
    />
    <ReadOnlyDescriptionField
        title="Techniczne środki umożliwiające ewakuację zbiorów"
        value={value.technicalMeans}
    />
    <ReadOnlyDescriptionField
        title="Miejsca przechowywania i eksponowania najcenniejszych zbiorów"
        value={value.preciousArtifactsLocation}
    />
    < ReadOnlyDescriptionField
        title="Postępowanie przy zabezpieczaniu najcenniejszych zbiorów"
        value={value.preciousArtifactsProcedure}
    />
    <ReadOnlyDescriptionField
        title="Procedury powiadamiania dyrektora i pracowników muzeum"
        value={value.communicationProcedure}
    />
    <ReadOnlyDescriptionField
        title="Osoby mające brać udział w ewakuacji zbiorów"
        value={value.evacuationTeam}
    />

</div>;


export default ReadOnlyMuseumDescription;
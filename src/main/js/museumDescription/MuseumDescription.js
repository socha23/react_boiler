import React from 'react'
import {PropTypes} from 'prop-types'
import DescriptionField from './DescriptionField'

class MuseumDescription extends React.Component {

    static propTypes = {
        value: PropTypes.object.isRequired,
        onChange: PropTypes.func
    };

    static defaultProps = {
        onChange: () => {}
    };
    
    onFieldChange = (field) => {
        return (newValue) => {
            const newObject = {...this.props.value, [field]: newValue};
            console.log("CHANGING", newValue, newObject);
            this.props.onChange(newObject);
        }
    };

    render = () => <div>
        <DescriptionField
            title={"Potencjalne zagrożenia pożarowe"}
            value={this.props.value.dangers}
            onChange={this.onFieldChange("dangers")}
        />
        <DescriptionField
            title={"Drogi i kierunki ewakuacji zbiorów"}
            value={this.props.value.evacuationRoutes}
            onChange={this.onFieldChange("evacuationRoutes")}
        />
        <DescriptionField
            title={"Sposób sprawdzania organizacji i warunków ewakuacji zbiorów"}
            value={this.props.value.drillProcedure}
            onChange={this.onFieldChange("drillProcedure")}
        />
        <DescriptionField
            title={"Techniczne środki umożliwiające ewakuację zbiorów"}
            value={this.props.value.technicalMeans}
            onChange={this.onFieldChange("technicalMeans")}
        />
        <DescriptionField
            title={"Miejsca przechowywania i eksponowania najcenniejszych zbiorów"}
            value={this.props.value.preciousArtifactsLocation}
            onChange={this.onFieldChange("preciousArtifactsLocation")}
        />
        <DescriptionField
            title={"Postępowanie przy zabezpieczaniu najcenniejszych zbiorów"}
            value={this.props.value.preciousArtifactsProcedure}
            onChange={this.onFieldChange("preciousArtifactsProcedure")}
        />
        <DescriptionField
            title={"Procedury powiadamiania dyrektora i pracowników muzeum"}
            value={this.props.value.communicationProcedure}
            onChange={this.onFieldChange("communicationProcedure")}
        />
        <DescriptionField
            title={"Osoby mające brać udział w ewakuacji zbiorów"}
            value={this.props.value.evacuationTeam}
            onChange={this.onFieldChange("evacuationTeam")}
        />

    </div>


}

export default MuseumDescription;
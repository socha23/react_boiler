import React from 'react'
import {PropTypes} from 'prop-types'
import DescriptionField from './DescriptionField'

class MuseumDescription extends React.Component {

    static propTypes = {
        value: PropTypes.object.isRequired,
        onChange: PropTypes.func,
        readOnly: PropTypes.bool
    };

    static defaultProps = {
        onChange: () => {
        },
        readOnly: false
    };

    onFieldChange = (field) => {
        return (newValue) => {
            const newObject = {...this.props.value, [field]: newValue};
            this.props.onChange(newObject);
        }
    };

    render = () => <div>
        <div className="row">
            <DescriptionField
                className="col-sm-6 colWithSmallerGutter"
                title={"Potencjalne zagrożenia pożarowe"}
                value={this.props.value.dangers}
                onChange={this.onFieldChange("dangers")}
                readOnly={this.props.readOnly}
            />
            <DescriptionField
                className="col-sm-6 colWithSmallerGutter"
                title={"Drogi i kierunki ewakuacji zbiorów"}
                value={this.props.value.evacuationRoutes}
                onChange={this.onFieldChange("evacuationRoutes")}
                readOnly={this.props.readOnly}
            />
        </div>
        <div
            className="row">
            < DescriptionField
                className="col-sm-6 colWithSmallerGutter"
                title={"Sposób sprawdzania organizacji i warunków ewakuacji zbiorów"}
                value={this.props.value.drillProcedure}
                onChange={this.onFieldChange("drillProcedure")}
                readOnly={this.props.readOnly}
            />
            <DescriptionField
                className="col-sm-6 colWithSmallerGutter"
                title={"Techniczne środki umożliwiające ewakuację zbiorów"}
                value={this.props.value.technicalMeans}
                onChange={this.onFieldChange("technicalMeans")}
                readOnly={this.props.readOnly}
            />
        </div>
        <div className="row">
            <DescriptionField
                className="col-sm-6 colWithSmallerGutter"
                title={"Miejsca przechowywania i eksponowania najcenniejszych zbiorów"}
                value={this.props.value.preciousArtifactsLocation}
                onChange={this.onFieldChange("preciousArtifactsLocation")}
                readOnly={this.props.readOnly}
            />
            < DescriptionField
                className="col-sm-6 colWithSmallerGutter"
                title={"Postępowanie przy zabezpieczaniu najcenniejszych zbiorów"}
                value={this.props.value.preciousArtifactsProcedure}
                onChange={this.onFieldChange("preciousArtifactsProcedure")}
                readOnly={this.props.readOnly}
            />
        </div>
        <div className="row">
            <DescriptionField
                className="col-sm-6 colWithSmallerGutter"
                title={"Procedury powiadamiania dyrektora i pracowników muzeum"}
                value={this.props.value.communicationProcedure}
                onChange={this.onFieldChange("communicationProcedure")}
                readOnly={this.props.readOnly}
            />
            <DescriptionField
                className="col-sm-6 colWithSmallerGutter"
                title={"Osoby mające brać udział w ewakuacji zbiorów"}
                value={this.props.value.evacuationTeam}
                onChange={this.onFieldChange("evacuationTeam")}
                readOnly={this.props.readOnly}
            />

        </div>
    </div>


}

export default MuseumDescription;
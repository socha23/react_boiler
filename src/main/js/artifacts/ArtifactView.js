import React from 'react'
import PropTypes from 'prop-types'
import ConfirmableLink from '../common/components/ConfirmableLink'
import VocIcon from '../common/components/VocIcon'
import {priorityName, priority, Type, Priority} from './ArtifactVocs'
import * as vocFunctions from '../common/vocFunctions'
import {ImageListWithView} from './ArtifactImageList'
import TagValue from '../tags/TagValue'
import LocatorValue from '../tags/LocatorValue'

const ValueOrQuestion = ({value}) => {
    if (value) {
        return <span>{value}</span>
    } else {
        return <span>?</span>
    }
};

const Times = () => <span style={{paddingLeft: 5, paddingRight: 5}}>x</span>;

const Dimensions = ({value = {}}) => <span>
    <ValueOrQuestion value={value.width}/>
    <Times/>
    <ValueOrQuestion value={value.height}/>
    <Times/>
    <ValueOrQuestion value={value.depth}/>
</span>;

const WhenNonEmpty = ({value, children}) => value ? <div>{children}</div> : <div></div>

const ArtifactDetails = ({item}) => <div>
        <div className="row">
            <div className="col-sm-6 form-group">
                <label>
                    Priorytet:
                </label>
                <p className="form-control-static">
                    <VocIcon value={priority(item.priority)} className="iconWithName"/>
                    {priorityName(item.priority)}
                </p>

            </div>
            <div className="col-sm-6 form-group">
                <label>
                    Waga:
                </label>
                <p className="form-control-static">
                    <ValueOrQuestion value={item.weight}/> kg
                </p>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-6 form-group">
                <label>
                    Znacznik:
                </label>
                <p className="form-control-static">
                    <TagValue tagId={item.tagId} link={true}/>
                </p>
            </div>
            <div className="col-sm-6 form-group">
                <label>
                    Wymiary:
                </label>
                <p className="form-control-static">
                    <Dimensions value={item.dimensions}/>
                </p>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-12 form-group">
                <label>
                    Skrzynia:
                </label>
                <p className="form-control-static">
                    <LocatorValue locatorId={item.crateId} link={true}/>
                </p>
            </div>
        </div>

        <WhenNonEmpty value={item.identificationNotes}>
            <hr/>
            <div className="row">
                <div className="col-sm-12 form-group">
                    <label>
                        Identyfikacja:
                    </label>
                    <p className="form-control-static">
                        {item.identificationNotes}
                    </p>
                </div>
            </div>
        </WhenNonEmpty>

        <WhenNonEmpty value={item.evacuationNotes}>
            <hr/>
            <div className="row">
                <div className="col-sm-12 form-group">
                    <label>
                        Ewakuacja:
                    </label>
                    <p className="form-control-static">
                        {item.evacuationNotes}
                    </p>
                </div>
            </div>
        </WhenNonEmpty>

    </div>
    ;


const ArtifactView = ({item, onEdit, onDelete}) =>
        <div>
            <h2>
                <VocIcon value={vocFunctions.find(Type, item.type)} className="iconWithName"/>

                {item.name}
                <div className="pull-right buttonRow">
                    <a className="btn btn-primary" onClick={onEdit}
                       title="Zmień">
                        <i className="glyphicon glyphicon-edit"/>
                    </a>
                    <ConfirmableLink className="btn btn-danger" onClick={onDelete}
                                     title="Usuń"
                                     message={"Czy na pewno usunąć " + item.name + "?"}>
                        <i className="glyphicon glyphicon-remove"/>
                    </ConfirmableLink>
                </div>
            </h2>
            <hr/>
            <div className="row">
                <div className="col-sm-6">
                    <ArtifactDetails item={item}/>
                </div>
                <div className="col-sm-6">
                    <ImageListWithView items={item.images}/>
                </div>
            </div>


        </div>
    ;

export default ArtifactView;

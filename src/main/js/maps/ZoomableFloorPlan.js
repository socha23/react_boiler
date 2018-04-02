import React from 'react'
import {PropTypes} from 'prop-types'
import HeightExpander from '../common/components/HeightExpander'
import ToggleButtons from '../common/components/ToggleButtons'

import {DotMarker, LabelMarker} from './Marker'
import Line from './Line'
import {TagTypes} from "../tags/TagType";

// panzoom nie jest wczytywany jako moduł npm i wymaga nie-npmowego jquery
//import $ from 'jquery'

const Tag = ({tag, decoration, pxPosition, selected, onClick, dot}) => {
    if (!pxPosition) {
        return <span/>;
    }

    if (dot) {
        return <DotMarker
            id={tag.id}
            color={tag.color}
            name={tag.label}
            tag={tag}
            decoration={decoration}
            x={pxPosition.x}
            y={pxPosition.y}
            selected={selected}
            onClick={onClick}
            dotSize={15}
        />
    } else {
        return <LabelMarker
            id={tag.id}
            color={tag.color}
            name={tag.label}
            tag={tag}
            arrowDirection={tag.type == "fireteam" ? "down" : "up"}
            decoration={decoration}
            x={pxPosition.x}
            y={pxPosition.y}
            selected={selected}
            onClick={onClick}
        />
    }
};

class ZoomableFloorPlan extends React.Component {

    static propTypes = {
        map: PropTypes.object.isRequired,
        tags: PropTypes.array,
        selectedTag: PropTypes.object,
        onClickTag: PropTypes.func,
        additionalMargin: PropTypes.number,
        lines: PropTypes.array,
        filterButtons: PropTypes.bool,
        tagDecorations: PropTypes.object
    };

    static defaultProps = {
        onClickTag: () => {
        },
        tags: [],
        lines: [],
        additionalMargin: 0,
        filterButtons: true,
        tagDecorations: {}
    };

    state = {
        matrix: [1, 0, 0, 1, 0, 0],
        typeFilter: {}
    };

    componentDidMount = () => {
        this.elem.panzoom({
            contain: 'socha',
            animate: 'skip',
            onChange: this.panZoomChanged
        });
        this.panzoom = this.elem.data("__pz__");

        this.panZoomChanged();

        this.elem.parent().on('wheel', e => {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            this.elem.panzoom('zoom', zoomOut, {
                increment: 0.1,
                animate: false,
                focal: e
            });
        });

        // w timeoucie bo czasem obliczenia width() / height() zawodziły bez niego
        setTimeout(() => {
            this.panzoom.option({
                minScale: Math.max(
                    this.elem.parent().width() / this.elem.width(),
                    this.elem.parent().height() / this.elem.height()) / 5
            });

            // wymuszenie rerendera, żeby znów odpowiednio poumieszczał tagi
            this.setState({pleaseRerenderMe: true});

            if (this.props.selectedTag) {
                this.panTo(this.props.selectedTag.position);
            }


        });
    };

    onZoom = (zoomOut) => {
        let parent = this.elem.parent();
        this.elem.panzoom('zoom', zoomOut, {
            increment: 0.1,
            animate: false,
            focal: {
                clientX: parent.offset().left + parent.width() / 2,
                clientY: parent.offset().top + parent.height() / 2
            }
        });
    };
    
    panZoomChanged = () => {
        this.setState({matrix: this.panzoom.getMatrix().map(i => parseFloat(i))});
    };

    posToImagePx = (pos) => {
        const map = this.props.map;
        // left top to (0, 0)
        pos = {
            x: pos.x - map.topLeft.x,
            y: pos.y - map.topLeft.y
        };
        // scale to image natural size
        pos = {
            x: pos.x / (map.bottomRight.x - map.topLeft.x) * this.elem.find("img")[0].naturalWidth,
            y: pos.y / (map.bottomRight.y - map.topLeft.y) * this.elem.find("img")[0].naturalHeight
        };
        return pos;
    };

    posToContainerPx = (pos) => {
        if (!this.elem) {
            return pos;
        }
        pos = this.posToImagePx(pos);
        // image px to screen px (pan and zoom)
        const zoom = this.state.matrix[0];
        const innerRecPx = this.elem[0].getBoundingClientRect();
        const outerRecPx = this.elem.parent()[0].getBoundingClientRect();
        return {
            x: pos.x * zoom + innerRecPx.x - outerRecPx.x,
            y: pos.y * zoom + innerRecPx.y - outerRecPx.y
        };

    };

    fitsInViewport = (pos) => {
        if (!this.elem) {
            return false;
        }
        const outerRecPx = this.elem.parent()[0].getBoundingClientRect();
        return 0 <= pos.x && pos.x <= outerRecPx.width
            && 0 <= pos.y && pos.y <= outerRecPx.height;

    };

    panTo = (pos) => {
        const outerRecPx = this.elem.parent()[0].getBoundingClientRect();
        const imgWidth = this.elem.find("img")[0].naturalWidth;
        const imgHeight = this.elem.find("img")[0].naturalHeight;
        const zoom = this.state.matrix[0];

        let rebasedPos = this.posToImagePx(pos);
        let dx = rebasedPos.x - imgWidth / 2;
        let dy = rebasedPos.y - imgHeight / 2;

        let x = -(imgWidth / 2 + dx * zoom) + outerRecPx.width / 2;
        let y = -(imgHeight / 2 + dy * zoom) + outerRecPx.height / 2;

        this.panzoom.pan(x, y);
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.selectedTag && this.props.selectedTag != nextProps.selectedTag) {
            let newPos = nextProps.selectedTag.position;
            if (!this.fitsInViewport(this.posToContainerPx(newPos))) {
                this.panTo(newPos);
            }
        }
    };

    onTypeFilterChanged = (typeFilter) => {
        this.setState({typeFilter: typeFilter})
    };


    render() {
        return <div style={{position: "relative", overflow: "hidden"}}>
            <HeightExpander additionalMargin={this.props.additionalMargin}>
                <div style={{position: "absolute", zIndex: 0}} ref={elem => this.elem = $(elem)}>
                    <img src={this.props.map.base64content}/>
                </div>
                <div style={{position: "absolute", zIndex: 2, right: 15, bottom: 15}}>
                    {
                        this.props.filterButtons ?
                            <div style={{marginBottom: 10}}>
                                <ToggleButtons items={TagTypes} type="mapButton" selected={this.state.typeFilter} onSelectionChange={this.onTypeFilterChanged}/>
                            </div>
                            : <div/>
                    }

                    <div className="btn-group-vertical">
                        <a className="vocIcon btn btn-default btn-lg" onClick={e => this.onZoom(false)}>
                            <i className="glyphicon glyphicon-plus"/>
                        </a>
                        <a className="vocIcon btn btn-default btn-lg" onClick={e => this.onZoom(true)}>
                            <i className="glyphicon glyphicon-minus"/>
                        </a>
                    </div>
                </div>
            </HeightExpander>
            {this.props.tags
                .map(t => ({...t, pxPosition: this.posToContainerPx(t.position)}))
                .map(t => <Tag {...t}
                    dot={this.state.typeFilter[t.type]}
                    tag={t}
                    key={t.id}
                    selected={this.props.selectedTag && t.id == this.props.selectedTag.id}
                    onClick={() => this.props.onClickTag(t)}
                    decoration={this.props.tagDecorations[t.id]}
                />)
            }
            {this.props.lines
                .map(line => {
                        let from = this.posToContainerPx({x: line.fromX, y: line.fromY});
                        let to = this.posToContainerPx({x: line.toX, y: line.toY});
                        return {
                            ...line,
                            fromX: from.x,
                            fromY: from.y,
                            toX: to.x,
                            toY: to.y
                        };
                    })
                .map((t, idx) => <Line key={idx} {...t}/>)
            }


        </div>
    }
}

export default ZoomableFloorPlan

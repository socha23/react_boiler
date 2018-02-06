import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'

// panzoom nie jest wczytywany jako moduł npm i wymaga nie-npmowego jquery
//import $ from 'jquery'

import HeightExpander from '../common/components/HeightExpander'

import {LabelMarker, DotMarker, Marker, TagMapIconMarker} from './Marker'
import Line from './Line'

const Tag = ({tag, decoration, pxPosition, selected, onClick}) =>
pxPosition ?
    <LabelMarker
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
    /> : <span/>;

class ZoomableFloorPlan extends React.Component {

    static propTypes = {
        map: PropTypes.object.isRequired,
        tags: PropTypes.array,
        selectedTag: PropTypes.object,
        onClickTag: PropTypes.func,
        additionalMargin: PropTypes.number,
        lines: PropTypes.array,
        tagDecorations: PropTypes.object
    };

    static defaultProps = {
        onClickTag: () => {
        },
        tags: [],
        lines: [],
        additionalMargin: 0,
        tagDecorations: {}
    };

    state = {
        matrix: [1, 0, 0, 1, 0, 0]
    };

    componentDidMount = () => {
        this.elem.panzoom({
            contain: 'socha',
            animate: 'skip',
            $zoomIn: $(this.zoomIn),
            $zoomOut: $(this.zoomOut),
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


    render() {
        return <div style={{position: "relative", overflow: "hidden"}}>
            <HeightExpander additionalMargin={this.props.additionalMargin}>
                <div style={{position: "absolute"}} ref={elem => this.elem = $(elem)}>
                    <img src={this.props.map.base64content}/>
                </div>
                <div style={{position: "absolute", right: 15, bottom: 15}}>
                    <a className="mapZoomButton" ref={zoomIn => this.zoomIn = zoomIn}>
                        <i className="glyphicon glyphicon-plus"/>
                    </a>
                    <a className="mapZoomButton" ref={zoomOut => this.zoomOut = zoomOut}>
                        <i className="glyphicon glyphicon-minus"/>
                    </a>
                </div>
            </HeightExpander>
            {this.props.tags
                .map(t => ({...t, pxPosition: this.posToContainerPx(t.position)}))
                .map(t => <Tag {...t}
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

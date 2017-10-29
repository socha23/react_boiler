import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {artifactsByTagId} from '../tags/tagHelpers'
import {Marker, DOT_SIZE} from './Marker'
import HeightExpander from '../common/components/HeightExpander'


let Tag = ({id, color, pxPosition, name, selected, onClick, artifactsByTagId}) =>
    <Marker
        id={id}
        color={color}
        name={artifactsByTagId[id] ? artifactsByTagId[id].name + " (" + name + ")" : name}
        style={{
            position: "absolute",
            left: pxPosition.x + DOT_SIZE / 2,
            top: pxPosition.y + DOT_SIZE / 2
        }}
        selected={selected}
        onClick={onClick}
        />;

const mapStateToProps = (state, ownProps) => ({
    artifactsByTagId: artifactsByTagId(state.artifacts.items)
});

Tag = connect(mapStateToProps)(Tag);




class ZoomableFloorPlan extends React.Component {

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

        this.elem.parent().on('mousewheel.focal', e => {
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
                    this.elem.parent().height() / this.elem.height())

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

        let x = - (imgWidth / 2 + dx * zoom) + outerRecPx.width / 2;
        let y = - (imgHeight / 2 + dy * zoom) + outerRecPx.height / 2;

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
        return <div>
            <HeightExpander style={{border: "1px solid #BBB"}}>
                <div style={{position: "absolute"}} ref={elem => this.elem = $(elem)}>
                    <img src={this.props.map.base64content}/>
                </div>
            </HeightExpander>
            {this.props.tags
                .map(t => ({...t, pxPosition: this.posToContainerPx(t.position)}))
                .filter(t => this.fitsInViewport(t.pxPosition))
                .map(t => <Tag {...t}
                    key={t.id}
                    selected={this.props.selectedTag && t.id == this.props.selectedTag.id}
                    onClick={() => this.props.onClickTag(t)}
                />)
            }
            {/*
             <a className="btn btn-default" ref={zoomIn => this.zoomIn = zoomIn}>+</a>
             <a className="btn btn-default" ref={zoomOut => this.zoomOut = zoomOut}>-</a>
             */}
        </div>
    }
}

export default ZoomableFloorPlan

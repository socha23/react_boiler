import React from 'react'
import {PropTypes} from 'prop-types'

const TAG_SIZE = 20;

const Tag = ({id, color, pxPosition, name, selected, onClick}) =>
    <div
        onClick={onClick}
        title={name}
        style={{
            position: "absolute",
            left: pxPosition.x + TAG_SIZE / 2,
            top: pxPosition.y + TAG_SIZE / 2,
            backgroundColor: color,
            width: TAG_SIZE,
            height: TAG_SIZE,
            borderRadius: TAG_SIZE / 2,
            border: "1px solid black",
            cursor: "pointer"
    }}>
        {selected ?
            <img
                src="/mapMarker.png"
                style={{
                    position: 'relative',
                    left: -23,
                    top: -52
                }}

            />
            : <span/>}
    </div>;

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
            onChange: this.panZoomChanged,
            __minScale: Math.max(
                this.elem.parent().width() / this.elem.width(),
                this.elem.parent().height() / this.elem.height())
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
    };

    panZoomChanged = () => {
        this.setState({matrix: this.panzoom.getMatrix().map(i => parseFloat(i))});
        console.log(this.panzoom.getMatrix());
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
        let rebasedPos = this.posToImagePx(pos);

        rebasedPos = {x: -rebasedPos.x, y: -rebasedPos.y};

        this.panzoom.pan(rebasedPos.x, rebasedPos.y);

//        let m = this.state.matrix;
//        this.panzoom.setMatrix([m[0], m[1], m[2], m[3], -rebasedPos.x, -rebasedPos.y]);



//                this.elem.panzoom("pan", rebasedPos.x, rebasedPos.y);
        console.log("PANNED TO", rebasedPos);

    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.selectedTag && this.props.selectedTag != nextProps.selectedTag) {
            let newPos = nextProps.selectedTag.position;
//            if (!this.fitsInViewport(this.posToContainerPx(newPos))) {
                this.panTo(newPos);
            }
//        }
    };


    render() {
        const mapHeight = $(window).height() - 150;

        return <div>
            <div style={{height: mapHeight, border: "1px solid #BBB"}}>
                <div style={{position: "absolute"}} ref={elem => this.elem = $(elem)}>
                    <img src={this.props.map.base64content}/>
                </div>
            </div>
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

export default ZoomableFloorPlan;

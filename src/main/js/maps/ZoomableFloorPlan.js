import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import restActions from '../common/crud/crudActions'

const TAG_SIZE = 20;

const Tag = ({id, color, pxPosition, name}) =>
    <div
        title={name}
        style={{
        position: "absolute",
        left: pxPosition.x,
        top: pxPosition.y,
        backgroundColor: color,
        width: TAG_SIZE,
        height: TAG_SIZE,
        borderRadius: TAG_SIZE / 2,
        border: "1px solid black",
        cursor: "pointer"
    }}>
    </div>;

class ZoomableFloorPlan extends React.Component {

    state = {
        matrix: [1, 0, 0, 1, 0, 0]
    };

    componentDidMount = () => {
        this.props.onMount();

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

        this.panZoomChanged(null, this.elem.data("__pz__"));

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

    panZoomChanged = (e, panzoom) => {
        this.setState({matrix: panzoom.getMatrix().map(i => parseFloat(i))});
    };

    posToPx = (pos) => {
        if (!this.elem) {
            return pos;
        }
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

    render() {

        var tags = [
            {
                position: {x: 0, y: 0},
                color: "red",
                name: "fooo",
                id: 'foo'
            },
            {
                position: {x: 50, y: 50},
                color: "green",
                name: "fooo",
                id: 'foo2'
            },
            {
                position: {x: 100, y: 100},
                color: "blue",
                name: "fooo",
                id: 'foo3'
            }

        ];

        const mapHeight = $(window).height() - 150;

        return <div>
            <div style={{height: mapHeight}}>
                <div style={{_backgroundColor: "red", position: "absolute"}} ref={elem => this.elem = $(elem)}>
                    <img
                        ref={elem => this.elem = elem}
                        src={this.props.map.base64content}
                    />
                </div>
            </div>
            {this.props.tags
                .map(t => ({...t, pxPosition: this.posToPx(t.position)}))
                .filter(t => this.fitsInViewport(t.pxPosition))
                .map(t => <Tag {...t} key={t.id}/>)
            }
            <a className="btn btn-default" ref={zoomIn => this.zoomIn = zoomIn}>+</a>
            <a className="btn btn-default" ref={zoomOut => this.zoomOut = zoomOut}>-</a>
        </div>
    }
}

const mapStateToProps = (state, ownProps) => {
    const myMapId = ownProps.map ? ownProps.map.id : ownProps.mapId;
    return {
        map: state.maps.items.find((m) => m.id == myMapId),
        tags: state.tags.items.filter((t) => t.coordinateSystemId == myMapId)
    }
};

const tagActions = restActions("tags");
const mapActions = restActions("maps");

const mapDispatchToProps = (dispatch) => ({
    onMount: () => {
        dispatch(tagActions.loadItems());
        dispatch(mapActions.loadItems({onlyOnce: true}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ZoomableFloorPlan);

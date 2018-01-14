import React from 'react'

import Slider from 'react-rangeslider'

import TransformMatrix from '../common/components/TransformMatrix'
import {DotMarker} from '../maps/Marker'

export default () => <div className="container">
    <TransformMatrixTest/>
</div>;

class TransformMatrixTest extends React.Component {

    state = {
        originX: 200,
        originY: 200,
        translateX: 0,
        translateY: 0,
        rotation: 0,
        scale: 1
    };

    onChangeTranslateX = (val) => {
        this.setState({translateX: val})
    };

    onChangeTranslateY = (val) => {
        this.setState({translateY: val})
    };

    onChangeRotation = (val) => {
        this.setState({rotation: val})
    };

    onChangeScale = (val) => {
        this.setState({scale: val})
    };

    onChangeOriginX = (val) => {
        this.setState({originX: val})
    };

    onChangeOriginY = (val) => {
        this.setState({originY: val})
    };

    render = () => {

        const point = [50, 10];
        const pointTranslated = this.f ? this.f(point) : point;

        return <div>
            <div style={{marginTop: 50, display: "flex" }}>
                <div style={{
                width: 400,
                height: 400,
                border: "1px solid black",
                overflow: "hidden",
                position: "relative"
                }}>
                    <TransformMatrix
                        ref={elem => {this.f = (x) => (elem.transformFunction(x))}}
                        translateX={this.state.translateX}
                        translateY={this.state.translateY}
                        scale={this.state.scale}
                        rotation={this.state.rotation}
                        originX={this.state.originX}
                        originY={this.state.originY}
                    >
                        <p>translateX: {this.state.translateX}</p>
                        <p>translateY: {this.state.translateY}</p>
                        <p>rotation: {this.state.rotation}</p>
                        <p>scale: {this.state.scale}</p>
                    </TransformMatrix>
                    <DotMarker
                        x={pointTranslated[0]}
                        y={pointTranslated[1]}
                        color="red"
                    />
                </div>
                <div>
                    <p>Transformed ({point[0]}, {point[1]}): ({pointTranslated[0]}, {pointTranslated[1]})</p>
                </div>
            </div>


            <p>translateX</p>
            <Slider value={this.state.translateX}
                    onChange={this.onChangeTranslateX}
                    min={-300} max={300}/>

            <p>translateY</p>
            <Slider value={this.state.translateY}
                    onChange={this.onChangeTranslateY}
                    min={-300} max={300}/>

            <p>rotation</p>
            <Slider value={this.state.rotation}
                    onChange={this.onChangeRotation}
                    min={0} max={2 * Math.PI} step={0.01}/>

            <p>scale</p>
            <Slider value={this.state.scale}
                    onChange={this.onChangeScale}
                    min={0.01} max={10} step={0.01}/>
            <p>originX</p>
            <Slider value={this.state.originX}
                    onChange={this.onChangeOriginX}
                    min={0} max={400}/>

            <p>originY</p>
            <Slider value={this.state.originY}
                    onChange={this.onChangeOriginY}
                    min={0} max={400}/>

        </div>
    };
}
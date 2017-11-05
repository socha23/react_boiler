import React from 'react'
import PropTypes from 'prop-types'
import Uploader from '../common/components/Uploader'
import ConfirmableLink from '../common/components/ConfirmableLink'


const ImageRow = ({image, onDelete, selected, onClick}) =>
        <tr
            style={{cursor: onClick ? "pointer" : "default"}}
            className={selected ? "success" : ""}
            onClick={() => {if (onClick) {onClick(image)}}}
            title={image.name}
        >
            <td style={{paddingTop: 5, paddingBottom: 5, width: 130}}>
                <img style={{padding: 5, border: "1px solid #888"}} src={CONTEXT_PATH + "/api/images/" + image.id + "/thumbnail"}/>
            </td>
            <td style={{padding: 10, maxWidth: 150, overflow: "hidden"}}>
                <div>
                    <strong>{image.name}</strong>
                </div>
                {onDelete ?
                    <p><ConfirmableLink style={{cursor: "pointer"}} onClick={onDelete} message="Czy na pewno usunąć?">
                        Usuń
                    </ConfirmableLink>
                    </p>
                    : <span/>
                }
            </td>
        </tr>
    ;

const EditableImageList = ({items, onDelete, onUploadSuccess}) => <div>
    <table className="table">
        <tbody>
        {items.map(image =>
            <ImageRow key={image.id} image={image} onDelete={() => onDelete(image)}/>)}
        </tbody>
    </table>
    <Uploader buttonLabel="Dodaj zdjęcie" onUploadSuccess={onUploadSuccess}/>
</div>;

class EditableImageListContainer extends React.Component {

    static propTypes = {
        items: PropTypes.array,
        onChange: PropTypes.func
    };

    static defaultProps = {
        items: [],
        onChange: () => {
        }
    };

    onUploadSuccess = (result) => {
        let newItems = [...this.props.items];
        newItems.push(result.item);
        this.props.onChange(newItems);
    };

    onDelete = (item) => {
        let newItems = [...this.props.items];
        var idx = newItems.indexOf(item);
        if (idx >= 0) {
            newItems.splice(idx, 1);
        }
        this.props.onChange(newItems);
    };

    render() {
        return <EditableImageList items={this.props.items} onDelete={this.onDelete}
                                  onUploadSuccess={this.onUploadSuccess}/>
    }
}


const ImageListWithView = ({items, item, onClick}) => <div>
    {
        item ? <div>
            <img style={{width: "100%", padding: 5, border: "1px solid #888"}} src={CONTEXT_PATH + "/api/images/" + item.id}/>
        </div> : <span/>
    }
    <table className="table">
        <tbody>
        {items.map(image =>
            <ImageRow key={image.id} image={image} selected={image == item} onClick={onClick}/>
        )}
        </tbody>
    </table>
</div>;

class ImageListWithViewContainer extends React.Component {

    static propTypes = {
        items: PropTypes.array
    };

    static defaultProps = {
        items: []
    };

    state = {
        selected: this.props.items.length > 0 ? this.props.items[0] : null
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            selected: nextProps.items.length > 0 ? nextProps.items[0] : null
        });

    };


    onClick = (item) => {
        this.setState({selected: item});
    };

    render() {
        return <ImageListWithView items={this.props.items}
                                  item={this.state.selected}
                                  onClick={this.onClick}/>
    }
}


module.exports = {
    EditableImageList: EditableImageListContainer,
    ImageListWithView: ImageListWithViewContainer
};
import React from 'react'
import PropTypes from 'prop-types'
import Uploader from '../common/components/Uploader'
import ConfirmableLink from '../common/components/ConfirmableLink'


const EditableImageRow = ({image, onDelete}) => <tr>
        <td style={{paddingTop: 5, paddingBottom: 5}}>
            <img style={{padding: 5, border: "1px solid #888"}} src={"/api/images/" + image.id + "/thumbnail"}/>
        </td>
        <td style={{padding: 10}}>
            <strong>{image.name}</strong>
            <p><ConfirmableLink style={{cursor: "pointer"}} onClick={onDelete} message="Czy na pewno usunąć?">
                Usuń
            </ConfirmableLink>
            </p>
        </td>
    </tr>
    ;

const EditableImageList = ({items, onDelete, onUploadSuccess}) => <div>
    <strong>Zdjęcia</strong>
    <table>
        <tbody>
        {items.map(image =>
            <EditableImageRow key={image.id} image={image} onDelete={() => onDelete(image)}/>)}
        </tbody>
    </table>
    <Uploader buttonLabel="Dodaj zdjęcie" onUploadSuccess={onUploadSuccess}/>
</div>;

export default class EditableImageListContainer extends React.Component {

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
        console.log("ON DELETE: ");
        console.log(item);
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

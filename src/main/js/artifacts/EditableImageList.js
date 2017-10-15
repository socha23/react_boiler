import React from 'react'
import PropTypes from 'prop-types'
import Uploader from '../common/components/Uploader'
import ConfirmableLink from '../common/components/ConfirmableLink'

export default class EditableImageList extends React.Component {

    static propTypes = {
        items: PropTypes.array,
        onChange: PropTypes.func
    };

    static defaultProps = {
        items: [],
        onChange: () => {}
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
        return <div>
            <strong>Zdjęcia</strong>
            {this.props.items.map(image => <div key={image.id}>
                {image.id} {image.name}
                <ConfirmableLink onClick={() => this.onDelete(image)} message="Czy na pewno usunąć?">
                    Usuń
                </ConfirmableLink>
            </div>)}
            <Uploader buttonLabel="Dodaj zdjęcie" onUploadSuccess={this.onUploadSuccess}/>
        </div>
    }
}

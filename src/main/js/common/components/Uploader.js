import React from 'react'
import PropTypes from 'prop-types'
import FileUpload  from 'react-fileupload'
import ProgressBar from './ProgressBar'

export default class Uploader extends React.Component {

    state = {
        uploading: false,
        filename: '',
        progress: {},
        error: null
    };

    static propTypes = {
        buttonLabel: PropTypes.string,
        onUploadSuccess: PropTypes.func
    };

    static defaultProps = {
        buttonLabel: "Dodaj plik",
        onUploadSuccess: () => {}
    };

    onUploadStart = (files) => {
        this.setState({
            error: null,
            filename: files[0].name
        })
    };

    onUploadSuccess = (resp) => {
        this.setState({
            uploading: false
        });
        this.props.onUploadSuccess(resp);
    };

    onUploadError = (resp) => {
        this.setState({
            uploading: false,
            error: resp.message
        });
    };

    onProgress = (progress) => {
        this.setState({progress: progress});
    };

    render() {
        const options = {
            baseUrl: CONTEXT_PATH + "/api/images",
            chooseAndUpload: true,
            multiple: false,
            fileFieldName: 'file',
            uploading: this.onProgress,
            doUpload: this.onUploadStart,
            uploadSuccess: this.onUploadSuccess,
            uploadError: this.onUploadError,
            uploadFail: this.onUploadError
        };


        return this.state.uploading ?
            <div>
                <strong><small>{this.state.filename}</small></strong>
                <ProgressBar current={this.state.progress.loaded} total={this.state.progress.total}/>
            </div>
            :
            <FileUpload options={options} className="fileUploadContainer">
                {this.state.error ? <span className="text-danger fileUploadError">{this.state.error}</span> : <span></span>}
                <a ref="chooseAndUpload" className="btn btn-default iconWithName">
                    <i className="glyphicon glyphicon-plus"/>
                    {this.props.buttonLabel}
                </a>
            </FileUpload>


    }

}


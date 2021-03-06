export default function restActionNames(resource) {
    return {
        REQUEST_ITEMS: 'REQUEST_ITEMS_' + resource.toUpperCase(),
        RECEIVE_ITEMS: 'RECEIVE_ITEMS_' + resource.toUpperCase(),

        REQUEST_CREATE: 'REQUEST_CREATE_' + resource.toUpperCase(),
        CREATE_SUCCESS: 'CREATE_SUCCESS_' + resource.toUpperCase(),
        CREATE_ERROR: 'CREATE_ERROR_' + resource.toUpperCase(),

        REQUEST_DELETE: 'REQUEST_DELETE_' + resource.toUpperCase(),
        DELETE_SUCCESS: 'DELETE_SUCCESS_' + resource.toUpperCase(),
        DELETE_ERROR: 'DELETE_ERROR_' + resource.toUpperCase(),

        REQUEST_UPDATE: 'REQUEST_UPDATE' + resource.toUpperCase(),
        UPDATE_SUCCESS: 'UPDATE_SUCCESS_' + resource.toUpperCase(),
        UPDATE_ERROR: 'UPDATE_ERROR_' + resource.toUpperCase()

    }
}



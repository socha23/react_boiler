export default function restActionNames(resource) {
    return {
        REQUEST_ITEMS: 'REQUEST_ITEMS_' + resource.toUpperCase(),
        RECEIVE_ITEMS: 'RECEIVE_ITEMS_' + resource.toUpperCase(),

        REQUEST_CREATE: 'REQUEST_CREATE_' + resource.toUpperCase(),
        CREATE_SUCCESS: 'CREATE_SUCCESS_' + resource.toUpperCase(),
        CREATE_ERROR: 'CREATE_ERROR_' + resource.toUpperCase()
    }
}



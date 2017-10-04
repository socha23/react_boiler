export default function restActionNames(resource) {
    return {
        REQUEST_ITEMS: 'REQUEST_' + resource.toUpperCase(),
        RECEIVE_ITEMS: 'RECEIVE_' + resource.toUpperCase()
    }
}



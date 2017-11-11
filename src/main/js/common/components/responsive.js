import React from 'react'
import {ResponsiveComponent} from 'react-responsive-component'


function responsive(query) {
    return ({children}) => <ResponsiveComponent query={query}>{children}</ResponsiveComponent>;

}

module.exports = {
    Below1024: responsive("(max-width: 1099px)"),
    Above1024: responsive("(min-width: 1100px)")
};


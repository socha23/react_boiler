import React from 'react'

export function expandingRowsHelper(component, rows = [], initialRows = 10) {
    return {
        getRows: function() {
            if (component.state && component.state.__expanded) {
                return rows;
            } else {
                return rows.slice(0, initialRows);
            }
        },

        getLink: function() {
            if (rows.length > initialRows) {
                if (!(component.state && component.state.__expanded)) {
                    return <a style={{cursor: "pointer"}} onClick={() => {component.setState({__expanded: true})}}>
                        Show all {rows.length} rows
                    </a>
                } else {
                    return <a style={{cursor: "pointer"}} onClick={() => {component.setState({__expanded: false})}}>
                        Hide rows
                    </a>
                }
            } else {
                return <span/>
            }
        }
    }
}

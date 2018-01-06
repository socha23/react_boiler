import React from 'react'

export function scrollTo(container, elem) {
    if (!elem || !elem.offset()) {
        return;
    }
    let elemTop = elem.offset().top;

    if (container.scrollTop() > elemTop) {
        container.scrollTop(elemTop);
    }

    if (container.scrollTop() + container.height() < elemTop ) {
        container.scrollTop(elemTop);
    }
}

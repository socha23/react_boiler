/**
 * a NavLink wrapped in li, boostrap3-style
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router'
import {Link} from 'react-router-dom'

const LiNavLink = ({
    to,
    exact,
    strict,
    location,
    className,
    activeClassName,
    style,
    activeStyle,
    ariaCurrent,
    isActive: getIsActive,
    ...rest
    }) => (
    <Route
        path={typeof to === 'object' ? to.pathname : to}
        exact={exact}
        strict={strict}
        location={location}
        children={({ location, match }) => {
            const isActive = !!(getIsActive ? getIsActive(match, location) : match);
            return (
              <li
                className={isActive ? [ className, activeClassName ].filter(i => i).join(' ') : className}
                style={isActive ? { ...style, ...activeStyle } : style}
                >
                  <Link
                    to={to}
                    className={isActive ? [ className, activeClassName ].filter(i => i).join(' ') : className}
                    style={isActive ? { ...style, ...activeStyle } : style}
                    aria-current={isActive && ariaCurrent}
                    {...rest}
                  />
              </li>
            )
      }}
    />

);

LiNavLink.propTypes = {
  to: Link.propTypes.to,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  location: PropTypes.object,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  activeStyle: PropTypes.object,
  style: PropTypes.object,
  isActive: PropTypes.func,
  ariaCurrent: PropTypes.oneOf(['page', 'step', 'location', 'true'])
};

LiNavLink.defaultProps = {
  activeClassName: 'active',
  ariaCurrent: 'true'
};

export default LiNavLink;
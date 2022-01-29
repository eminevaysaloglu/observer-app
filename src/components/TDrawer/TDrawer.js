import React, { useEffect, useState } from 'react'
import './style.scss'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CloseIcon from '@mui/icons-material/Close';

function TDrawer(props) {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setActive(true)
        }, 100);
    }, [])

    function closingDrawer() {
        setActive(false)
        setTimeout(() => {
            props.closeDrawer()
        }, 350);
    }

    return (
        <div className={classNames("drawer-main")}>
            <div className={classNames("drawer-main-container", props.position, { active })}>
                <div className={classNames("drawer-main-container-header", props.position)}>
                    <div className="drawer-main-container-header-close-button" onClick={closingDrawer}>
                        <CloseIcon sx={{color: 'white'}} />
                    </div>
                    <div className="drawer-main-container-header-title">
                        {props.title}
                    </div>
                </div>
                <div className="drawer-main-container-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

TDrawer.propTypes = {
    "position": PropTypes.oneOf(['left', 'right']),
    "closeDrawer": PropTypes.func,
    "title": PropTypes.string
}

TDrawer.defaultProps = {
    "position": "right",
}

export default TDrawer



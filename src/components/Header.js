import React from 'react';

const Header = (props) => {
    return (
        <h2 className="text-center">
            {props.headerMessage}
        </h2>
    );
}

export default Header;
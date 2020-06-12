import React from 'react';

function Graphic(props) {
    return (
        <div className='graphic'>
            <img alt='' src={props.pic} />
            <p>{props.caption}</p>
        </div>
    );
}

export default Graphic;

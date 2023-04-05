import React from 'react';
import LazyLoad from 'react-lazy-load';

function YTEmbedded({ ytId }) {
    return (
        <div>
            <LazyLoad height={315}>
                <iframe
                    width="560"
                    height="315"
                    src={ytId}
                    title="Schau dir dieses Video an!"
                    allowFullScreen
                    style={{width: "90%", zIndex: 0, border: "none", borderRadius: "10px"}}
                />
            </LazyLoad>
        </div>
    )
}

export default YTEmbedded;
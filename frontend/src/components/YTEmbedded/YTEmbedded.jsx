import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazy-load';

function YTEmbedded({ ytLink }) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[]);

    const width = screenWidth > 1024 ? 700 : "90%";

    return (
        <div>
            <LazyLoad height={315}>
                <iframe
                    width={width}
                    height="315"
                    src={ytLink}
                    title="Schau dir dieses Video an!"
                    allowFullScreen
                    style={{zIndex: 0, border: "none", borderRadius: "10px" }}
                />
            </LazyLoad>
        </div>
    )
}

export default YTEmbedded;
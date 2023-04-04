import React, { useEffect, useRef, useState } from 'react';
import styles from './Accordion.module.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Accordion({ data }) {
    const [isOpened, setIsOpened] = useState(false);
    const [height, setHeight] = useState(0);
    const refContainer = useRef();

    useEffect(() => {
        setHeight(`${refContainer.current.scrollHeight}px`)
    }, [])

    return (
        <div className={styles.accordion}>
            <button className={`${styles.accordionHead} ${isOpened && styles.accordionHeadOpened}`} onClick={() => setIsOpened(!isOpened)}>
                <ChevronRightIcon className={styles.chevronIcon}/>
                <span>{data.name}</span>
            </button>
            <div ref={refContainer} className={isOpened ? `${styles.toggleContainer} ${styles.animated}` : 
                 styles.toggleContainer}
                 style={{height: isOpened ? `${refContainer.current.scrollHeight}px` : 0}}>
                {data.description}
            </div>
        </div>
    )
}

export default Accordion;
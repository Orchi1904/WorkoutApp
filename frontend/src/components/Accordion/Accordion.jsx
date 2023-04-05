import React, { useEffect, useRef, useState } from 'react';
import styles from './Accordion.module.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import YTEmbedded from '../YTEmbedded/YTEmbedded';

function Accordion({ data }) {
    const [isOpened, setIsOpened] = useState(false);
    const refContainer = useRef();

    return (
        <div className={styles.accordion}>
            <button className={`${styles.accordionHead} ${isOpened && styles.accordionHeadOpened}`} onClick={() => setIsOpened(!isOpened)}>
                <ChevronRightIcon className={styles.chevronIcon} />
                <span>{data.name}</span>
            </button>
            <div ref={refContainer} className={isOpened ? `${styles.toggleContainer} ${styles.animated}` :
                styles.toggleContainer}
                style={{ height: isOpened ? "fit-content" : 0 }}
            >
                <div className={styles.toggleContainerTop}>
                    <div className={styles.sets}>
                        <p>Sätze</p>
                        <p>{data.numberOfSets}</p>
                    </div>
                    <div className={styles.reps}>
                        <p>Wiederholungen</p>
                        <p>{data.repsPerSet}</p>
                    </div>
                </div>
                <div className={styles.toggleContainerMid}>
                    <div className={styles.weight}>
                        <p>Gewicht</p>
                        <p>{data.weight + " kg"}</p>
                    </div>
                </div>
                <div className={styles.toggleContainerBottom}>
                    {data.description &&
                        <div className={styles.description}>
                            <p>Beschreibung</p>
                            <p>{data.description}</p>
                        </div>
                    }
                    {data.ytId && 
                        <div className={styles.ytVideo}>
                            <p>Hilfsvideo</p>
                            <YTEmbedded ytId={`https://www.youtube.com/embed/${data.ytId}`}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Accordion;
import React from 'react';
import styles from "./Error.module.css";

function Error() {
  return (
    <div className={styles.error}>
      <div className={styles.errorText}>
        <h1>404</h1>
        <h2>Das Licht ist aus, wir gehen nach Haus!</h2>
        <p>Leider konnten wir diese Seite nicht finden...</p>
      </div>
    </div>
  )
}

export default Error;
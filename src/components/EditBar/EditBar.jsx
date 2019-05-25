import React from 'react';

import styles from './editBar.module.css';

export default function EditBar(props) {
  const { submitTitle, onClickCancel, onClickRemove, onClickSubmit, cancelTooltip } = props;

  return (
    <div>
      <a className={styles['cancel-img-box']} onClick={onClickCancel}>
        <div className={styles['cancel-img']}>
          <div className={styles.tooltip}>{cancelTooltip}</div>
        </div>
      </a>
      <div className={styles['buttons-box']}>
        <button className={styles['submit-button']} onClick={onClickSubmit}>
          {submitTitle}
        </button>
        {onClickRemove ? (
          <a className={styles['remove-img-box']} onClick={onClickRemove}>
            <div className={styles['remove-img']} />
          </a>
        ) : null}
      </div>
    </div>
  );
}

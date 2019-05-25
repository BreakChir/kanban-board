import React from 'react';

import styles from './actionBlock.module.css';

export default function ActionBlock(props) {
  const { title, onClick } = props;

  return (
    <div className={styles.box}>
      <a onClick={onClick} className={styles.button}>
        <div className={styles.img} />
        <div className={styles.label}>{title}</div>
      </a>
    </div>
  );
}

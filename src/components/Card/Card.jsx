import React from 'react';
import shouldUpdate from 'recompose/shouldUpdate';
import cn from 'classnames';

import styles from './card.module.css';

function Card(props) {
  const { value, isDragging } = props;
  return isDragging ? (
    <div className={cn(styles.card, styles.card_mode_shadow)}>{value}</div>
  ) : (
    <div className={styles.card}>{value}</div>
  );
}

const checkPropsChange = (props, nextProps) =>
  nextProps.value !== props.value ||
  nextProps.isDragging !== props.isDragging ||
  nextProps.isOver !== props.isOver;

export default shouldUpdate(checkPropsChange)(Card);

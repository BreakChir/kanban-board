import React from 'react';
import { DragLayer } from 'react-dnd/lib/cjs/index';

import styles from '../Card/card.module.css';

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px) rotate(5deg)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

function DragCardPreview(props) {
  const { item, isDragging } = props;
  if (!isDragging) {
    return null;
  }

  return (
    <div className={styles.card_mode_preview}>
      <div style={getItemStyles(props)} className={styles.card}>
        {item.value}
      </div>
    </div>
  );
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(DragCardPreview);

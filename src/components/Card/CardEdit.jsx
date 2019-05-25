import React from 'react';
import cn from 'classnames';

import styles from './card.module.css';

export default function CardEdit(props) {
  const { editType, value, onChange, placeholder, isIncorrect, height, handleKeyDown } = props;
  const cardClassName = cn(styles.card, styles.card_mode_edit, {
    [styles.card_incorrect]: isIncorrect
  });

  return editType === 'input' ? (
    <input
      ref={e => {
        if (e) e.focus();
      }}
      className={cardClassName}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      value={value}
    />
  ) : (
    <textarea
      ref={e => {
        if (e) {
          e.focus();
        }
      }}
      className={cardClassName}
      style={{ height: `${height}px` }}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      value={value}
    />
  );
}

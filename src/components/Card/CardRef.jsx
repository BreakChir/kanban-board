import React from 'react';
import DropCardForm from '../DragDropComponents/DropCardForm';

export default function CardRef(props) {
  const formRef = { ref: null };

  return (
    <div
      ref={el => {
        if (el) {
          formRef.ref = el;
        }
      }}
    >
      <DropCardForm formRef={formRef} {...props} />
    </div>
  );
}

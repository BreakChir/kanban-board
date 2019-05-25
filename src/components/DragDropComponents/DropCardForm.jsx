import React from 'react';
import { DropTarget } from 'react-dnd/lib/cjs/index';
import { CARD } from '../../constants/cardTypes';
import EditableForm from '../EditableForm/EditableForm';
import DragCard from './DragCard';

function DropCardForm(props) {
  const { connectDropTarget, ...other } = props;
  return connectDropTarget(
    <div>
      <EditableForm Child={DragCard} {...other} />
    </div>
  );
}

export default DropTarget(
  CARD,
  {
    hover: (props, monitor) => {
      const { id, colId, formRef, moveCard } = props;

      const { height, top } = formRef.ref.getBoundingClientRect();

      const item = monitor.getItem();
      const dragId = item.id;
      const dragColId = item.col.id;
      if (dragId === id) {
        return;
      }
      const dragY = monitor.getClientOffset().y - top;
      const dropY = height / 2;
      if (moveCard(colId, id, dragColId, dragId, dropY, dragY)) {
        item.col.id = colId;
      }
    }
  },
  connect => {
    return {
      connectDropTarget: connect.dropTarget()
    };
  }
)(DropCardForm);

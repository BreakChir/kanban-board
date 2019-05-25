import React from 'react';
import { DragSource } from 'react-dnd/lib/cjs/index';
import { getEmptyImage } from 'react-dnd-html5-backend/lib/cjs/index';
import { CARD } from '../../constants/cardTypes';
import Card from '../Card/Card';

function DragCard(props) {
  const { connectDragSource, connectDragPreview, ...other } = props;
  connectDragPreview(getEmptyImage());
  return connectDragSource(
    <div>
      <Card {...other} />
    </div>
  );
}

export default DragSource(
  CARD,
  {
    beginDrag(props) {
      const { id, colId, value } = props;
      return { id, col: { id: colId }, value };
    },

    isDragging(props, monitor) {
      return props.id === monitor.getItem().id;
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(DragCard);

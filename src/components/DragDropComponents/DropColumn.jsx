import React from 'react';
import { DropTarget } from 'react-dnd/lib/cjs/index';
import { CARD } from '../../constants/cardTypes';
import Column from '../Column/Column';

function DropColumn(props) {
  const { connectDropTarget, ...other } = props;
  return connectDropTarget(
    <div>
      <Column {...other} />
    </div>
  );
}

export default DropTarget(
  CARD,
  {
    hover: (props, monitor) => {
      const { id, children, moveCard } = props;
      if (children.length > 0) {
        return;
      }
      const item = monitor.getItem();
      const dragId = item.id;
      const dragColId = item.col.id;
      if (moveCard(id, -1, dragColId, dragId)) {
        item.col.id = id;
      }
    }
  },
  connect => {
    return {
      connectDropTarget: connect.dropTarget()
    };
  }
)(DropColumn);

import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ActionForm from '../ActionForm/ActionForm';
import DropColumn from '../DragDropComponents/DropColumn';
import DragCardPreview from '../DragDropComponents/DragCardPreview';
import { initialState } from './initialState';

import styles from './kanbanBoard.module.css';

class KanbanBoard extends Component {
  columnId = 3;

  cardId = 10;

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleAddColumnButtonClick = title => {
    this.setState(state => {
      const column = { title, cards: [] };
      return { columns: { ...state.columns, [this.columnId++]: column } };
    });
  };

  removeColumn = colId => () => {
    this.setState(state => {
      const { [colId]: id, ...columns } = state.columns;
      return { columns };
    });
  };

  editColumnTitle = colId => value => {
    this.setState(state => {
      const column = { ...state.columns[colId], title: value };
      return { columns: { ...state.columns, [colId]: column } };
    });
  };

  addCard = colId => value => {
    this.setState(state => {
      const id = this.cardId++;
      const cards = [...state.columns[colId].cards, { id, value }];
      const column = { ...state.columns[colId], cards };
      return { columns: { ...state.columns, [colId]: column } };
    });
  };

  removeCard = colId => cardId => () => {
    this.setState(state => {
      const cards = state.columns[colId].cards.filter(card => cardId !== card.id);
      const column = { ...state.columns[colId], cards };
      return { columns: { ...state.columns, [colId]: column } };
    });
  };

  editCard = colId => cardId => value => {
    this.setState(state => {
      const cards = state.columns[colId].cards.map(card =>
        card.id === cardId ? { ...card, value } : card
      );
      const column = { ...state.columns[colId], cards };
      return { columns: { ...state.columns, [colId]: column } };
    });
  };

  moveCard = (dropColId, dropId, dragColId, dragId, dropY, dragY) => {
    const dragIndex = this.state.columns[dragColId].cards.findIndex(el => el.id === dragId);
    const dropIndex = this.state.columns[dropColId].cards.findIndex(el => el.id === dropId);
    if (dropColId === dragColId) {
      if (dragIndex < dropIndex && dragY < dropY) {
        return false;
      }
      if (dragIndex > dropIndex && dragY > dropY) {
        return false;
      }
      this.setState(state => {
        const { cards } = state.columns[dropColId];
        const resCards = [];
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].id !== dragId) {
            if (cards[i].id === dropId) {
              if (i < dragIndex) {
                resCards.push(cards[dragIndex]);
                resCards.push(cards[i]);
              } else {
                resCards.push(cards[i]);
                resCards.push(cards[dragIndex]);
              }
            } else {
              resCards.push(cards[i]);
            }
          }
        }
        if (resCards.length !== cards.length) {
          resCards.push(cards[dragIndex]);
        }
        const column = { ...state.columns[dropColId], cards: resCards };
        return { columns: { ...state.columns, [dropColId]: column } };
      });
    } else {
      this.setState(state => {
        const dragCard = state.columns[dragColId].cards[dragIndex];
        const fromCards = state.columns[dragColId].cards.filter(item => item.id !== dragId);
        const { cards } = state.columns[dropColId];
        const toCards = [];
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].id === dropId) {
            if (dragY < dropY) {
              toCards.push(dragCard);
              toCards.push(cards[i]);
            } else {
              toCards.push(cards[i]);
              toCards.push(dragCard);
            }
          } else {
            toCards.push(cards[i]);
          }
        }
        if (toCards.length === cards.length) {
          toCards.push(dragCard);
        }
        const toColumn = { ...state.columns[dropColId], cards: toCards };
        const fromColumn = { ...state.columns[dragColId], cards: fromCards };
        return { columns: { ...state.columns, [dropColId]: toColumn, [dragColId]: fromColumn } };
      });
    }
    return true;
  };

  render() {
    const { columns } = this.state;

    const columnsList = Object.keys(columns).map(columnId => (
      <div key={columnId} className={styles.column}>
        <DropColumn
          id={columnId}
          title={columns[columnId].title}
          addCard={this.addCard(columnId)}
          removeCard={this.removeCard(columnId)}
          editCard={this.editCard(columnId)}
          moveCard={this.moveCard}
          removeColumn={this.removeColumn(columnId)}
          editColumnTitle={this.editColumnTitle(columnId)}
        >
          {columns[columnId].cards}
        </DropColumn>
      </div>
    ));

    return (
      <div className={styles.board}>
        {columnsList}
        <div className={styles.column}>
          <ActionForm
            editType="input"
            title="Добавить еще одну колонку"
            submitTitle="Добавить колонку"
            placeholder="Введите название колонки"
            cancelTooltip="Отменить"
            onClickSubmit={this.handleAddColumnButtonClick}
          />
        </div>
        <DragCardPreview />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(KanbanBoard);

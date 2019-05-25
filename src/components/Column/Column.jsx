import React from 'react';
import shouldUpdate from 'recompose/shouldUpdate';
import CardRef from '../Card/CardRef';
import EditableForm from '../EditableForm/EditableForm';
import ActionForm from '../ActionForm/ActionForm';

import styles from './column.module.css';

function Column(props) {
  const {
    id,
    title,
    removeColumn,
    editColumnTitle,
    addCard,
    removeCard,
    editCard,
    moveCard,
    children
  } = props;

  const TitleBlock = () => <div className={styles.title}>{title}</div>;

  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <EditableForm
          Child={TitleBlock}
          value={title}
          cancelAction={removeColumn}
          submitAction={editColumnTitle}
          placeholder="Введите название колонки"
        />
        <div className={styles['item-list']}>
          {children.map(card => (
            <div key={card.id} className={styles.item}>
              <CardRef
                id={card.id}
                value={card.value}
                colId={id}
                moveCard={moveCard}
                cancelAction={removeCard(card.id)}
                submitAction={editCard(card.id)}
                placeholder="Введите название карточки"
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles['action-form']}>
        <ActionForm
          editType="textarea"
          title="Добавить еще одну карточку"
          submitTitle="Добавить карточку"
          placeholder="Введите название карточки"
          onClickSubmit={addCard}
          colId={id}
        />
      </div>
    </div>
  );
}

const checkPropsChange = (props, nextProps) =>
  nextProps.title !== props.title || nextProps.children !== props.children;

export default shouldUpdate(checkPropsChange)(Column);

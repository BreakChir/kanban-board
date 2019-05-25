import React, { Component } from 'react';
import EditBlock from '../EditBlock/EditBlock';
import ActionBlock from '../ActionBlock/ActionBlock';

import styles from './actionForm.module.css';

export default class ActionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  changeButtonState = () => {
    this.setState(state => {
      return { isEdit: !state.isEdit };
    });
  };

  handleButtonClick = () => {
    this.changeButtonState();
  };

  handleSubmitButtonClick = text => {
    const { onClickSubmit } = this.props;
    onClickSubmit(text);
    this.changeButtonState();
  };

  handleCancelButtonClick = () => {
    this.changeButtonState();
  };

  render() {
    const { isEdit } = this.state;
    const { editType, submitTitle, title, placeholder } = this.props;

    return isEdit ? (
      <div className={styles.editBlock}>
        <EditBlock
          editType={editType}
          submitTitle={submitTitle}
          cancelTooltip="Отменить"
          onClickSubmit={this.handleSubmitButtonClick}
          onClickCancel={this.handleCancelButtonClick}
          placeholder={placeholder}
        />
      </div>
    ) : (
      <ActionBlock title={title} onClick={this.handleButtonClick} />
    );
  }
}

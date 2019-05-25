import React, { Component } from 'react';
import EditBlock from '../EditBlock/EditBlock';

export default class EditableForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read'
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState || this.props.isDragging !== nextProps.isDragging;
  }

  setMode = mode => {
    this.setState({ mode });
  };

  handleSubmitButtonClick = value => {
    const { submitAction } = this.props;
    submitAction(value);
    this.setMode('read');
  };

  handleRemoveButtonClick = () => {
    const { cancelAction } = this.props;
    cancelAction();
  };

  handleCancelButtonClick = () => {
    this.setMode('read');
  };

  render() {
    const { Child, value, placeholder, formRef } = this.props;
    const { mode } = this.state;
    let formHeight = null;
    if (formRef && formRef.ref) {
      formHeight = formRef.ref.getBoundingClientRect().height;
    }
    return mode === 'edit' ? (
      <EditBlock
        editType="textarea"
        value={value}
        height={formHeight}
        submitTitle="Изменить"
        cancelTooltip="Отменить"
        onClickSubmit={this.handleSubmitButtonClick}
        onClickCancel={this.handleCancelButtonClick}
        onClickRemove={this.handleRemoveButtonClick}
        placeholder={placeholder}
      />
    ) : (
      <div onClick={() => this.setMode('edit')}>
        <Child {...this.props} />
      </div>
    );
  }
}

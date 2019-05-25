import React from 'react';
import CardEdit from '../Card/CardEdit';
import EditBar from '../EditBar/EditBar';

import styles from './editBlock.module.css';

export default class EditBlock extends React.Component {
  static DEFAULT_VALUE = '';

  static MIN_HEIGHT = 54;

  constructor(props) {
    super(props);
    const { value, height } = props;
    this.state = {
      value: value || EditBlock.DEFAULT_VALUE,
      height: height || EditBlock.MIN_HEIGHT,
      isIncorrectValue: false
    };
  }

  changeValue = e => {
    const input = e.target;
    this.setState({ value: input.value, height: input.scrollHeight });
  };

  handleSubmitClick = () => {
    const { height, value } = this.state;
    const { setHeight, onClickSubmit } = this.props;
    if (value === '') {
      this.setState({ isIncorrectValue: true });
      setTimeout(() => {
        this.setState({ isIncorrectValue: false });
      }, 0);
    } else {
      if (setHeight) {
        setHeight(height);
      }
      onClickSubmit(value);
    }
  };

  handleKeyDown = e => {
    switch (e.key) {
      case 'Delete': {
        this.props.onClickRemove();
        break;
      }

      case 'Escape': {
        this.props.onClickCancel();
        break;
      }

      case 'Enter': {
        if (e.shiftKey) {
          return;
        }
        this.handleSubmitClick();
        break;
      }

      default:
    }
  };

  render() {
    const { value, isIncorrectValue, height } = this.state;
    const {
      editType,
      submitTitle,
      onClickCancel,
      onClickRemove,
      cancelTooltip,
      placeholder
    } = this.props;

    return (
      <div className={styles.box}>
        <div className={styles.input}>
          <CardEdit
            editType={editType}
            value={value}
            height={height < EditBlock.MIN_HEIGHT ? EditBlock.MIN_HEIGHT : height}
            placeholder={placeholder}
            onChange={this.changeValue}
            handleKeyDown={this.handleKeyDown}
            isIncorrect={isIncorrectValue}
          />
        </div>
        <EditBar
          submitTitle={submitTitle}
          onClickSubmit={this.handleSubmitClick}
          onClickCancel={onClickCancel}
          onClickRemove={onClickRemove}
          cancelTooltip={cancelTooltip}
        />
      </div>
    );
  }
}

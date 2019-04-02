import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

@connect(({ global }) => ({
  global,
}))
class Index extends Component {
  state = {
    phone: '',
    redeemCode: '',
  };
  changeField = (field, e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  submit = () => {
    debugger;
    if (!this.state.phone || !this.state.redeemCode) {
      message.error('Please complete the information');
      return false;
    }

    this.props.dispatch({
      type: 'global/cashLottery',
      payload: {
        phone: this.state.phone,
        awardCode: this.state.redeemCode,
      },
    });
  };

  render() {
    return (
      <div className={styles['container']}>
        <div className={styles['cash-box']}>
          <div className={styles['input-box']}>
            <div>Phone</div>
            <Input placeholder='please enter your phone number' onChange={this.changeField.bind(null, 'phone')}/>
          </div>
          <div className={styles['input-box']}>
            <div>Redeem code</div>
            <Input placeholder='please enter your redeem code' onChange={this.changeField.bind(null, 'redeemCode')}/>
          </div>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Button type='primary' className={styles['btn']} onClick={this.submit}>Confirm</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

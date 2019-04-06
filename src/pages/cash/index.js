import React, { Component } from 'react';
import { Input, Button, message, Select } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

const Option = Select.Option;

@connect(({ global }) => ({
  global,
}))
class Index extends Component {
  state = {
    phone: '',
    redeemCode: '',
    postStr: '+91',
    pattern: '^[1-9]{1}[0-9]{9}$',
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
        phone: this.state.postStr.substr(1) + this.state.phone,
        awardCode: this.state.redeemCode,
      },
    });
  };

  changeSelectStr = (value) => {
    this.setState({
      postStr: value,
    });
  };

  render() {
    const selectBefore = (
      <Select style={{ width: 72,marginLeft: 10,border:'none', display: 'inline-block' }} value={this.state.postStr} onChange={this.changeSelectStr}>
        <Option value="+91">+91</Option>
        <Option value="+977">+977</Option>
        <Option value="+86">+86</Option>
        <Option value="+81">+81</Option>
        <Option value="+82">+82</Option>
        <Option value="+84">+84</Option>
        <Option value="+850">+850</Option>
        <Option value="+852">+852</Option>
        <Option value="+853">+853</Option>
        <Option value="+855">+855</Option>
        <Option value="+856">+856</Option>
        <Option value="+880">+880</Option>
        <Option value="+886">+886</Option>
      </Select>
    );
    return (
      <div className={styles['container']}>
        <div className={styles['cash-box']}>
          <div className={styles['input-box']}>
            <div style={{display: 'inline-block'}}>Phone</div>
            {selectBefore}
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

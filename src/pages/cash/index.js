import React, { Component } from 'react';
import { Input, Button, message, Select, Modal } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

const Option = Select.Option;

@connect(({ global, loading }) => ({
  global,
  loading: loading.models.global,
}))
class Index extends Component {
  state = {
    phone: '',
    redeemCode: '',
    postStr: '+91',
    pattern: '^[1-9]{1}[0-9]{9}$',
    visible: false,
    sms: '',
  };
  changeField = (field, e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  submit = () => {
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
    }).then(() => {
      if (this.props.global.verification) {
        this.setState({
          visible: true,
        });
      }
    });
  };

  changeSelectStr = (value) => {
    this.setState({
      postStr: value,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      sms: '',
      phone: '',
      redeemCode: '',
      postStr: '+91',
    });
    this.props.dispatch({
      type: 'global/save',
      payload: {
        smsId: '',
        verification: '',
      },
    });
  };

  smsLottery = () => {
    if (!this.state.sms) {
      message.error('enter you code!');
      return;
    }
    this.props.dispatch({
      type: 'global/smsLottery',
      payload: {
        id: this.props.global.smsId,
        phone: this.state.postStr.substr(1) + this.state.phone,
        awardCode: this.state.sms,
        key: this.props.global.verification,
        callback: this.handleCancel,
      },
    }).then(() => {

    });
  };

  changeIpt = (e) => {
    this.setState({
      sms: e.target.value,
    });
  };

  render() {
    const selectBefore = (
      <Select style={{ width: 72, marginLeft: 10, border: 'none', display: 'inline-block' }} value={this.state.postStr}
              onChange={this.changeSelectStr}>
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
            <div style={{ display: 'inline-block' }}>Phone</div>
            {selectBefore}
            <Input placeholder='please enter your phone number' value={this.state.phone}
                   onChange={this.changeField.bind(null, 'phone')}/>
          </div>
          <div className={styles['input-box']}>
            <div>Redeem code</div>
            <Input placeholder='please enter your redeem code' value={this.state.redeemCode}
                   onChange={this.changeField.bind(null, 'redeemCode')}/>
          </div>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Button type='primary' loading={this.props.loading} className={styles['btn']}
                    onClick={this.submit}>Confirm</Button>
          </div>
        </div>
        <Modal
          visible={this.state.visible}
          closable={false}
          footer={null}
        >
          <p style={{ color: '#000', fontSize: 20, textAlign: 'center', fontWeight: '600', lineHeight: '26px' }}>We have
            sent a verification message to your
            phone</p>
          <Input placeholder='Please enter the verification code' value={this.state.sms} onChange={this.changeIpt}/>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Button type='primary' loading={this.props.loading} onClick={this.smsLottery}>Confirm</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Index;

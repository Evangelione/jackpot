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
    codeHolder: 'Get Code',
    phone: '',
    code: '',
    imei: '',
    postStr: '+91',
  };
  timer = null;
  sec = 60;


  getCode = () => {
    if ((this.state.codeHolder !== 'Get Code') || (this.state.phone === '')) return false;
    this.setState({
      codeHolder: `${this.sec}s`,
    });
    this.props.dispatch({
      type: 'global/getCode',
      payload: {
        type: 'login',
        phone: this.state.postStr + this.state.phone,
      },
    });
    this.timer = setInterval(() => {
      this.sec -= 1;
      this.setState({
        codeHolder: `${this.sec}s`,
      });
      if (this.sec < 0) {
        clearInterval(this.timer);
        this.timer = null;
        this.sec = 60;
        this.setState({
          codeHolder: 'Get Code',
        });
      }
    }, 1000);
  };

  login = () => {
    if (!this.state.code || !this.state.phone || !this.state.imei) {
      message.error('请输入完整信息');
      return false;
    }
    this.props.dispatch({
      type: 'global/login',
      payload: {
        phone: this.state.postStr + this.state.phone,
        key: this.props.global.loginKey,
        code: this.state.code,
        imei: this.state.imei,
        activityId: this.props.location.query.activityId,
      },
    });
  };

  changePhone = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };

  changeCode = (e) => {
    this.setState({
      code: e.target.value,
    });
  };

  changeIMei = (e) => {
    this.setState({
      imei: e.target.value,
    });
  };

  changeSelectStr = (value) => {
    this.setState({
      postStr: value,
    });
  };

  render() {
    const selectBefore = (
      <Select defaultValue="+91" style={{ width: 72 }} value={this.state.postStr} onChange={this.changeSelectStr}>
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
      <div className={styles['login-bg']}>
        <div className={styles['input-box']}>
          <Input addonBefore={<div style={{ width: 50, textAlign: 'left' }}>IMEI</div>} style={{ marginBottom: 20 }}
                 placeholder='please enter your IMEI code' value={this.state.imei} onChange={this.changeIMei}/>
          <Input addonBefore={selectBefore} style={{ marginBottom: 20 }}
                 placeholder='please enter your phone number' value={this.state.phone} onChange={this.changePhone}/>
          <div style={{ position: 'relative' }}>
            <Input addonBefore={<div style={{ width: 50, textAlign: 'left' }}>Code</div>} style={{ marginBottom: 20 }}
                   placeholder='please verification code' value={this.state.code} onChange={this.changeCode}/>
            <div className='get-code' onClick={this.getCode}>{this.state.codeHolder}</div>
          </div>
          <Button onClick={this.login}>LOG IN</Button>
        </div>
      </div>
    );
  }
}

export default Index;

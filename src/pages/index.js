import React, { Component } from 'react';
import { Input, Button, message, Select } from 'antd';
import router from 'umi/router';
import styles from './index.less';

const Option = Select.Option;

class Index extends Component {
  state = {
    codeHolder: 'Get Code',
  };
  timer = null;
  sec = 60;


  getCode = () => {
    if (this.state.codeHolder !== 'Get Code') return false;
    this.setState({
      codeHolder: `${this.sec}s`,
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
    router.push('/bigWheel');
    message.success('登录成功');
  };

  render() {
    const selectBefore = (
      <Select defaultValue="+91" style={{ width: 72 }}>
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
                 placeholder='please enter your IMEI code'/>
          <Input addonBefore={selectBefore} style={{ marginBottom: 20 }}
                 placeholder='please enter your phone number'/>
          <div style={{ position: 'relative' }}>
            <Input addonBefore={<div style={{ width: 50, textAlign: 'left' }}>Code</div>} style={{ marginBottom: 20 }}
                   placeholder='please verification code'/>
            <div className='get-code' onClick={this.getCode}>{this.state.codeHolder}</div>
          </div>
          <Button onClick={this.login}>LOG IN</Button>
        </div>
      </div>
    );
  }
}

export default Index;

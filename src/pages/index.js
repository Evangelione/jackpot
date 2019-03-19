import React, { Component } from 'react';
import { Input, Button, message } from 'antd';
import router from 'umi/router';
import styles from './index.less';

class Index extends Component {

  login = () => {
    router.push('/bigWheel');
    message.success('登录成功');
  };

  render() {
    return (
      <div className={styles['login-bg']}>
        <div className={styles['input-box']}>
          <Input addonBefore={<div style={{ width: 50, textAlign: 'left' }}>IMEI</div>} style={{ marginBottom: 20 }}
                 placeholder='please enter your IMEI code'/>
          <Input addonBefore={<div style={{ width: 50, textAlign: 'left' }}>Phone</div>} style={{ marginBottom: 20 }}
                 placeholder='please enter your phone number'/>
          <Input addonBefore={<div style={{ width: 50, textAlign: 'left' }}>Code</div>} style={{ marginBottom: 20 }}
                 placeholder='please verification code'/>
          <Button onClick={this.login}>LOG IN</Button>
        </div>
      </div>
    );
  }
}

export default Index;

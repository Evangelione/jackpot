import React, { Component } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';

class Index extends Component {
  render() {
    return (
      <div className={styles['container']}>
        <div className={styles['cash-box']}>
          <div className={styles['input-box']}>
            <div>Phone</div>
            <Input placeholder='please enter your phone number'/>
          </div>
          <div className={styles['input-box']}>
            <div>Redeem code</div>
            <Input placeholder='please enter your redeem code'/>
          </div>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Button type='primary' className={styles['btn']}>Confirm</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

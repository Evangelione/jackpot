import React, { Component } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';


class Index extends Component {
  state = {
    code: true,
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

  render() {
    return (
      <div className={styles['container']}>
        <div className={styles['cash-box']}>
          <div className={styles['cash-title']}>
            Congratulations on winning a
          </div>

          <div className={styles['prize-box']}>
            <img src={require('@/assets/images/vergil.jpg')} alt=""/>
          </div>
          <div className={styles['prize-detail']}>
            <div className='red-bold' style={{ marginBottom: 10, fontSize: 16 }}>vivo X23</div>
            <div style={{ fontWeight: 'bold' }}>[2019-05-12 18:23:34]</div>
          </div>

          {this.state.code ?
            <div className={styles['code-input']}>
              <div style={{ position: 'relative' }}>
                <Input placeholder='Enter verification code'/>
                <div className={styles['get-code']} onClick={this.getCode}>{this.state.codeHolder}</div>
              </div>
              <Button type='primary' className={styles['btn']} style={{ margin: '20px 0 10px' }}>Submit</Button>
            </div>
            : <div style={{ textAlign: 'center', margin: '15px 0' }}>
              <Button type='primary' className={styles['btn']}>Confirm</Button>
            </div>}


        </div>
      </div>
    );
  }
}

export default Index;

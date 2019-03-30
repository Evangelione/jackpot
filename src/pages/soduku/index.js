import React, { Component } from 'react';
import { Modal, Input, Button } from 'antd';

const order = [0, 1, 2, 4, 7, 6, 5, 3];

class Index extends Component {
  state = {
    visible: false,
    visible2: false,
  };

  timer = null;
  bReady = false;
  prizeList = [
    require('@/assets/images/vergil.jpg'),
    require('@/assets/images/vergil.jpg'),
    require('@/assets/images/vergil.jpg'),
    require('@/assets/images/vergil.jpg'),
    require('@/assets/images/go.png'),
    require('@/assets/images/vergil.jpg'),
    require('@/assets/images/vergil.jpg'),
    require('@/assets/images/vergil.jpg'),
    require('@/assets/images/vergil.jpg'),
  ];

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  };

  handleOk2 = (e) => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };

  handleCancel2 = (e) => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };

  submit = () => {
    this.handleCancel();
    this.showModal2();
  };

  lottery = (num) => {
    let container = document.getElementById('container'),
      li = container.getElementsByTagName('div');
    console.log(li);
    let i = 0, t = 60, round = 6, rNum = round * 8;
    const setFreq = () => {
      for (let j = 0; j < li.length; j++) {
        li[j].className = '';
      }
      let ord = order[i % li.length];
      li[ord].className = 'soduku-active';
      i++;
      if (i < rNum) {
        this.timer = setTimeout(setFreq, t);
      } else if (i >= rNum - 8 && i < rNum + num) {
        t += (i - rNum + 8) * 5;
        this.timer = setTimeout(setFreq, t);
      }
      if (i >= rNum + num) {
        let timer2 = null;
        timer2 = setTimeout(function() {
          clearTimeout(timer2);
        }, 1000);
        this.bReady = false;
        clearTimeout(this.timer);
      }
    };
    this.timer = setTimeout(setFreq, t);
  };

  aClick = () => {
    if (this.bReady) return false;
    this.bReady = true;
    let num = this.random(1, 9);
    this.lottery(num);
  };

  random = (n, m) => {
    return parseInt((m - n) * Math.random() + n);
  };

  render() {
    return (
      <div style={{ backgroundColor: '#69C3FF' }}>
        <div className='sudoku-container'>
          <div className='sudoku-title'>
            <img src={require('@/assets/images/kv.png')} alt=""/>
          </div>
          <div className='sudoku'>
            <img src={require('@/assets/images/soduku_blue.png')} alt=""/>
            {/*<div className='sudoku-start'>*/}
            {/*<img src={require('@/assets/images/go.png')} onClick={this.showModal} alt=""/>*/}
            {/*</div>*/}
            <div className='sudoku-start-box' id='container'>
              {this.prizeList.map((value, index) => {
                if (index === 4) {
                  return <span style={{ backgroundColor: 'transparent', display: 'block' }} key={index}>
                    <img src={value} style={{ width: '100%', height: '100%' }}
                         onClick={this.aClick} alt=""/>
                  </span>;
                }
                return <div key={index}>
                  <img src={value} alt=""/>
                </div>;
              })}
            </div>
          </div>
          <img src={require('@/assets/images/zz.png')} className='sudoku-mask' alt=""/>
          <div className='detail'>
            <div className='bar'>
              You have <span>3</span> raffle chances
            </div>
          </div>
        </div>

        <div className='padding-container'>


          <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>Award-winning record</div>
            </div>
            <div className='bg-gray'>
              <div className='QR-code-box'>
                <div className='QR-code'>
                  <img src={require('@/assets/images/er.png')} alt=""/>
                </div>
                <div className='QR-detail'>
                  <div>Prize: <span className='red'>vivo X23</span></div>
                  <div>Redeem code: <span className='red-bold'>876524</span></div>
                  <div>[2019-05-12 18:23:34]</div>
                </div>
              </div>
              <div className='QR-desc'>
                In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,
                accumsan porta turpis. Pellentesque
              </div>
            </div>

            <div className='bg-gray'>
              <div className='QR-code-box'>
                <div className='QR-code'>
                  <img src={require('@/assets/images/er.png')} alt=""/>
                </div>
                <div className='QR-detail'>
                  <div>Prize: <span className='red'>vivo X23</span></div>
                  <div>Redeem code: <span className='red-bold'>876524</span></div>
                  <div>[2019-05-12 18:23:34]</div>
                </div>
              </div>
              <div className='QR-desc'>
                In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,
                accumsan porta turpis. Pellentesque
              </div>
            </div>

            <div className='bg-gray'>
              <div className='QR-code-box'>
                <div className='QR-code'>
                  <img src={require('@/assets/images/er.png')} alt=""/>
                </div>
                <div className='QR-detail'>
                  <div>Prize: <span className='red'>vivo X23</span></div>
                  <div>Redeem code: <span className='red-bold'>876524</span></div>
                  <div>[2019-05-12 18:23:34]</div>
                </div>
              </div>
              <div className='QR-desc'>
                In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,
                accumsan porta turpis. Pellentesque
              </div>
            </div>

            <div className='bg-gray'>
              <div className='QR-code-box'>
                <div className='QR-code'>
                  <img src={require('@/assets/images/er.png')} alt=""/>
                </div>
                <div className='QR-detail'>
                  <div>Prize: <span className='red'>vivo X23</span></div>
                  <div>Redeem code: <span className='red-bold'>876524</span></div>
                  <div>[2019-05-12 18:23:34]</div>
                </div>
              </div>
              <div className='QR-desc'>
                In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,
                accumsan porta turpis. Pellentesque
              </div>
            </div>
          </div>


          <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>The prize list</div>
            </div>
            <div className='prize-list'>
              <div className='prize'>
                <div>
                  <img src={require('@/assets/images/vergil.jpg')} alt=""/>
                </div>
                <div>
                  <div>First Prize</div>
                  <div>Vergil</div>
                  <div>Quantity: 100</div>
                </div>
              </div>
              <div className='prize'>
                <div>
                  <img src={require('@/assets/images/vergil.jpg')} alt=""/>
                </div>
                <div>
                  <div>First Prize</div>
                  <div>Vergil</div>
                  <div>Quantity: 100</div>
                </div>
              </div>
              <div className='prize'>
                <div>
                  <img src={require('@/assets/images/vergil.jpg')} alt=""/>
                </div>
                <div>
                  <div>First Prize</div>
                  <div>Vergil</div>
                  <div>Quantity: 100</div>
                </div>
              </div>
            </div>
          </div>

          <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>Event description</div>
            </div>
            <div className='bg-gray'>
              Vestibulum pharetra dui ut erat venenatis, in vulputate mi varius. Integer sed sollicitudin felis. Morbi
              mauris sem, pellentesque sit amet eleifend sed, egestas ac est. Phasellus non dolor vitae
            </div>
          </div>

          <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>The latest winners list</div>
            </div>
            <div className='bg-gray' style={{ padding: '6px 2px' }}>
              <div className='winners-item'>
                <div className='name'>Richard ****</div>
                <div className='code'>751360 ****</div>
                <div className='prize'>vivo X23</div>
                <div className='time'>2019-05-12</div>
              </div>
              <div className='winners-item'>
                <div className='name'>Richard ****</div>
                <div className='code'>751360 ****</div>
                <div className='prize'>vivo X23</div>
                <div className='time'>2019-05-12</div>
              </div>
              <div className='winners-item'>
                <div className='name'>Richard ****</div>
                <div className='code'>751360 ****</div>
                <div className='prize'>vivo X23</div>
                <div className='time'>2019-05-12</div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          closable={false}
          footer={null}
          maskClosable={false}
          style={{ top: '10%' }}
        >
          <div className='blue-bold' style={{ fontSize: 26, textAlign: 'center', marginBottom: 15 }}>You are the
            winner
          </div>
          <div style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 5,
            color: '#000',
          }}>Congratulations on
            winning a <span className='red-bold'>vivo X23</span></div>
          <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, color: '#000' }}>Redeem Code <span
            className='red-bold'>876524</span></div>

          <div className='gray-box'>
            <img src={require('@/assets/images/vergil.jpg')} alt=""/>
          </div>

          <div style={{ padding: '0 8%', textAlign: 'center' }}>
            <Input style={{ margin: '10px 0', height: 40, border: 'none', backgroundColor: '#f5f5f5' }}
                   placeholder='Please enter your name'/>
            <Input style={{ height: 40, border: 'none', backgroundColor: '#f5f5f5' }}
                   placeholder='Please enter your detailed address'/>
            <Button type='primary' style={{
              width: 135,
              height: 45,
              fontSize: 18,
              marginTop: 25,
              backgroundColor: '#028BD7',
            }} onClick={this.submit}>Submit</Button>
          </div>

        </Modal>

        <Modal
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
          closable={false}
          footer={null}
          maskClosable={false}
          style={{ top: '28%' }}
        >
          <div style={{
            fontSize: 22,
            textAlign: 'center',
            marginBottom: 15,
            color: '#000',
            fontWeight: 600,
            lineHeight: 1.2,
          }}>
            We have sent a verification message to your phone
          </div>
          <div style={{ padding: '0 8%', textAlign: 'center' }}>
            <Input style={{ margin: '10px 0', height: 40, border: 'none', backgroundColor: '#f5f5f5' }}
                   placeholder='Please enter the verification code'/>
            <Button type='primary' style={{
              width: 135,
              height: 45,
              fontSize: 18,
              marginTop: 15,
              backgroundColor: '#028BD7',
            }} onClick={this.handleCancel2}>Confirm</Button>
          </div>

        </Modal>
      </div>
    );
  }
}

export default Index;
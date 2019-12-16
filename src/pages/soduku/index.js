import React, { Component } from 'react';
import { Modal, Input, Button, Select, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

const Option = Select.Option;
const order = [0, 1, 2, 4, 7, 6, 5, 3];
const He = window.screen.width * .88

// 0 1 2
// 3   4
// 5 6 7

@connect(({ global }) => ({
  global,
}))
class Index extends Component {
  state = {
    visible: false,
    visible2: false,
    level1: undefined,
    level2: undefined,
    level3: undefined,
    single: false,
    name: '',
    address: '',
    pinCode: '',
    prizeList: [],
    prizeList22: [],
  };

  timer = null;
  bReady = false;

  findThank = () => {
    console.log(this.state.prizeList22);
    let len;
    do {
      len = Math.floor((Math.random() * this.state.prizeList22.length));
      console.log(len);
    }
    while (this.state.prizeList22[len].name !== 'Thank you for enjoy!');
    {
      console.log(this.state.prizeList22[len].name);
      return len;
    }
  };


  componentDidMount() {
    const { activityId } = this.props.location.query;
    this.props.dispatch({
      type: 'global/fetchPrizeList',
      payload: {
        id: activityId,
      },
    }).then(() => {
      const arr = this.props.global.prizeList;
      for (let x = arr.length; x < 8; x++) {
        arr.push({ name: 'Thank you for enjoy!', image: require('@/assets/images/tky.png') });
      }
      const arr2 = arr.sort(function () {
        return 0.5 - Math.random();
      });
      this.setState({
        prizeList22: arr2,
      });
      arr2.splice(4, 0, {
        name: 'go',
        image: require('@/assets/images/go.png'),
        id: 'cache',
      });
      this.setState({
        prizeList: arr2,
      });
    });
    this.props.dispatch({
      type: 'global/fetchPageDetail',
      payload: {
        token: localStorage.getItem('token'),
        activityId,
      },
    }).then(() => {
      this.props.dispatch({
        type: 'global/fetchAddress',
        payload: {
          id: activityId,
          imei: localStorage.getItem('imei'),
          phone: localStorage.getItem('phone'),
        },
      }).then(() => {
        const { pageDetail } = this.props.global;
        if (!this.props.global.userAddress) {
          this.setState({
            level1: undefined,
            level2: undefined,
            level3: undefined,
            name: '',
            address: '',
            pinCode: '',
          });
          pageDetail.records && pageDetail.records.length !== 0 && this.showModal('single');
        } else {
          if (!this.props.global.userAddress.address) {
            this.setState({
              level1: undefined,
              level2: undefined,
              level3: undefined,
              name: '',
              address: '',
              pinCode: '',
            });
            return false;
          }
          this.setState({
            level1: this.props.global.userAddress.address.split('-')[0],
            level2: this.props.global.userAddress.address.split('-')[1],
            level3: this.props.global.userAddress.address.split('-')[2],
            address: this.props.global.userAddress.address.split('-')[3],
            name: this.props.global.userAddress.name,
            pinCode: this.props.global.userAddress.pinCode,
          });
        }
      });
    });
    this.props.dispatch({
      type: 'global/fetchCascader',
      payload: {
        level: 1,
        name: '',
      },
    });
  }

  showModal = (single) => {
    this.setState({
      visible: true,
    });
    if (single === 'single') {
      this.setState({
        single: true,
      });
    }
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
    if (!this.state.name || !this.state.address || !this.state.level1 || !this.state.level2 || !this.state.level3 || !this.state.pinCode) {
      message.error('请填写完整信息');
      return false;
    }
    if (this.state.pinCode.length < 6) {
      message.error('PIN Code needs to be 6 digits number');
      return false;
    }
    let cacheId = '';
    if (this.state.single) {
      cacheId = this.props.global.pageDetail.records[0].id;
    } else {
      cacheId = this.props.global.lotteryData.hasPrize.id;
    }
    this.props.dispatch({
      type: 'global/postUserData',
      payload: {
        name: this.state.name,
        address: this.state.level1 + '-' + this.state.level2 + '-' + this.state.level3 + '-' + this.state.address,
        id: cacheId,
        pinCode: this.state.pinCode,
      },
    }).then(() => {
      this.handleCancel();
      const { activityId } = this.props.location.query;
      this.props.dispatch({
        type: 'global/fetchPageDetail',
        payload: {
          token: localStorage.getItem('token'),
          activityId,
        },
      });
      this.props.dispatch({
        type: 'global/fetchAddress',
        payload: {
          id: activityId,
          imei: localStorage.getItem('imei'),
          phone: localStorage.getItem('phone'),
        },
      });
    });
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
        timer2 = setTimeout(function () {
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
    const { activityId } = this.props.location.query;
    this.props.dispatch({
      type: 'global/lottery',
      payload: {
        activityId,
        token: localStorage.getItem('token'),
      },
    }).then(() => {
      // const order = [0, 1, 2, 4, 7, 6, 5, 3];
      if (this.props.global.lotteryData.prize && this.props.global.lotteryData.prize.id) {
        // 中奖判断
        console.log(this.state.prizeList); // 9个元素
        let prizeIndex = this.state.prizeList.findIndex((item) => {
          return item.id === this.props.global.lotteryData.prize.id;
        });
        if (prizeIndex > 4) {
          prizeIndex--;
        }
        let resultNum = order.findIndex((item) => {
          return item === prizeIndex;
        });
        // console.log('prizeINdex ' + prizeIndex);

        // let resultNum = order[prizeIndex];
        this.lottery(resultNum + 1);
        console.log('中奖了   是第' + (resultNum - 0 + 1) + '个');
        this.props.dispatch({
          type: 'global/fetchPageDetail',
          payload: {
            token: localStorage.getItem('token'),
            activityId,
          },
        });
        this.props.dispatch({
          type: 'global/fetchAddress',
          payload: {
            id: activityId,
            imei: localStorage.getItem('imei'),
            phone: localStorage.getItem('phone'),
          },
        });
      } else if (this.props.global.lotteryData.prize === null) {
        let prizeIndex = this.findThank();
        console.log(prizeIndex)
        if (prizeIndex > 4) {
          prizeIndex--;
        }
        console.log('prizeINdex ' + prizeIndex);
        let resultNum = order.findIndex((item) => {
          return item === prizeIndex;
        });
        this.lottery(resultNum + 1);
        console.log('没中奖   是第' + (resultNum - 0 + 1) + '个');
      } else {
        message.error(this.props.global.lotteryData);
      }
      this.props.dispatch({
        type: 'global/fetchPageDetail',
        payload: {
          token: localStorage.getItem('token'),
          activityId,
        },
      }).then(() => {
        if (this.props.global.luckyTimes - 0 === 0) {
          if (this.props.global.lotteryData.prize && this.props.global.lotteryData.prize.id) {
            const { pageDetail } = this.props.global;
            if (!this.props.global.userAddress) {
              this.setState({
                level1: undefined,
                level2: undefined,
                level3: undefined,
                name: '',
                address: '',
                pinCode: '',
              });
              pageDetail.records && pageDetail.records.length !== 0 && setTimeout(() => {
                this.showModal('single');
              }, 4000);
            }
          } else {
            const { pageDetail } = this.props.global;
            console.log(pageDetail)
            if (!this.props.global.userAddress) {
              this.setState({
                level1: undefined,
                level2: undefined,
                level3: undefined,
                name: '',
                address: '',
                pinCode: '',
              });
              pageDetail.records && pageDetail.records.length !== 0 && setTimeout(() => {
                this.showModal('single');
              });
            }
          }
        }
      })
    });
  };

  random = (n, m) => {
    return parseInt((m - n) * Math.random() + n);
  };

  mapRecordsList = () => {
    return this.props.global.pageDetail.records && this.props.global.pageDetail.records.map((value, index) => {
      return <div className='bg-gray' key={index}>
        <div className='QR-code-box'>
          <div className='QR-code'>
            <img src={value.prize.image} alt="" style={{ minWidth: 80, minHeight: 80, width: '100%' }} />
          </div>
          <div className='QR-detail'>
            <div>Prize: <span className='red'>{value.prize.name}</span></div>
            <div>Redeem code: <span className='red-bold'>{value.awardCode}</span></div>
            <div>[{moment(value.createtime).format('YYYY-MM-DD HH:mm:ss')}]</div>
          </div>
        </div>
        <div className='QR-desc'>
          {value.prize.description}
        </div>
      </div>;
    });
  };

  mapPrizeList = () => {
    return this.props.global.pageDetail.prizes && this.props.global.pageDetail.prizes.map((value, index) => {
      return <div className='prize' key={index}>
        <div>
          <div style={{
            background: `url(${value.image}) no-repeat center center`,
            backgroundSize: 'cover',
            height: (He - 102) / 3,
          }} />
        </div>
        <div>
          <div>{value.title}</div>
          <div>{value.name}</div>
          <div>{value.amount}</div>
        </div>
      </div>;
    });
  };

  mapUsersList = () => {
    return this.props.global.pageDetail.users && this.props.global.pageDetail.users.map((value, index) => {
      return <div className='winners-item' key={index}>
        <div className='name'>{value.name || '****'}</div>
        <div className='code'>{value.phone.substr(0, 6) + ' ****'}</div>
        <div className='prize'>{value.prize.name}</div>
        <div className='time'>{value.createtime.substr(0, 10)}</div>
      </div>;
    });
  };

  changeField = (field, e) => {
    if (field === 'pinCode') {
      if (e.target.value.length > 6) {
        return false;
      }
    }
    this.setState({
      [field]: e.target.value,
    });
  };

  selectAddress = (level, name) => {
    this.props.dispatch({
      type: 'global/fetchCascader',
      payload: {
        level,
        name,
      },
    });
    this.setState({
      [`level${level - 1}`]: name,
    });
  };

  mapAddressItem = (arr) => {
    return arr.map((item, index) => {
      return <Option value={item.value} key={index}>{item.label}</Option>;
    });
  };

  render() {
    const { pageDetail } = this.props.global;
    const { luckyTimes } = this.props.global;
    const { name, address, pinCode } = this.state;
    return (
      <div style={{ backgroundColor: '#69C3FF' }}>
        <div className='sudoku-container'>
          <div className='sudoku-title'>
            <img src={require('@/assets/images/kv.png')} alt="" />
          </div>
          <div className='sudoku'>
            <img src={require('@/assets/images/soduku_blue.png')} alt="" />
            {/*<div className='sudoku-start'>*/}
            {/*<img src={require('@/assets/images/go.png')} onClick={this.showModal} alt=""/>*/}
            {/*</div>*/}
            <div className='sudoku-start-box' id='container'>
              {this.state.prizeList.map((value, index) => {
                if (index === 4) {
                  return <span style={{ backgroundColor: 'transparent', display: 'block' }} key={index}>
                    <img src={value.image} style={{ width: '100%', height: '100%' }}
                      onClick={this.aClick} alt="" />
                  </span>;
                }
                return <div key={index}>
                  <img src={value.image} alt="" />
                </div>;
              })}
            </div>
          </div>
          <img src={require('@/assets/images/zz.png')} className='sudoku-mask' alt="" />
          <div className='detail'>
            <div className='bar'>
              You have <span>{luckyTimes || 0}</span> raffle chances
            </div>
          </div>
        </div>

        <div className='padding-container'>


          {pageDetail.records && pageDetail.records.length ? <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>Award-winning record</div>
            </div>
            {pageDetail.records && pageDetail.records.length !== 0 ?
              <Button onClick={this.showModal.bind(null, 'single')}
                style={{ borderColor: '#028BD7', color: '#028BD7', marginBottom: 15 }}>contact
                details</Button> : null}
            {this.mapRecordsList()}
          </div> : null}


          {this.props.global.pageDetail.prizes ? <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>The prize list</div>
            </div>
            <div className='prize-list'>
              {this.mapPrizeList()}
            </div>
          </div> : null}


          {pageDetail.description ? <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>Event description</div>
            </div>
            <div className='bg-gray'>
              {pageDetail.description}
            </div>
          </div> : null}

          {pageDetail.users ? <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>The latest winners list</div>
            </div>
            <div className='bg-gray' style={{ padding: '6px 2px' }}>
              {this.mapUsersList()}
            </div>
          </div> : null}
        </div>

        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
          destroyOnClose={true}
          style={{ top: '10%' }}
        >
          <div className='blue-bold' style={{ fontSize: 26, textAlign: 'center', marginBottom: 15 }}>You are the
            winner
          </div>
          <div style={{ padding: '0 8%', textAlign: 'center' }} id='selectCustom'>
            <Input style={{ margin: '10px 0', border: 'none', backgroundColor: '#f5f5f5' }}
              placeholder='Please enter your name' value={name} onChange={this.changeField.bind(null, 'name')} />
            <Select value={this.state.level1} style={{
              width: '100%',
              border: 'none',
              backgroundColor: '#f5f5f5',
              borderRadius: 4,
              color: '#000',
              marginBottom: 10,
            }} onChange={this.selectAddress.bind(null, 2)} placeholder='Select State'>
              {this.mapAddressItem(this.props.global.level1)}
            </Select>
            <Select value={this.state.level2} style={{
              width: '100%',
              border: 'none',
              backgroundColor: '#f5f5f5',
              borderRadius: 4,
              color: '#000',
              marginBottom: 10,
            }} onChange={this.selectAddress.bind(null, 3)} placeholder='Select District'>
              {this.mapAddressItem(this.props.global.level2)}
            </Select>
            <Select value={this.state.level3} style={{
              width: '100%',
              border: 'none',
              backgroundColor: '#f5f5f5',
              borderRadius: 4,
              color: '#000',
            }} onChange={this.selectAddress.bind(null, 4)} placeholder='Select CityTown'>
              {this.mapAddressItem(this.props.global.level3)}
            </Select>
            <Input style={{ margin: '10px 0', border: 'none', backgroundColor: '#f5f5f5' }}
              placeholder='Enter the detailed address' value={address}
              onChange={this.changeField.bind(null, 'address')} />
            <Input style={{ border: 'none', backgroundColor: '#f5f5f5' }}
              placeholder='Enter the PIN Code' value={pinCode}
              type="number"
              onChange={this.changeField.bind(null, 'pinCode')} onBlur={this.blurPinCode} />
            <Button type='primary' style={{
              width: 135,
              fontSize: 18,
              marginTop: 25,
              height: 40,
              backgroundColor: '#028BD7',
            }} onClick={this.submit}>Submit</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Index;

import React, { Component } from 'react';
import { Modal, Input, Button, message, Select } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

const Option = Select.Option;
const HEIGHT = window.screen.width;

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
    animate: 0,
    rotate: 0,
    prizeList: [],
    reset: false,
    name: '',
    address: '',
    pinCode: '',
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
      for (let x = arr.length; x < 6; x++) {
        arr.push({ name: '谢谢参与' });
      }
      const arr2 = arr.sort(function() {
        return 0.5 - Math.random();
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

  startWheel = () => {
    if (this.props.loading || this.state.animate) return false;
    this.setState({
      animate: 1,
      reset: true,
      rotate: 0,
    }, () => {
      const { activityId } = this.props.location.query;
      this.props.dispatch({
        type: 'global/lottery',
        payload: {
          activityId,
          token: localStorage.getItem('token'),
        },
      }).then(() => {
        if (this.props.global.lotteryData.prize && this.props.global.lotteryData.prize.id) {
          // 中奖判断
          let prizeIndex = this.state.prizeList.findIndex((item) => {
            return item.id === this.props.global.lotteryData.prize.id;
          });
          console.log(prizeIndex);
          this.setState({
            animate: 0,
            reset: false,
            rotate: 4 * 360 + (60 * prizeIndex),
          });
        } else if (this.props.global.lotteryData.prize === null) {
          this.setState({
            animate: 0,
            reset: false,
            rotate: Math.random() * 5 * 360,
          });
        } else {
          message.error(this.props.global.lotteryData);
          this.setState({
            animate: 0,
          });
        }
      });
    });
  };

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
      message.error('pinCode必须为6位');
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

  mapRoundPrizeList = () => {
    const clientWidth = document.body.clientWidth;
    return this.state.prizeList.map((item, index) => {
      return <div key={index}
                  style={{
                    position: 'absolute',
                    transform: `rotate(${index * 60}deg) translate(0px, -${0.25 * clientWidth}px)`,
                  }}>
        <img src={item.image} style={{ width: `${0.2 * clientWidth}px` }} alt=""/>
        <div style={{ textAlign: 'center' }}>{item.name}</div>
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
            height: HEIGHT / 3,
          }}/>
        </div>
        <div>
          <div>{value.title}</div>
          <div>{value.name}</div>
          <div>{value.amount}</div>
        </div>
      </div>;
    });
  };


  mapRecordsList = () => {
    return this.props.global.pageDetail.records && this.props.global.pageDetail.records.map((value, index) => {
      return <div className='bg-gray' key={index}>
        <div className='QR-code-box'>
          <div className='QR-code'>
            <img src={value.prize.image} alt="" style={{ minWidth: 80, minHeight: 80, width: '100%' }}/>
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
    const { rotate } = this.state;
    const { luckyTimes } = this.props.global;
    const { name, address, pinCode } = this.state;
    return (
      <div>
        <div className='wheel-container'>
          <div className='title'>
            <img src={require('@/assets/images/title.png')} alt=""/>
          </div>
          <div className='bigWheel'>
            <img src={require('@/assets/images/big wheel 6.png')} alt=""/>
            <div className='wheel-start'>
              <img src={require('@/assets/images/icon_start.png')}
                   style={{
                     transition: this.state.reset ? '' : 'all 3s',
                     transform: `rotate(${rotate}deg)`,
                     transformOrigin: '50% 60%',
                   }}
                   onClick={this.startWheel} alt=""/>
            </div>
            {this.mapRoundPrizeList()}
          </div>
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
                   placeholder='Please enter your name' value={name} onChange={this.changeField.bind(null, 'name')}/>
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
                   onChange={this.changeField.bind(null, 'address')}/>
            <Input style={{ border: 'none', backgroundColor: '#f5f5f5' }}
                   placeholder='Enter the PIN Code' value={pinCode}
                   onChange={this.changeField.bind(null, 'pinCode')} onBlur={this.blurPinCode}/>
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

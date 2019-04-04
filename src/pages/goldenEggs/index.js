import React, { Component } from 'react';
import { Modal, Input, Button, message, Select } from 'antd';
import { Motion, spring, presets } from 'react-motion';
import { connect } from 'dva';
import moment from 'moment';

const Option = Select.Option;
const HEIGHT = window.screen.width;

@connect(({ global, goldenEggs, loading }) => ({
  global,
  goldenEggs,
  loading: loading.models.global,
}))
class Index extends Component {
  state = {
    visible: false,
    visible2: false,
    level1: undefined,
    level2: undefined,
    level3: undefined,
    eggs: [{
      image: require('@/assets/images/egg frenzy.png'),
      thanks: require('@/assets/images/gd_thanks.png'),
      dTop: '-47px',
      dLeft: 90,
      top: -100,
      left: 240,
      rotate: 0,
      eggRotate: 0,
    }, {
      image: require('@/assets/images/egg frenzy.png'),
      thanks: require('@/assets/images/gd_thanks.png'),
      dTop: '-48px',
      dLeft: 79,
      top: -100,
      left: 240,
      rotate: 0,
      eggRotate: 0,
    }, {
      image: require('@/assets/images/egg frenzy.png'),
      thanks: require('@/assets/images/gd_thanks.png'),
      dTop: 10,
      dLeft: '-110px',
      top: -100,
      left: 240,
      rotate: 0,
      eggRotate: 0,
    }, {
      image: require('@/assets/images/egg frenzy.png'),
      thanks: require('@/assets/images/gd_thanks.png'),
      dTop: 16,
      dLeft: '-121px',
      top: -100,
      left: 240,
      rotate: 0,
      eggRotate: 0,
    }, {
      image: require('@/assets/images/egg frenzy.png'),
      thanks: require('@/assets/images/gd_thanks.png'),
      dTop: '-80px',
      dLeft: 197,
      top: -100,
      left: 240,
      rotate: 0,
      eggRotate: 0,
    }],
    hammerShow: true,
    name: '',
    address: '',
    pinCode: '',
  };

  componentDidMount() {
    const { activityId } = this.props.location.query;
    this.props.dispatch({
      type: 'goldenEggs/fetchPageDetail',
      payload: {
        token: localStorage.getItem('token'),
        activityId,
      },
    });
    this.props.dispatch({
      type: 'global/fetchCascader',
      payload: {
        level: 1,
        name: '',
      },
    });
  }

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
    if (!this.state.name || !this.state.address || !this.state.level1 || !this.state.level2 || !this.state.level3 || !this.state.pinCode) {
      message.error('请填写完整信息');
      return false;
    }
    this.props.dispatch({
      type: 'global/postUserData',
      payload: {
        name: this.state.name,
        address: this.state.level1 + '-' + this.state.level2 + '-' + this.state.level3 + '-' + this.state.address,
        id: this.props.global.lotteryData.hasPrize.id,
        pinCode: this.state.pinCode,
      },
    }).then(() => {
      this.handleCancel();
      // this.showModal2();
      const { activityId } = this.props.location.query;
      this.props.dispatch({
        type: 'goldenEggs/fetchPageDetail',
        payload: {
          token: localStorage.getItem('token'),
          activityId,
        },
      });
      // this.setState({
      //   eggs: [{
      //     image: require('@/assets/images/egg frenzy.png'),
      //     thanks: require('@/assets/images/gd_thanks.png'),
      //     dTop: '-47px',
      //     dLeft: 90,
      //     top: -100,
      //     left: 240,
      //     rotate: 0,
      //     eggRotate: 0,
      //   }, {
      //     image: require('@/assets/images/egg frenzy.png'),
      //     thanks: require('@/assets/images/gd_thanks.png'),
      //     dTop: '-48px',
      //     dLeft: 79,
      //     top: -100,
      //     left: 240,
      //     rotate: 0,
      //     eggRotate: 0,
      //   }, {
      //     image: require('@/assets/images/egg frenzy.png'),
      //     thanks: require('@/assets/images/gd_thanks.png'),
      //     dTop: 10,
      //     dLeft: '-110px',
      //     top: -100,
      //     left: 240,
      //     rotate: 0,
      //     eggRotate: 0,
      //   }, {
      //     image: require('@/assets/images/egg frenzy.png'),
      //     thanks: require('@/assets/images/gd_thanks.png'),
      //     dTop: 16,
      //     dLeft: '-121px',
      //     top: -100,
      //     left: 240,
      //     rotate: 0,
      //     eggRotate: 0,
      //   }, {
      //     image: require('@/assets/images/egg frenzy.png'),
      //     thanks: require('@/assets/images/gd_thanks.png'),
      //     dTop: '-80px',
      //     dLeft: 197,
      //     top: -100,
      //     left: 240,
      //     rotate: 0,
      //     eggRotate: 0,
      //   }],
      // });
    });
  };

  beatEgg = (index) => {
    let eggs = this.state.eggs;
    let egg = eggs[index];
    if (this.props.loading || (this.props.global.luckyTimes - 0 === 0) || egg.top !== -100 || !this.state.hammerShow) return false;
    const { activityId } = this.props.location.query;
    this.props.dispatch({
      type: 'global/lottery',
      payload: {
        activityId,
        token: localStorage.getItem('token'),
      },
    }).then(() => {
      if (this.props.global.lotteryData.prize && this.props.global.lotteryData.prize.id) {
        egg.thanks = this.props.global.lotteryData.prize.image;
      }
      egg.top = -40;
      egg.left = 70;
      this.setState({
        eggs: eggs,
        hammerShow: false,
      });
      setTimeout(() => {
        egg.top = -20;
        egg.left = 40;
        egg.rotate = -30;
        this.setState({
          eggs: eggs,
        });
      }, 500);
      setTimeout(() => {
        egg.top = -30;
        egg.left = 60;
        egg.rotate = 10;
        this.setState({
          eggs: eggs,
        });
      }, 800);
      setTimeout(() => {
        egg.eggRotate = 8;
        this.setState({
          eggs: eggs,
        });
      }, 1000);
      setTimeout(() => {
        egg.eggRotate = -8;
        this.setState({
          eggs: eggs,
        });
      }, 1200);
      setTimeout(() => {
        egg.eggRotate = 0;
        this.setState({
          eggs: eggs,
        });
      }, 1300);
      setTimeout(() => {
        egg.image = require('@/assets/images/egg frenzy broken.png');
        this.setState({
          eggs: eggs,
        });
      }, 1700);
      setTimeout(() => {
        this.setState({
          hammerShow: true,
        });
      }, 1900);
      setTimeout(() => {
        if (this.props.global.luckyTimes - 0 === 0) {
          if (this.props.global.lotteryData.hasPrize && this.props.global.lotteryData.hasPrize.id) {
            this.showModal();
          }
        }
        const { activityId } = this.props.location.query;
        this.props.dispatch({
          type: 'goldenEggs/fetchPageDetail',
          payload: {
            token: localStorage.getItem('token'),
            activityId,
          },
        });
        // this.props.global.lotteryData
      }, 2100);
    });
  };

  mapEggs = () => {
    return this.state.eggs.map(((value, index) => {
      return <Motion key={index} style={{
        top: spring(value.top),
        left: spring(value.left),
        rotate: spring(value.rotate, presets.wobbly),
        eggRotate: spring(value.eggRotate, presets.wobbly),
      }}>
        {interpolatingStyle => {
          return (
            <div style={{
              position: 'relative',
              width: '25%',
              display: 'inline-block',
              top: value.dTop,
              left: value.dLeft,
            }}>
              <img src={value.image} onClick={this.beatEgg.bind(null, index)}
                   style={{ transform: `rotate(${interpolatingStyle.eggRotate}deg)`, transformOrigin: 'center bottom' }}
                   alt=""/>
              <img src={require('@/assets/images/hammer.png')} alt=""
                   style={{
                     position: 'absolute',
                     top: interpolatingStyle.top,
                     left: interpolatingStyle.left,
                     transform: `rotate(${interpolatingStyle.rotate}deg)`,
                     display: (interpolatingStyle.top === -30 || interpolatingStyle.top === -100) ? 'none' : 'block',
                     zIndex: 999,
                     width: 65,
                     height: 82,
                   }}/>
              <img src={require('@/assets/images/sahua.png')}
                   style={{
                     position: 'absolute',
                     top: '-25px',
                     left: '-4px',
                     width: '130%',
                     height: '143%',
                     display: interpolatingStyle.top !== -30 ? 'none' : 'block',
                   }} alt=""/>
              <img src={value.thanks}
                   style={{
                     position: 'absolute',
                     top: '-12px',
                     left: '17px',
                     width: 50,
                     height: 50,
                     display: interpolatingStyle.top !== -30 ? 'none' : 'block',
                   }} alt=""/>
              <div style={{ clear: 'both' }}/>
            </div>
          );
        }}
      </Motion>;
    }));

  };

  mapPrizeList = () => {
    return this.props.goldenEggs.pageDetail.prizes && this.props.goldenEggs.pageDetail.prizes.map((value, index) => {
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

  mapUsersList = () => {
    return this.props.goldenEggs.pageDetail.users && this.props.goldenEggs.pageDetail.users.map((value, index) => {
      return <div className='winners-item' key={index}>
        <div className='name'>{value.name || '****'}</div>
        <div className='code'>{value.phone.substr(0, 6) + ' ****'}</div>
        <div className='prize'>{value.prize.name}</div>
        <div className='time'>{value.createtime.substr(0, 10)}</div>
      </div>;
    });
  };

  mapRecordsList = () => {
    return this.props.goldenEggs.pageDetail.records && this.props.goldenEggs.pageDetail.records.map((value, index) => {
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

  changeField = (field, e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    this.props.dispatch({
      type: 'global/fetchCascader',
      payload: {
        targetOption,
      },
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
    const { pageDetail } = this.props.goldenEggs;
    const { lotteryData, luckyTimes } = this.props.global;
    const { name, address, pinCode } = this.state;
    console.log(lotteryData);
    return (
      <div className='golden-bg'>
        <div className='egg-container'>
          <div className='title'>
            <img src={require('@/assets/images/ps.png')} alt=""/>
          </div>
          <div className='egg-stage'>
            <img src={require('@/assets/images/stage.png')} alt=""/>
            <div className='eggs'>
              {this.mapEggs()}
            </div>
            <div className='hammer' style={{ display: this.state.hammerShow ? 'block' : 'none' }}>
              <img src={require('@/assets/images/hammer.png')} alt=""/>
            </div>
          </div>
          <div className='detail'>
            <div className='bar'>
              You have <span>{luckyTimes}</span> raffle chances
            </div>
          </div>
        </div>

        <div className='padding-container'>

          {pageDetail.records && pageDetail.records.length ? <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>Award-winning record</div>
            </div>
            {this.mapRecordsList()}
            {/*<div className='bg-gray'>*/}
            {/*<div className='QR-code-box'>*/}
            {/*<div className='QR-code'>*/}
            {/*<img src={require('@/assets/images/er.png')} alt=""/>*/}
            {/*</div>*/}
            {/*<div className='QR-detail'>*/}
            {/*<div>Prize: <span className='red'>vivo X23</span></div>*/}
            {/*<div>Redeem code: <span className='red-bold'>876524</span></div>*/}
            {/*<div>[2019-05-12 18:23:34]</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<div className='QR-desc'>*/}
            {/*In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,*/}
            {/*accumsan porta turpis. Pellentesque*/}
            {/*</div>*/}
            {/*</div>*/}

            {/*<div className='bg-gray'>*/}
            {/*<div className='QR-code-box'>*/}
            {/*<div className='QR-code'>*/}
            {/*<img src={require('@/assets/images/er.png')} alt=""/>*/}
            {/*</div>*/}
            {/*<div className='QR-detail'>*/}
            {/*<div>Prize: <span className='red'>vivo X23</span></div>*/}
            {/*<div>Redeem code: <span className='red-bold'>876524</span></div>*/}
            {/*<div>[2019-05-12 18:23:34]</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<div className='QR-desc'>*/}
            {/*In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,*/}
            {/*accumsan porta turpis. Pellentesque*/}
            {/*</div>*/}
            {/*</div>*/}

            {/*<div className='bg-gray'>*/}
            {/*<div className='QR-code-box'>*/}
            {/*<div className='QR-code'>*/}
            {/*<img src={require('@/assets/images/er.png')} alt=""/>*/}
            {/*</div>*/}
            {/*<div className='QR-detail'>*/}
            {/*<div>Prize: <span className='red'>vivo X23</span></div>*/}
            {/*<div>Redeem code: <span className='red-bold'>876524</span></div>*/}
            {/*<div>[2019-05-12 18:23:34]</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<div className='QR-desc'>*/}
            {/*In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,*/}
            {/*accumsan porta turpis. Pellentesque*/}
            {/*</div>*/}
            {/*</div>*/}

            {/*<div className='bg-gray'>*/}
            {/*<div className='QR-code-box'>*/}
            {/*<div className='QR-code'>*/}
            {/*<img src={require('@/assets/images/er.png')} alt=""/>*/}
            {/*</div>*/}
            {/*<div className='QR-detail'>*/}
            {/*<div>Prize: <span className='red'>vivo X23</span></div>*/}
            {/*<div>Redeem code: <span className='red-bold'>876524</span></div>*/}
            {/*<div>[2019-05-12 18:23:34]</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*<div className='QR-desc'>*/}
            {/*In sit amet condimentum felis, quis finibus sapien. Nunc felis nisi, pellentesque accumsan diam ut,*/}
            {/*accumsan porta turpis. Pellentesque*/}
            {/*</div>*/}
            {/*</div>*/}
          </div> : null}

          <div className='card-container'>
            <div className='car-title'>
              <div className='bar'>The prize list</div>
            </div>
            <div className='prize-list'>
              {this.mapPrizeList()}
              {/*<div className='prize'>*/}
              {/*<div>*/}
              {/*<img src={require('@/assets/images/vergil.jpg')} alt=""/>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*<div>First Prize</div>*/}
              {/*<div>Vergil</div>*/}
              {/*<div>Quantity: 100</div>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*<div className='prize'>*/}
              {/*<div>*/}
              {/*<img src={require('@/assets/images/vergil.jpg')} alt=""/>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*<div>First Prize</div>*/}
              {/*<div>Vergil</div>*/}
              {/*<div>Quantity: 100</div>*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*<div className='prize'>*/}
              {/*<div>*/}
              {/*<img src={require('@/assets/images/vergil.jpg')} alt=""/>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*<div>First Prize</div>*/}
              {/*<div>Vergil</div>*/}
              {/*<div>Quantity: 100</div>*/}
              {/*</div>*/}
              {/*</div>*/}
            </div>
          </div>

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
          closable={false}
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
                   onChange={this.changeField.bind(null, 'pinCode')}/>
            <Button type='primary' style={{
              width: 135,
              fontSize: 18,
              marginTop: 25,
              height: 40,
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

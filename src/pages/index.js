import React, { Component } from 'react';
import { Input, Button, message, Select, Form, Modal } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { REGS } from '@/common/constant';

const Option = Select.Option;

@connect(({ global }) => ({
  global,
}))
@Form.create()
class Index extends Component {
  state = {
    codeHolder: 'Get Code',
    phone: '',
    code: '',
    imei: '',
    postStr: '+91',
    pattern: '^[1-9]{1}[0-9]{9}$',
    visible: false,
    ad: '',
    countDown: 5,
    timeout: false,
  };
  timer = null;
  sec = 60;

  componentDidMount() {
    if (!this.props.location.query.activityId) {
      message.error('路径没有activityId参数，无法识别活动');
      return false;
    }
    this.props
      .dispatch({
        type: 'global/fetchKV',
        payload: {
          id: this.props.location.query.activityId,
        },
      })
      .then(() => {
        this.setState({
          ad: localStorage.getItem('ad'),
        });
        this.showModal();
      });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
    let timer = setInterval(() => {
      if (this.state.countDown === 0) {
        clearInterval(timer);
        this.setState({
          timeout: true,
        });
        this.handleCancel();
        return false;
      }
      this.setState({
        countDown: this.state.countDown - 1,
      });
    }, 1000);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  login = () => {
    if (!this.props.location.query.activityId) {
      message.error('路径没有activityId参数，无法识别活动');
      return false;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'global/login',
          payload: {
            imei: values.imei,
            phone: this.state.postStr.substr(1) + values.phone,
            code: values.code,
            key: this.props.global.loginKey,
            activityId: this.props.location.query.activityId,
          },
        });
      }
    });
  };

  changeSelectStr = value => {
    this.setState({
      postStr: value,
    });
    this.getPattern(value);
  };

  IMeiBlur = e => {
    if (!this.props.location.query.activityId) {
      message.error('路径没有activityId参数，无法识别活动');
      return false;
    }
    if (e.target.value.length === 15) {
      this.props.dispatch({
        type: 'global/checkimei',
        payload: {
          imei: e.target.value,
          activityId: this.props.location.query.activityId,
        },
      });
    }
  };

  phoneBlur = e => {
    if (!this.props.location.query.activityId) {
      message.error('路径没有activityId参数，无法识别活动');
      return false;
    }
    if (this.props.form.getFieldValue('imei')) {
      this.props.dispatch({
        type: 'global/checkimeiAndPhone',
        payload: {
          imei: this.props.form.getFieldValue('imei'),
          phone: this.state.postStr.substr(1) + e.target.value,
          activityId: this.props.location.query.activityId,
        },
      });
    }
  };

  getCode = () => {
    if (!this.props.location.query.activityId) {
      message.error('路径没有activityId参数，无法识别活动');
      return false;
    }
    if (this.props.form.getFieldValue('imei').length === 15) {
      this.props
        .dispatch({
          type: 'global/checkimei',
          payload: {
            imei: this.props.form.getFieldValue('imei'),
            activityId: this.props.location.query.activityId,
          },
        })
        .then(() => {
          this.props
            .dispatch({
              type: 'global/checkimeiAndPhone',
              payload: {
                imei: this.props.form.getFieldValue('imei'),
                phone: this.state.postStr.substr(1) + this.props.form.getFieldValue('phone'),
                activityId: this.props.location.query.activityId,
              },
            })
            .then(() => {
              this.props.form.validateFields(['imei', 'phone'], (err, values) => {
                if (!err) {
                  if (this.state.codeHolder !== 'Get Code' || !values.phone) return false;
                  this.setState({
                    codeHolder: `${this.sec}s`,
                  });
                  this.props.dispatch({
                    type: 'global/getCode',
                    payload: {
                      type: 'login',
                      phone: this.state.postStr.substr(1) + values.phone,
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
                }
              });
            });
        });
    }
  };

  codeblur = () => {
    window.scrollTo(0, 1000);
    document.querySelector('body').scrollTo(0, 0);
  };

  getPattern = value => {
    let pattern = '';
    if (value === '+91') {
      pattern = '^[1-9]{1}[0-9]{9}$';
    } else if (value === '+86') {
      pattern = '^[1-9]{1}[0-9]{10}$';
    } else {
      pattern = '[1-9]{1}[0-9]*';
    }
    this.setState({
      pattern,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { pattern } = this.state;
    const selectBefore = (
      <Select style={{ width: 72 }} value={this.state.postStr} onChange={this.changeSelectStr}>
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
        <Form className={styles['input-box']}>
          <img
            src={require('@/assets/images/vivo.png')}
            style={{ width: '50%', marginBottom: 30 }}
            alt=""
          />
          <Form.Item>
            {getFieldDecorator('imei', {
              rules: [{ required: true, pattern: REGS.imei, message: 'Invalid format' }],
              validateTrigger: 'onBlur',
            })(
              <Input
                addonBefore={<div style={{ width: 50, textAlign: 'left' }}>IMEI</div>}
                placeholder="please enter your IMEI code"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{ required: true, pattern: pattern, message: 'Invalid format' }],
              validateTrigger: 'onBlur',
            })(<Input addonBefore={selectBefore} placeholder="please enter your phone number" />)}
          </Form.Item>
          <Form.Item style={{ position: 'relative' }}>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'Please input your code' }],
            })(
              <Input
                addonBefore={<div style={{ width: 50, textAlign: 'left' }}>Code</div>}
                placeholder="please verification code"
                onBlur={this.codeblur}
              />
            )}
            <div className="get-code" onClick={this.getCode}>
              {this.state.codeHolder}
            </div>
          </Form.Item>
          <Button onClick={this.login}>LOG IN</Button>
        </Form>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          closable={false}
          bodyStyle={{
            backgroundImage: `url(${this.state.ad})`,
            height: '70vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            backgroundAttachment: 'fixed',
          }}
          footer={null}
        >
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 10,
              fontSize: 14,
              color: '#666',
            }}
          >
            ({this.state.countDown}s)&nbsp;&nbsp;<span onClick={this.handleCancel}>Skip Ad</span>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Index;

import * as services from '../services/global';
import { message } from 'antd';
import router from 'umi/router';

export default {
  namespace: 'global',
  state: {
    loginKey: '',
    lotteryData: '',
    luckyTimes: '',
    cascaderOption: [],
    level1: [],
    level2: [],
    level3: [],
    userAddress: null,
    smsId: '',
    verification: '',
    prizeList: [],
    pageDetail: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {},
  },

  effects: {
    *getCode({ payload: { phone, type } }, { call, put }) {
      const { data } = yield call(services.getCode, phone, type);
      parseInt(data.code, 10) === 1
        ? yield put({
            type: 'save',
            payload: {
              loginKey: data.data.key,
            },
          })
        : message.error(data.msg);
    },
    *login({ payload: { phone, key, code, imei, activityId } }, { call, put }) {
      const { data } = yield call(services.login, phone, key, code, imei, activityId);
      if (parseInt(data.code, 10) === 1) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('imei', imei);
        localStorage.setItem('phone', phone);
        if (data.data.category - 0 === 1) {
          router.push({
            pathname: '/bigWheel',
            query: {
              activityId: data.data.activityId,
            },
          });
        } else if (data.data.category - 0 === 2) {
          router.push({
            pathname: '/soduku',
            query: {
              activityId: data.data.activityId,
            },
          });
        } else {
          router.push({
            pathname: '/goldenEggs',
            query: {
              activityId: data.data.activityId,
            },
          });
        }
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    },
    *lottery({ payload: { token, activityId } }, { call, put }) {
      const { data } = yield call(services.lottery, token, activityId);
      parseInt(data.code, 10) === 1
        ? yield put({
            type: 'save',
            payload: {
              lotteryData: data.data,
              luckyTimes: data.data.luckyTimes,
            },
          })
        : message.error(data.msg);
    },
    *postUserData({ payload: { name, address, id, pinCode } }, { call, put }) {
      const { data } = yield call(services.postUserData, name, address, id, pinCode);
      parseInt(data.code, 10) === 1 ? message.success(data.msg) : message.error(data.msg);
    },
    *checkimei({ payload: { imei, activityId } }, { call, put }) {
      const { data } = yield call(services.checkimei, imei, activityId);
      if (parseInt(data.code, 10) !== 1) {
        message.error(data.msg);
        return Promise.reject();
      }
      return Promise.resolve();
    },
    *checkimeiAndPhone({ payload: { imei, phone, activityId } }, { call, put }) {
      const { data } = yield call(services.checkimeiAndPhone, imei, phone, activityId);
      if (parseInt(data.code, 10) !== 1) {
        message.error(data.msg);
        return Promise.reject();
      }
      return Promise.resolve();
    },

    *fetchCascader({ payload: { level, name } }, { call, put }) {
      const { data } = yield call(services.fetchCascader, level, name);
      parseInt(data.code, 10) === 1
        ? yield put({
            type: 'save',
            payload: {
              [`level${level}`]: data.data,
            },
          })
        : message.error(data.msg);
    },
    *cashLottery({ payload: { phone, awardCode } }, { call, put }) {
      const { data } = yield call(services.cashLottery, phone, awardCode);
      if (parseInt(data.code, 10) === 1) {
        if (data.data.msg === '兑奖需要短信验证') {
          yield put({
            type: 'save',
            payload: {
              verification: data.data.key,
              smsId: data.data.id,
            },
          });
        } else {
          message.success(data.msg);
        }
      } else {
        message.error(data.msg);
      }
    },
    *smsLottery({ payload: { id, key, phone, awardCode, callback } }, { call, put }) {
      const { data } = yield call(services.smsLottery, id, key, phone, awardCode);
      if (parseInt(data.code, 10) === 1) {
        if (data.msg === '验证码错误') {
          message.success(data.msg);
        } else {
          yield call(callback);
          message.success(data.msg);
        }
      } else {
        message.error(data.msg);
      }
    },
    *fetchKV({ payload: { id } }, { call, put }) {
      const { data } = yield call(services.fetchKV, id);
      if (parseInt(data.code, 10) === 1) {
        localStorage.setItem('kv', data.data.banner);
        localStorage.setItem('bg', data.data.background);
        localStorage.setItem('ad', data.data.ad);
      } else {
        message.error(data.msg);
      }
    },
    *fetchAddress({ payload: { id, imei, phone } }, { call, put }) {
      const { data } = yield call(services.fetchAddress, id, imei, phone);
      if (parseInt(data.code, 10) === 1) {
        if (data.data.hasDetail !== false) {
          yield put({
            type: 'save',
            payload: {
              userAddress: data.data.user,
            },
          });
        }
      } else {
        message.error(data.msg);
      }
    },
    *fetchPrizeList({ payload: { id } }, { call, put }) {
      const { data } = yield call(services.fetchPrizeList, id);
      if (parseInt(data.code, 10) === 1) {
        if (data.data.hasDetail !== false) {
          yield put({
            type: 'save',
            payload: {
              prizeList: data.data,
            },
          });
        }
      } else {
        if (data.msg === 'Activities have lapsed') {
          message.error(data.msg);
        }
      }
    },
    *fetchPageDetail({ payload: { token, activityId, callback } }, { call, put }) {
      const { data } = yield call(services.fetchPageDetail, token, activityId);
      if (parseInt(data.code, 10) === 1) {
        yield put({
          type: 'save',
          payload: {
            pageDetail: data.data,
            luckyTimes: data.data.luckyTimes,
          },
        });
      } else {
        callback(true);
        message.error(data.msg);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};

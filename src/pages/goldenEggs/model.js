import * as services from './service';
import { message } from 'antd';

export default {
  namespace: 'goldenEggs',
  state: {
    pageDetail: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    * fetchPageDetail({ payload: { token, activityId ,callback} }, { call, put }) {
      const { data } = yield call(services.fetchPageDetail, token, activityId);
      if (parseInt(data.code, 10) === 1) {
        yield put({
          type: 'save',
          payload: {
            pageDetail: data.data,
          },
        });
        yield put({
          type: 'global/save',
          payload: {
            luckyTimes: data.data.luckyTimes,
          },
        });
      } else {
        callback(true)
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

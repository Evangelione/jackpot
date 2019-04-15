import request from '@/common/request';
import { api } from '@/common/constant';

export function getCode(phone, type) {
  let formData = new FormData();
  formData.append('phone', phone);
  formData.append('type', type);
  return request(`${api}/api/sms`, {
    method: 'POST',
    credentials: 'omit',
    body: formData,
  });
}

export function login(phone, key, code, imei, activityId) {
  let formData = new FormData();
  formData.append('phone', phone);
  formData.append('key', key);
  formData.append('code', code);
  formData.append('imei', imei);
  formData.append('activityId', activityId);
  return request(`${api}/api/login-sms`, {
    method: 'POST',
    credentials: 'omit',
    body: formData,
  });
}

export function lottery(token, activityId) {
  return request(`${api}/api/lottery?activityId=${activityId}`, {
    method: 'GET',
    credentials: 'omit',
    headers: {
      token,
    },
  });
}

export function postUserData(name, address, id, pinCode) {
  let formData = new FormData();
  formData.append('name', name);
  formData.append('address', address);
  formData.append('id', id);
  formData.append('pinCode', pinCode);
  return request(`${api}/api/lottery/user/save`, {
    method: 'POST',
    credentials: 'omit',
    headers: {
      token: localStorage.getItem('token'),
    },
    body: formData,
  });
}

export function checkimei(imei, activityId) {
  let formData = new FormData();
  formData.append('imei', imei);
  formData.append('activityId', activityId);
  return request(`${api}/api/checkimei`, {
    method: 'POST',
    credentials: 'omit',
    body: formData,
  });
}

export function checkimeiAndPhone(imei, phone, activityId) {
  let formData = new FormData();
  formData.append('imei', imei);
  formData.append('phone', phone);
  formData.append('activityId', activityId);
  return request(`${api}/api/checkimeiAndPhone`, {
    method: 'POST',
    credentials: 'omit',
    body: formData,
  });
}

export function fetchCascader(level, name) {
  return request(`${api}/admin/city/select?name=${encodeURIComponent(name)}&level=${level}`, {
    method: 'GET',
    credentials: 'omit',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}

export function cashLottery(phone, awardCode) {
  let formData = new FormData();
  formData.append('phone', phone);
  formData.append('awardCode', awardCode);
  return request(`${api}/api/activity/user/redeem`, {
    method: 'POST',
    credentials: 'omit',
    body: formData,
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}

export function smsLottery(id, key, phone, awardCode) {
  let formData = new FormData();
  formData.append('id', id);
  formData.append('key', key);
  formData.append('phone', phone);
  formData.append('code', awardCode);
  return request(`${api}/api/activity/user/sms/redeem`, {
    method: 'POST',
    credentials: 'omit',
    body: formData,
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}

export function fetchKV(id) {
  return request(`${api}/api/activity?activityId=${id}`, {
    method: 'GET',
    credentials: 'omit',
  });
}

export function fetchAddress(id, imei, phone) {
  return request(`${api}/api/activity/user/get?activityId=${id}&imei=${imei}&phone=${phone}`, {
    method: 'GET',
    credentials: 'omit',
    headers: {
      token: localStorage.getItem('token'),
    },
  });
}

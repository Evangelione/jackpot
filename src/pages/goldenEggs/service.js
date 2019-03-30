import request from '@/common/request';
import { api } from '@/common/constant';


export function fetchPageDetail(token, activityId) {
  return request(`${api}/api/lottery/index?activityId=${activityId}`, {
    method: 'GET',
    headers: {
      token: token,
    },
    credentials: 'omit',
  });
}

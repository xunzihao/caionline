import axiosKit from '../helpers/axiosKit';

export const getAll = (params) => {
  console.log(params);
  return axiosKit('get', 'api/course/getAll', params);
};

export const getAllUseQuery = ({ queryKey }) => {
  return axiosKit('get', 'api/course/getAll', queryKey[1]);
};

export const update = (params) => {
  console.log(params);
  return axiosKit('post', 'api/course/update', params);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, getAllUseQuery
};

import dayjs from 'dayjs';

/**
 * 태어난 개월 수 계산
 * @param   {Date} birthday   생일
 * @returns {Promise<number>} 개월 수
 */
export const getLivedMonth = async (birthday: Date): Promise<number> => {
  const now = dayjs();
  return now.diff(birthday, 'month');
};

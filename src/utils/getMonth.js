// 배열인데 구조분할할당 했는데 또 객체로 받아서 안되었던거같음
//getMonth() 메서드는 생성된 Date 객체에서 월(0 ~ 11)를 가져옵니다.
//Zero Base으로 1월은 0입니다. 그래서 getMonth() + 1로 처리해야 합니다.

const getMonth = (date) => {
  // console.log(new Date(date).getMonth() + 1);

  return new Date(date).getMonth() + 1;
};

export default getMonth;

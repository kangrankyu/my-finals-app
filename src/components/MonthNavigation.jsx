import React, { useState } from 'react'
import styled from 'styled-components';

const Navigationbox = styled.div`
border-radius: 15PX;
background-color: white;
padding: 20PX;



`
const Butttonbox = styled.div` 
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`
const Button = styled.button`
text-align: center;
    font-family: Pretendard, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    display: flex;
    height: 60px;
    padding: 20px;
    width: 104px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: rgb(0, 0, 0);
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background: rgb(246, 247, 250);
`
const MonthNavigation = ({ setMonth }) => {
    const [date, setdate] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])


    return (
        //전체 컨테이너박스가 hoom에서 감싸주고있고 
        //그밑에 네비게이션 박스안에 네비게이션을 돌려주고있는데 ? 왜안되지 ?
        <>
            <Navigationbox>
                <Butttonbox>  {
                    date.map((months) => {

                        return <Button key={months} onClick={() => setMonth(months)}>{`${months}월`}</Button>

                    })

                }
                </Butttonbox>


            </Navigationbox>





        </>






    );
};
export default MonthNavigation;
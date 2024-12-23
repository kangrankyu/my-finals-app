import React, { useState } from 'react'
import styled from 'styled-components';

const MonthNavigation = ({ setMonth }) => {
    const [date, setdate] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    const Navigationbox = styled`
    width: 1200px;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
 `


    return (

        <>
            <Navigationbox>
                {
                    date.map((months) => {
                        return <button key={months} onClick={() => setMonth(months)}>{`${months}월`}</button>
                    })

                }

            </Navigationbox>


        </>
    )
};
export default MonthNavigation;
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Listcontainer = styled.div` 
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
    padding: 20px;

`
const ListLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px  20px;
    border-radius: 8px;
    background-color: rgb(249, 249, 249);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
    transition: transform 0.2s ease-in-out;
    cursor: pointer;
    text-decoration: none;
`
const Listbox = styled.div` 
     display: flex;
    flex-direction: column;
    align-items: start;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const Amountbox = styled.span`
    font-weight: bold;
    color: rgb(0, 123, 255);
    flex-shrink: 0;
`
const Containerbox = styled.div` 
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const Datebox = styled.span`
     margin-bottom: 5px;
    color: rgb(102, 102, 102);
    font-size: 14px;

`
const Itembox = styled.span` 
white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    color: rgb(0, 123, 255);

`
const ExpenseList = ({ expenses }) => {
    // console.log(expenses)
    return (
        <>
            <Listcontainer>
                <Containerbox>

                    {

                        //리턴 안써서 에러남 
                        expenses.map((expense => {
                            return (
                                <ListLink to={`/expenses/${expense.id}`} key={expense.id}>
                                    <Listbox>
                                        <Datebox> {expense.date}</Datebox>
                                        <Itembox $primary>{expense.item} -{expense.description}</Itembox>
                                    </Listbox>
                                    <Amountbox>{expense.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Amountbox>
                                </ListLink>
                            )

                        }))

                    }
                </Containerbox>


            </Listcontainer >


        </>
    )
}

export default ExpenseList;
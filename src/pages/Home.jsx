import React from 'react'
import MonthNavigation from '../components/MonthNavigation';
import CreateExpense from '../components/CreateExpense';
import supabase from '../utils/supabase'
import { useEffect } from 'react';
import { useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import getMonth from '../utils/getMonth';
import styled from 'styled-components';



const Main = styled.div`
    width: 100% ;
    max-width: 800pX;
    background-color: aqua;
    margin: 0px  auto ;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;


`
const Home = () => {
    const [month, setmonth] = useState(1)
    const [expenses, setexpenses] = useState([])

    useEffect(() => {
        const expensesData = async () => {
            try {

                let { data: expenses, error } = await supabase
                    .from('expenses')
                    .select('*')

                setexpenses(expenses);


            } catch (error) {
                console.log("에러메시지", error)
            }

        }
        expensesData();
    }, [])

    // console.log(expenses)
    const newMonth = expenses.filter((expense) =>
        getMonth(expense.date) === month
    );

    return (<>

        <Main>
            <MonthNavigation setMonth={setmonth} />
            <CreateExpense
                setmonth={setmonth}
                expenses={expenses}
                setexpenses={setexpenses} />
            <ExpenseList expenses={newMonth} />
        </Main>


    </>
    )
};

export default Home;
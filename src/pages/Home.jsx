import React from 'react'
import MonthNavigation from '../components/MonthNavigation';
import CreateExpense from '../components/CreateExpense';
import supabase from '../utils/supabase'
import { useEffect } from 'react';
import { useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import getMonth from '../utils/getMonth';
import styled from 'styled-components';

const Container = styled.div`
    background-color: aqua;
    width: 100vw;
    height: 100vh;

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
        <Container>
            <MonthNavigation setMonth={setmonth} />
            <CreateExpense
                setmonth={setmonth}
                expenses={expenses}
                setexpenses={setexpenses} />
            <ExpenseList expenses={newMonth} />
        </Container>

    </>
    )
};

export default Home;
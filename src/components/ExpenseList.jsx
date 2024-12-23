import React from 'react'
import { Link } from 'react-router-dom'
const ExpenseList = ({ expenses }) => {
    // console.log(expenses)
    return (
        <>

            {

                //리턴 안써서 에러남 
                expenses.map((expense => {
                    return (

                        <Link to={`/expenses/${expense.id}`} >
                            <div key={expense.id}>
                                <span> {expense.date}</span>
                                <span>{expense.item}</span>
                                <span>{expense.amount}</span>
                                <span>{expense.description}</span>
                            </div>

                        </Link>



                    )

                })

                )}
        </>
    )
}

export default ExpenseList;
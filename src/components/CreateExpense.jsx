import React, { useState } from 'react'
import supabase from '../utils/supabase'
import getMonth from '../utils/getMonth'
const CreateExpense = ({ expenses, setexpenses, setmonth }) => {
    const [formdata, setformdata] = useState({
        date: "2024-01-01",
        item: "",
        amount: "",
        description: ""
    })
    // 이벤트가 발생한 타겟(e.target)의 id 속성을 키(key)로 사용, 해당 타겟의 value를 값(value)으로 사용
    const onchangeHandler = (e) => {
        setformdata({
            ...formdata,
            [e.target.id]: e.target.value
        }
        )
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const regex = /^\d{4}-\d{2}-\d{2}$/
        const regexamount = /^\d+(\.\d+)?$/;
        if (!regex.test(formdata.date)) {
            console.log("날짜를 잘못입력했습니다 ");

        }
        if (!regexamount.test(formdata.amount)) {
            console.log(" 지츨내역을 잘못입력했습니다");

        }

        const { data, error } = await supabase
            .from("expenses")
            .insert({
                date: formdata.date,
                item: formdata.item,
                amount: formdata.amount,
                description: formdata.description,
            })
            .select();
        setexpenses([...expenses, data[0]]);
        setformdata({
            date: formdata.date,
            item: "",
            amount: "",
            description: ""
        })

    }
    return (
        <>
            <div>
                <form action="" onSubmit={onSubmitHandler} >
                    <input type="text" id='date' placeholder=' YYYY-MM-DD' value={formdata.date} onChange={onchangeHandler} />
                    <input type="text" id='item' placeholder='지출항목' value={formdata.item} onChange={onchangeHandler} />
                    <input type="number " id='amount' placeholder='지출금액' value={formdata.amount} onChange={onchangeHandler} />
                    <input type="text" id='description' placeholder='지출내용' value={formdata.description} onChange={onchangeHandler} />
                    <button>저장</button>
                </form>


            </div>
        </>
    )
}

// 실수 1 타입이 텍스트 , 넘버로 지정했어야됬는데 formdata의 객체 키값으로 넣어놔서 입력이 안됨 
export default CreateExpense;
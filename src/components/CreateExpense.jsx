import React, { useState } from 'react'
import supabase from '../utils/supabase'
import getMonth from '../utils/getMonth'
import styled from 'styled-components'


const Section = styled.section` 
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
    padding: 20px;
`
const Form = styled.form` 
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: flex-end;

`
const Inputbox = styled.div` 
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    min-width: 120px;
`
const Button = styled.button`
    padding: 8px 20px;
    height: 34px;
    margin-top: 10px;
    background-color: rgb(0, 123, 255);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
`
const Input = styled.input`
        padding: 8px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 4px;
    font-size: 14px;
`

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
        console.log(data)
        setexpenses([...expenses, data[0]]);
        console.log(expenses)
        setformdata({
            date: formdata.date,
            item: "",
            amount: "",
            description: ""
        })
        const newMonth = new Date(data[0].date).getMonth() + 1;

        setmonth(newMonth)
    }
    return (
        <>
            <Section>
                <Form action="" onSubmit={onSubmitHandler} >
                    <Inputbox> <label style={{ fontSize: "12px" }} htmlFor="">날짜</label> <Input type="text" id='date' placeholder=' YYYY-MM-DD' value={formdata.date} onChange={onchangeHandler} /></Inputbox>
                    <Inputbox> <label style={{ fontSize: "12px" }} htmlFor="">항목</label>  <Input type="text" id='item' placeholder='지출항목' value={formdata.item} onChange={onchangeHandler} /></Inputbox>
                    <Inputbox> <label style={{ fontSize: "12px" }} htmlFor="">금액</label> <Input type="number" id='amount' placeholder='지출금액' value={formdata.amount} onChange={onchangeHandler} /></Inputbox>
                    <Inputbox> <label style={{ fontSize: "12px" }} htmlFor=""> 내용</label>   <Input type="text" id='description' placeholder='지출내용' value={formdata.description} onChange={onchangeHandler} /></Inputbox>
                    <Button>저장</Button>
                </Form>

            </Section>



        </>
    )
}

// 실수 1 타입이 텍스트 , 넘버로 지정했어야됬는데 formdata의 객체 키값으로 넣어놔서 입력이 안됨 
export default CreateExpense;
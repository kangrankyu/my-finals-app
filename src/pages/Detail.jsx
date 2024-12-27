import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../utils/supabase';
import styled from 'styled-components';
//유즈 파람스로 해당 아이디값을 가져온다 
//수파베이스에서 데이터 가져온다 
//데이터에 [id] 를 붙여준다 
//파람스로 넘겨받은 ID 랑  수파베이스에 저장된 ID 를 필터롤 찾아서 맵으로 돌려준다 
const DetailBox = styled.div` 

  max-width: 800px;
 margin: 0px, auto;
 padding: 20px;
border-radius: 10px;
background-color: white;
 `
const DetailInput = styled.input`
     padding: 10px;
    border: 1px solid rgb(221, 221, 221);
    border-radius: 4px;
    font-size: 14px;


`
const DetailInputbox = styled.div` 
     display: flex;
    flex-direction: column;
    margin-bottom: 10px;
   
`
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`
//스타일드 컴포넌트 그룹화해서 사용할수있는지는 처음알았네 ... 
// 스타일드 컴포넌트 props 사용 자주 해봐야겠다 
const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-top: 20px;
  &:hover {
    background-color: ${(props) => (props.danger ? "#cc0000" : "#0056b3")};
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`
const Inputlabel = styled.label` 
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    text-align: left;
`
const Detail = () => {

    const Params = useParams()
    const [datailformdata, setDetailformdata] = useState({
        date: "",
        item: "",
        amount: 0,
        description: " "
    })

    const Navigation = useNavigate("");

    useEffect(() => {

        const fetchDetail = async () => {

            try {
                let { data: expenses, error } = await supabase
                    .from('expenses')
                    .select('*')
                //힘들게 찾을 필요가 없이 그냥 0번쨰 데이터를 객체로 넣어 주면 됫었네 ... 개멍청  
                const filterdata = expenses.filter((data) => Params.id == data.id).map((data) => data)
                console.log(filterdata)
                setDetailformdata(filterdata[0]);
                // 입력값 받는 스테이트를 넣어줘야된다 
                // 받아온기존 데이터 
            } catch (error) {
                console.log("에러메시지", error)
            }
        }
        fetchDetail()
    }, [])


    const onchangeHandler = (e) => {
        setDetailformdata({
            ...datailformdata,
            [e.target.id]: e.target.value
        })
    }

    const updateHandler = async () => {
        //     //수파베이스 업데이트 api 가져온다 
        //     //테이블에 변경된값을 넣는다 
        //     // 그리고 다시 조회하고 화면을 변경한다 

        const { item, date, amount, description, id } = datailformdata

        const { data, error } = await supabase
            .from('expenses')
            .update({
                item: item,
                date: date,
                amount: amount,
                description: description

            })
            .eq('id', id)
            .select()
        console.log(data)
        if (error) {
            return alert(error.message);

        }

        Navigation("/");
    }

    //윈도우 컨펌 추가 
    //트라이 캐치 할필요가 없었네 ... 
    //id는 Params 가져와도 되었는데 ...  조금 비효율적으로 한거같다 
    const DeleteOnhandler = async () => {
        if (window.confirm("정말로삭제하시겠습니까 ?")) {

            const { id } = datailformdata
            try {

                const { error } = await supabase
                    .from('expenses')
                    .delete()
                    .eq('id', id)
                if (error) {
                    return alert("데이터를 삭제하는 중 오류가 발생했습니다.");
                }
                alert("데이터가 삭제되었습니다.");
            } catch (error) {
                console.log("에러메시지=>", error)
            }
            Navigation("/")
        }
    }

    // 인풋 값  : 이벤트가 발생하는지점의 입력값 을 받아서 벨류에 넣어줘야된다 
    // 그치만 초기값을 기존에 있던 데이터의 id 값과 params의 id 값의 데이터를 가져와서 넣어주고 데이터를 변경해야된다

    return (
        <>



            <DetailBox>
                <DetailInputbox>
                    <Inputlabel>날짜</Inputlabel>
                    <DetailInput type="text" id='date' value={datailformdata.date} onChange={onchangeHandler} />
                </DetailInputbox>
                <DetailInputbox>
                    <Inputlabel>항목</Inputlabel>
                    <DetailInput type="text" id='item' value={datailformdata.item} onChange={onchangeHandler} />
                </DetailInputbox>
                <DetailInputbox>
                    <Inputlabel>금액</Inputlabel>
                    <DetailInput type="number" id='amount' value={datailformdata.amount} onChange={onchangeHandler} />
                </DetailInputbox>
                <DetailInputbox>
                    <Inputlabel>내용</Inputlabel>
                    <DetailInput type="text" id='description' value={datailformdata.description} onChange={onchangeHandler} />

                </DetailInputbox>
                <ButtonGroup>
                    <Button onClick={updateHandler} >수정</Button>
                    <Button onClick={DeleteOnhandler} danger="true">삭제 </Button>
                    <Button onClick={() => Navigation("/")}>뒤로가기</Button>
                </ButtonGroup>




            </DetailBox >

        </>
    )
}

export default Detail;
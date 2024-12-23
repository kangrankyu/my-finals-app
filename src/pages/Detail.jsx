import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import supabase from '../utils/supabase';
//유즈 파람스로 해당 아이디값을 가져온다 
//수파베이스에서 데이터 가져온다 
//데이터에 [id] 를 붙여준다 
//파람스로 넘겨받은 ID 랑  수파베이스에 저장된 ID 를 필터롤 찾아서 맵으로 돌려준다 

const Detail = () => {
    const Params = useParams()
    const [detaDildata, setDetaildata] = useState([]);

    useEffect(() => {

        const fetchDetail = async () => {

            try {
                let { data: expenses, error } = await supabase
                    .from('expenses')
                    .select('*')

                setDetaildata(expenses);

            } catch (error) {
                console.log("에러메시지", error)
            }
        }
        fetchDetail()
    }, [])
    console.log(Params)
    console.log(detaDildata)

    const onchangeHandler = (e) => {
        setformdata({
            ...detaDildata,
            [e.target.id]: e.target.value
        }
        )
    }
    const updateHandler = () => {
        //수파베이스 업데이트 api 가져온다 
        //테이블에 변경된값을 넣느다 
        // 그리고 다시 조회하고 화면을 변경한다 
    }
    return (
        <>
            {
                detaDildata.filter((data) => data.id == Params.id).map((expenses) => {
                    return (

                        <div key={expenses.id} >
                            <input type="text" id='expenses.date' value={expenses.date} onChange={onchangeHandler} />
                            <input type="text" id='expenses.item' value={expenses.item} onChange={onchangeHandler} />
                            <input type="text" id='expenses.amount' value={expenses.amount} onChange={onchangeHandler} />
                            <input type="text" id='expenses.description' value={expenses.description} onChange={onchangeHandler} />

                            <button onClick={updateHandler}>수정</button>
                            <button>삭제</button>
                            <button>뒤로가기</button>
                        </div>

                    )
                })
            }
        </>
    )
}

export default Detail;
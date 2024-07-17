import { Avatar } from "@nextui-org/react";
import {commentType} from "../../utils/types";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Comment({comment}:{comment: [string, commentType]}){
    //Сделать сортировку по времени
    const [issue, setIssue] = useState('Задача');
    const [message, setMessage] = useState('Сообщение')
    const [hourAgo, setHoutAgo] = useState("");

    const time = parseInt(comment[0])/1000; //Время с публиикации в секундах
    console.log(time)
    useEffect(() => {
        (time > 86400) ? setHoutAgo(`${Math.floor(((time/60)/60)/24)} дней назад`): //Больше дня 
        (time > 3600) ? setHoutAgo(`${Math.floor((time/60)/60)} часов назад`): //Больше часа
        (time > 60) && setHoutAgo(`${Math.floor(time/60)} минут назад`) //Больше минуты
    },[])
    
    return(<div className="commet__wrapper">
        <div className="flex gap-4 items-center">
            <Avatar src={comment[1].designer.avatar} name={comment[1].designer.username} size="lg"/>
            <div>
                <h1 className="commet__title">{comment[1].designer.username}</h1>
                <p className="commet__text">{hourAgo}</p>
                {/* <p className="commet__text">{moment(hour, 'hh').fromNow()}</p> */}
                {/* <p className="commet__text">{moment(hour, 'hh').fromNow()}</p> */}
            </div>
        </div>
        <div className="commet__paragraph">
            <h2 >{issue}: {comment[1].issue} </h2>
            <p className="commet__text">{message}: {comment[1].message}</p>
        </div>
    </div>)
}
import { Avatar } from "@nextui-org/react";
import {commentType} from "../../utils/types";
import { useEffect, useState } from "react";
import { useSelector } from "../../utils/redux-types";

export default function Comment({comment}:{comment: [string, commentType]}){
    const language = useSelector(state => state.language);
    const [hourAgo, setHoutAgo] = useState("");

    const time = parseInt(comment[0])/1000; //Время с публиикации в секундах
    useEffect(() => {
        (time > 86400) ? setHoutAgo(`${Math.floor(((time/60)/60)/24)} ${language === "Русский" ? 'дней назад' : "days ago"}`)  : //Больше дня 
        (time > 3600) ? setHoutAgo(`${Math.floor((time/60)/60)} ${language === "Русский" ? 'часов назад' : "hours ago"}`)      : //Больше часа
        (time > 60) && setHoutAgo(`${Math.floor(time/60)} ${language === "Русский" ? 'минут назад' : "minutes ago"}`)            //Больше минуты
    },[language])
    
    return(<div className="commet__wrapper">
        <div className="flex gap-4 items-center">
            <Avatar src={comment[1].designer.avatar} name={comment[1].designer.username} size="lg"/>
            <div>
                <h1 className="commet__title">{comment[1].designer.username}</h1>
                <p className="commet__text">{hourAgo}</p>
            </div>
        </div>
        <div className="commet__paragraph">
            <h2 >{`${language === "Русский" ? "Задача" : "Issue"}: ${comment[1].issue}`}</h2>
            <p className="commet__text">{`${language === "Русский" ? "Сообщение" : "Message"}: ${comment[1].message}`}</p>
        </div>
    </div>)
}
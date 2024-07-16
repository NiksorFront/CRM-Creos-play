import { Avatar } from "@nextui-org/react";
import {commentType} from "../../utils/types";
import moment from "moment";
import { useState } from "react";

export default function Comment({comment}:{comment:commentType}){
    const [issue, setIssue] = useState('Задача');
    const [message, setMessage] = useState('Сообщение')

    const now = new Date();
    const date = comment.date_created.split('T');
    const [year, month, day] = date[0].split('-');
    const [hour, minute, second] = date[1].split(':');

    const date_itog = date[0] + " " + hour + ":" + minute + ":" + second.slice(0,2);
    // console.log(new Date(), "/n", new Date(date_itog.replace(/-/g,'/')))
    // const differenceMilliseconds = new Date() - new Date(date_itog.replace(/-/g,'/'));
    
    return(<div className="commet__wrapper">
        <div className="flex gap-4 items-center">
            <Avatar src={comment.designer.avatar} name={comment.designer.username} size="lg"/>
            <div>
                <h1 className="commet__title">{comment.designer.username}</h1>
                <p className="commet__text">{moment(hour, 'hh').fromNow()}</p>
                {/* <p className="commet__text">{moment(hour, 'hh').fromNow()}</p> */}
                {/* <p className="commet__text">{moment(hour, 'hh').fromNow()}</p> */}
            </div>
        </div>
        <div className="commet__paragraph">
            <h2 >{issue}: {comment.issue} </h2>
            <p className="commet__text">{message}: {comment.message}</p>
        </div>
    </div>)
}
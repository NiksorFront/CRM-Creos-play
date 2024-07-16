import { Avatar } from "@nextui-org/react"
import { designerType } from "../../utils/types"

export default function Designer({avatar, username, time, issue}:{avatar:string, username:string, time:string, issue:string}){
    //Когда подкючим редакс найти аву по имени

    return(<div className="designer__wrapper">
        <div className="designer__ava">
            <Avatar src={avatar} name={username} size="lg"/>
            <div>
                <h1 className="designer__title">{username}</h1>
                <p className="designer__text">медианное время выполения задач: {time}</p>
            </div>
        </div>
        <p className="designer__paragraph">Выполенено: {issue}</p>
    </div>)

}
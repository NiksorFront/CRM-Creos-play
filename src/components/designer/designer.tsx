import { Avatar } from "@nextui-org/react"
import { designerType } from "../../utils/types"

export default function Designer({username, averageTime, numIssue}:{username:string, averageTime:number, numIssue:number}){
    //Когда подкючим редакс найти аву по имени


    const hours = Math.floor(((averageTime / 1000) / 60) / 60)

    return(<div className="designer__wrapper">
        <div className="designer__ava">
            <Avatar  name={username} size="lg"/>
            <div>
                <h1 className="designer__title">{username}</h1>
                <p className="designer__text">Медианное время выполения задач(в часах): {hours}</p>
            </div>
        </div>
        <p className="designer__paragraph">Выполенено: {numIssue}</p>
    </div>)

}
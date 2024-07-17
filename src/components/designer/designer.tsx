import { Avatar } from "@nextui-org/react"
import { designerType } from "../../utils/types"

export default function Designer({username, averageTime, numIssue}:{username:string, averageTime:number, numIssue:number}){
    //Когда подкючим редакс найти аву по имени


    //Если через %, то оно почему-то иногда 0 высчитывает в итоге
    const hours = (((averageTime / 1000) / 60) / 60).toString().split('.')[0]

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
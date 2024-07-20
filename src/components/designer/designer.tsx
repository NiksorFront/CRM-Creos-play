import { Avatar } from "@nextui-org/react"
import { useSelector } from "../../utils/redux-types"

export default function Designer({username, averageTime, numIssue}:{username:string, averageTime:number, numIssue:number}){
    const language = useSelector(state => state.language);
    const designers = useSelector(state => state.designer);

    let ava = ""; //Ищем аватарку дизайнера
    designers.forEach(designer => {
        if(designer.username === username){
            ava = designer.avatar;
        }
    })


    const hours = Math.floor(((averageTime / 1000) / 60) / 60)

    return(<div className="designer__wrapper">
        <div className="designer__ava">
            <Avatar src={ava} name={username} size="lg"/>
            <div>
                <h1 className="designer__title">{username}</h1>
                <p className="designer__text">
                    {`${language === "Русский" ? "Медианное время выполения задач(в часах)" : "Median task completion time(in hours)"}: ${hours}`}
                </p>
            </div>
        </div>
        <p className="designer__paragraph">{`${language === "Русский" ? "Выполенено:" : "Done:"} ${numIssue}`}</p>
    </div>)

}
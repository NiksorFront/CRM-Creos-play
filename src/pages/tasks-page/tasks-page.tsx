import { Button, Pagination } from "@nextui-org/react";
import { createRef, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { issueType } from "../../utils/types";
import { PieChart, Pie, Tooltip, Cell,} from 'recharts';
import numberWorkingWeek from "../../utils/workingWeek";
import MonthlyChart from "../../components/monthly-chart/monthly-chart";
import {weekType} from "../../utils/types";
import { useDispatch, useSelector } from "../../utils/redux-types";
import { requestIssues } from "../../services/slices/issuesSlice";

export default function TasksPage(){
    const dispatch = useDispatch();
    const issues = useSelector(state => state.issues);
    const [issueClosed, setIssueClosed] = useState<Array<issueType>>([]);
    const [months, setMonths] = useState<Array<weekType>>();
    const [displayedWeeks, setDisplayedWeeks] = useState<number>(7);
    const workingWeek = numberWorkingWeek();
    const pieElement = createRef<HTMLDivElement>();
    const [pieWidHeig, setPieWidHeig] = useState<number>();
    const [pieData, setPieData] = useState<Array<{name: string, quantity: number}>>([{ name: 'Загрузка...', quantity: 0 }, { name: 'Загрузка...', quantity: 0 }, { name: 'Загрузка...', quantity: 0 },]);
    const [, updateState] = useState<Object>();
    const forceUpdate = useCallback(() => updateState({}), []);

    const COLORS = ['#3ed886', '#d8c43e', '#3ebdd8'];

    useEffect(() => {
        dispatch(requestIssues());
        setPieWidHeig(pieElement.current!.clientWidth);
    }, []);

    useEffect(() => {
        taskInListMonths();
        sortIssueByReadliness();
    }, [displayedWeeks, pieWidHeig])

    useEffect(() => {
        setIssueClosed(issues.filter(issue => issue.status === "Done" && issue));
        setTimeout(() => {
            setDisplayedWeeks(8); //Чтобы перезагрузить, чтобы графики образились, т.к. 'recharts' лагучая 
        }, 1250);
    }, [issues]) //Записываем только выполненные задачи)

    function sortIssueByReadliness(){
        let done = 0; let inProgress = 0; let new_ = 0;
        issues.forEach(issue => {
            (issue.status === 'Done')        ? done+=1 :
            (issue.status === 'In Progress') ? inProgress+=1 : new_+=1
        })
        setPieData([{ name: 'Done', quantity: done },
                    { name: 'In Progress', quantity: inProgress },
                    { name: 'New', quantity: new_ }]);
    }

    function sortIssueOnWeeks(){
        /*Создаём столько ключей-недель, сколько заданно в numberWeeks*/
        const weeks: {[i: number]: {received: number, expeness: number, earned: number}} = {}
        for (let i = workingWeek-displayedWeeks+1; i <= workingWeek; i++){
            Object.assign(weeks, {[i]: {received: 0, expeness: 0, earned: 0}} )  
        }
        /*Перебираем issueClosed и записваем итог в каждую из недель*/ //@ts-ignore
        const baseDate = new Date(new Date().getFullYear(), '00', '01', '11', '00', '00');
        issueClosed.forEach(issue => {
            const finishDate = issue.date_finished.split('T');
            const finish = {date: finishDate[0].split('-'), 
                            time: finishDate[1].slice(0,8).split(':')};
            //@ts-ignore                
            const date = new Date(finish.date[0], finish.date[1]-1, finish.date[2], finish.time[0], finish.time[1], finish.time[2]) - baseDate;
            const numWeek = Math.ceil(date/1000/60/60/24/7).toString(); //Номер недели когда был завершён проект
            if(parseInt(numWeek) > workingWeek-displayedWeeks){ //Записываем только последие numberWeeks недели. Пример: Если numWeek=17 workingWeek=20 displayedWeeks=4, то numWeek подходит, т.к. 17 > 16   
                const send = issue.send_to_account_manager + issue.send_to_designer + issue.send_to_project_manager;
                Object.keys(weeks).forEach(week => {
                    if(week === numWeek){
                        weeks[parseInt(week)] = {received: weeks[parseInt(week)].received + issue.received_from_client,
                                                 expeness: weeks[parseInt(week)].expeness + send,
                                                 earned: weeks[parseInt(week)].earned + issue.received_from_client - send
                                                }
                    }
                })
            }

        })

        return weeks
    }

    function taskInListMonths(){
        const allWeek = sortIssueOnWeeks();
        const numWeek = Object.keys(allWeek).length;
        const initialWeek = workingWeek - numWeek;
        const empty = {received: 0, expeness: 0, earned: 0};

        //Добавляем недостоющих недель в начало
        (numWeek%4 === 1)  ? Object.assign(allWeek, {...allWeek, [initialWeek]: empty, [initialWeek-1]: empty, [initialWeek-2]: empty}) :
        (numWeek%4 === 2)  ? Object.assign(allWeek, {...allWeek, [initialWeek]: empty, [initialWeek-1]: empty}) :
        (numWeek%4 === 3) && Object.assign(allWeek, {...allWeek, [initialWeek]: empty});
        
        /*//Добавляем недостоющих недель в начало
        (initialWeek%4 === 3)  ? Object.assign(allWeek, {...allWeek, [initialWeek-1]: empty, [initialWeek-2]: empty, [initialWeek-3]: empty}) :
        (initialWeek%4 === 2)  ? Object.assign(allWeek, {...allWeek, [initialWeek-1]: empty, [initialWeek-2]: empty}) :
        (initialWeek%4 === 1) && Object.assign(allWeek, {...allWeek, [initialWeek-1]: empty});
        //Добавляем недостоющих недель в конце
        (workingWeek%4 === 1)  ? Object.assign(allWeek, {...allWeek, [workingWeek+1]: empty, [workingWeek+2]: empty, [workingWeek+3]: empty}) :
        (workingWeek%4 === 2)  ? Object.assign(allWeek, {...allWeek, [workingWeek+1]: empty, [workingWeek+2]: empty}) :
        (workingWeek%4 === 3) && Object.assign(allWeek, {...allWeek, [workingWeek+1]: empty});*/

        const allMonth:weekType[] = [];
        let one = "null"; let two = "null"; let three = "null";
        Object.keys(allWeek).forEach((key, index) => {
                const i = index % 4;
                (i === 0) ? one = key :
                (i === 1) ? two = key :
                (i === 2) ? three = key :
                allMonth.push({[one]: allWeek[parseInt(one)], [two]: allWeek[parseInt(two)], [three]: allWeek[parseInt(three)], [key]: allWeek[parseInt(key)]});
        })
        setMonths(allMonth.reverse());
        setTimeout(() => {
            forceUpdate() //Чтобы перезагрузить, чтобы графики образились, т.к. 'recharts' лагучая 
        }, 1000);
    }

    return(<main className="charts-page">
        <div className="weeks">
            <p>Число отбражаемых рабочих недель</p>
            <Pagination color="success" total={workingWeek} page={displayedWeeks} onChange={setDisplayedWeeks}/>
        </div>
        {months && <div className="charts-collection">
            <div className="explanation">
                <p style={{color:'#3ed886'}}>received</p>
                <p style={{color:'#e45353'}}>expeness</p>
                <p style={{color:'#b9e453'}}>earned</p>
            </div>
            {months.map((month, i) => <MonthlyChart key={i} month={month} />)}
        </div>}
        {pieData &&<div ref={pieElement} className="pie-chart">
            <div className="explanation">
                <p style={{color:COLORS[0]}}>{pieData[0].name}</p>
                <p style={{color:COLORS[1]}}>{pieData[1].name}</p>
                <p style={{color:COLORS[2]}}>{pieData[2].name}</p>
            </div>
            <PieChart width={pieWidHeig} height={pieWidHeig}>
                    <Pie
                        data={pieData}
                        dataKey="quantity"
                        outerRadius={pieWidHeig!/2.5}
                        fill="green"
                        label={{ fill: 'gray', fontSize: 30 }}
                    >
                        {pieData.map((entry, i) => (
                            <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
            </PieChart>
        </div>}
        <Link to={{pathname: '/'}} className="surface-button">
            <Button size="lg" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Главная страница</Button>
        </Link>
    </main>)
}
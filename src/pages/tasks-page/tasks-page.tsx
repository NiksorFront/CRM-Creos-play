import { Button, Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../utils/API";
import { issueType } from "../../utils/types";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import numberWorkingWeek from "../../utils/workingWeek";
import MonthlyChart from "../../components/monthly-chart/monthly-chart";
import {weekType} from "../../utils/types";

export default function TasksPage(){
    const [issues, setIssues] = useState<Array<issueType>>([]);
    const [issueClosed, setIssueClosed] = useState<Array<issueType>>([]);
    const [months, setMonths] = useState<Array<weekType>>();
    const [displayedWeeks, setDisplayedWeeks] = useState<number>(8);
    const workingWeek = numberWorkingWeek();

    // const data = [
    //     { name: 'Geeksforgeeks', students: 600 },
    //     { name: 'Technical scripter', students: 600 },
    //     { name: 'Geek-i-knack', students: 600 },
    // ];
    console.log(months, issues, issueClosed);

    const data = [
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    useEffect(() => {
        if (issues[0] === undefined) {
            request('issue/').then(res => setIssues(res))
                             .catch(err => console.log(err));
        }else{
            taskInListMonths();
        }

    }, [displayedWeeks, issues])

    useEffect(() => setIssueClosed(issues.filter(issue => issue.status === "Done" && issue)), [issues]) //Записываем только выполненные задачи)

    function sortIssueOnWeeks(){
        /*Создаём столько ключей-недель, сколько заданно в numberWeeks*/
        const weeks = {}
        for (let i = workingWeek-displayedWeeks+1; i <= workingWeek; i++){
            Object.assign(weeks, {[i]: {received: 0, expeness: 0, earned: 0}} )  
        }
        /*Перебираем issueClosed и записваем итог в каждую из недель*/
        const baseDate = new Date(new Date().getFullYear(), '00', '01', '11', '00', '00');
        issueClosed.forEach(issue => {
            const finishDate = issue.date_finished.split('T');
            const finish = {date: finishDate[0].split('-'), 
                            time: finishDate[1].slice(0,8).split(':')};
            const date = new Date(finish.date[0], finish.date[1]-1, finish.date[2], finish.time[0], finish.time[1], finish.time[2]) - baseDate;
            const numWeek = Math.ceil(date/1000/60/60/24/7).toString(); //Номер недели когда был завершён проект
            if(parseInt(numWeek) > workingWeek-displayedWeeks){ //Записываем только последие numberWeeks недели. Пример: Если numWeek=17 workingWeek=20 displayedWeeks=4, то numWeek подходит, т.к. 17 > 16   
                const send = issue.send_to_account_manager + issue.send_to_designer + issue.send_to_project_manager;
                Object.keys(weeks).forEach(week => {
                    if(week === numWeek){
                        weeks[week] = {received: weeks[week].received + issue.received_from_client,
                                       expeness: weeks[week].expeness + send,
                                       earned: weeks[week].earned + issue.received_from_client - send
                                    }
                    }
                })
            }

        })

        return weeks
    }

    function taskInListMonths(){
        const allWeek = sortIssueOnWeeks();

        const initialWeek = workingWeek - Object.keys(allWeek).length;
        const empty = {received: 0, expeness: 0, earned: 0};
        //Добавляем недостоющих недель в начало
        (initialWeek%4 === 3)  ? Object.assign(allWeek, {...allWeek, [initialWeek-1]: empty, [initialWeek-2]: empty, [initialWeek-3]: empty}) :
        (initialWeek%4 === 2)  ? Object.assign(allWeek, {...allWeek, [initialWeek-1]: empty, [initialWeek-2]: empty}) :
        (initialWeek%4 === 1) && Object.assign(allWeek, {...allWeek, [initialWeek-1]: empty});
        //Добавляем недостоющих недель в конце
        (workingWeek%4 === 1)  ? Object.assign(allWeek, {...allWeek, [workingWeek+1]: empty, [workingWeek+2]: empty, [workingWeek+3]: empty}) :
        (workingWeek%4 === 2)  ? Object.assign(allWeek, {...allWeek, [workingWeek+1]: empty, [workingWeek+2]: empty}) :
        (workingWeek%4 === 3) && Object.assign(allWeek, {...allWeek, [workingWeek+1]: empty});

        const allMonth:weekType[] = [];
        let one = "null"; let two = "null"; let three = "null";
        Object.keys(allWeek).forEach((key, index) => {
                const i = index % 4;
                (i === 0) ? one = key :
                (i === 1) ? two = key :
                (i === 2) ? three = key :
                allMonth.push({[one]: allWeek[one], [two]: allWeek[two], [three]: allWeek[three], [key]: allWeek[key]});
        })
        setMonths(allMonth.reverse());
    }

    return(<main className="charts-page">
        <div className="weeks">
            <p>Число отбражаемых рабочих недель</p>
            <Pagination color="success" total={workingWeek} page={displayedWeeks} onChange={setDisplayedWeeks}/>
        </div>
        <div className="charts-collection">
            {months && months.map(month => <MonthlyChart month={month} />)}
        </div>
        {/*<PieChart width={700} height={700}>
            <Pie
                data={data}
                dataKey="students"
                outerRadius={250}
                fill="green"
                style={{ cursor: 'pointer', outline: 'none' }}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>*/}
        <Link to={{pathname: '/'}} className="surface-button">
            <Button size="lg" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Главная страница</Button>
        </Link>
    </main>)
}
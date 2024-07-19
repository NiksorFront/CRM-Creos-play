import { Avatar, Button, Card, CardBody, Checkbox, Tab, Tabs } from "@nextui-org/react";
import { Key, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../utils/API";
import { designerType } from "../../utils/types";


function Dsgner({adoutDesigner, done, inProgress}: {adoutDesigner: designerType, done:boolean, inProgress:boolean}){
    const doneIssuesLen = adoutDesigner.issues.filter((issue) => issue.status === 'Done').length;
    const inProgressIssuesLen = adoutDesigner.issues.filter((issue) => issue.status === 'In Progress').length;

    if(done === false && doneIssuesLen > 0){
        return <></>
    }
    if(inProgress === false && inProgressIssuesLen > 0){
        return <></>
    }

    return(<section className="dsgner__wrapper">
        <div className="dsgner__ava">
            <Avatar src={adoutDesigner.avatar} name={adoutDesigner.username} size="lg"/>
            <div>
                <h2 className="dsgner__title">{adoutDesigner.username}</h2>
                <p className="dsgner__text">{adoutDesigner.email}</p>
            </div>
        </div>
        <div className="dsgner__issues">
            <p>Задач выполнено: {doneIssuesLen}</p>
            <p>Задач в процессе: {inProgressIssuesLen}</p>
        </div>
    </section>)
}

export default function DesignerPage(){
    const [desingers, setDesingers] = useState<Array<designerType>>([]);
    //const [render, setRender] = useState<boolean>(false); //мини костыль, чтобы отображать дизанеров только после всех сортировок и не тратить ресурсы на кучу пререндеров, пока все сортировки меняют desingers на такой же, но отсортированный
    const [tab, setTab] = useState<Key>("names");
    const [done, setDone] = useState<boolean>(true);
    const [inProgress, setInProgress] = useState<boolean>(true);
    const [, updateState] = useState<Object>();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        if(desingers[0] === undefined){
            request('designer/').then(res => setDesingers(res.results))
                                .catch(err => console.log(err));
        }else{
            (tab === "names") ? sortingByName() : sortingByEmail();
        }
    }, [desingers, tab])

    function sortingByName(){ //Запрос к YaGPT: Есть массив объектов, каждый из которых имеет такой формат:  {avatar: 'url', username: 'name', email: 'mail', thumbnails: {…}, issues: Array(15)}. Напиши функцию на JavaScript, которая будет возвращать этот же массив, но отсортированный с имена по алфавиту
        setDesingers(desingers.sort((a, b) => a.username.localeCompare(b.username)));
        forceUpdate();
    }
    function sortingByEmail(){ //Запрос к YaGPT: Есть массив объектов, каждый из которых имеет такой формат: {avatar: 'url', username: 'name', email: 'mail', thumbnails: {…}, issues: Array(15)}. Напиши функцию на JavaScript, которая будет возвращать этот же массив, но отсортированный с почтами по алфавиту
        setDesingers(desingers.sort((a, b) => a.email.localeCompare(b.email)));
        forceUpdate();
    }
    return(<main className="designersPage">
        <h1 className="title">Все дизайнеры</h1>
        <div className="settings">
            <div className="sorting">
                <p className="designer__title">cортировка:</p>
                <Tabs aria-label="Options" variant="bordered" color="success" onSelectionChange={setTab}>
                    <Tab key="names" className="fontWeight" title="имена по алфавиту"></Tab>
                    <Tab key="emails" className="fontWeight"  title="почта по алфавиту"></Tab>
                </Tabs>
            </div>
            <div className="filters">
                <p className="designer__title">статус проектов:</p>
                <Checkbox defaultSelected color="success" onValueChange={setDone}>Done</Checkbox>
                <Checkbox defaultSelected color="success" onValueChange={setInProgress}>In Progress</Checkbox>
            </div>
        </div>
        {desingers && desingers.map((desinger, i) => <Dsgner key={i} adoutDesigner={desinger} done={done} inProgress={inProgress}/>)}
        <Link to={{pathname: '/'}} className="surface-button">
            <Button size="lg" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Главная страница</Button>
        </Link>
    </main>)
}
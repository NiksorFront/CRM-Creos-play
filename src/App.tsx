import { useEffect} from 'react'
import './App.css'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import {commentType} from "./utils/types";
import Comment from "./components/comment/comment";
import Designer from './components/designer/designer';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { useSelector } from './utils/redux-types';
import { useDispatch } from 'react-redux';
import { requestComments } from './services/slices/commentsSlice';
import { requestIssues } from './services/slices/issuesSlice';
import { requestDesigners } from './services/slices/designerSlice';

type DesignerType = [string, Array<number>]

function App() {
  const dispatch = useDispatch();
  const language = useSelector(state => state.language);
  const comments = useSelector(state => state.comments);
  const issues = useSelector(state => state.issues);

  useEffect(() => {
    dispatch(requestComments());
    dispatch(requestIssues());
    dispatch(requestDesigners()); //Запращиваю тут, чтобы не задудосить сервер при каждом вызове <Designer />
  }, [])

  function sorting(object:object):[string, any][]{
    return Object.entries(object).sort((a, b) => { //Запрос к YaGPT, который написал этот код: Есть объект с дизайнерами, где к каждому привязан массив внутри которого указано среднее время выполнения задачи и число выполненных задач. Пример: const designers = { designer1: [5, 20], designer2: [3, 15], ... }; Напиши код на JavaScript, который отсортирует этот объект, так, чтобы за меньшее время было выполнено максимальное число задач.
      if (a[1][1] === b[1][1]) {
        return a[1][0] - b[1][0];
      } else {
        return b[1][1] - a[1][1];
      }                 
  });
  }

  const sortLastComments = (count: number) => {
    let whenCommentsAreLeft: {[key: number]: commentType} = {}
    comments.forEach(comment => {
      const dateCreated = comment.date_created.split("T");
      const dateTime = {date: dateCreated[0].split("-"),
                        time: dateCreated[1].slice(0,8).split(':')}
      //Возможно у меня какой-то баг, но короче месяцы начинаются с нуля, а не еденицы, поэтому везде в new Date() пишу -1 у месяца.               
      //@ts-ignore
      const millisenods = new Date() - new Date(dateTime.date[0], dateTime.date[1]-1, dateTime.date[2], dateTime.time[0], dateTime.time[1], dateTime.time[2]);
      Object.assign(whenCommentsAreLeft, {[millisenods]: comment})
    })

    /*Возвращаем топ сount самых быстрых и эффективных дизайнеров*/
    return sorting(whenCommentsAreLeft).slice(0,count);
  }

  const sortTopDesigners = (count: number) => {
    /*Создаём объект с дизайнерами, где к каждому привязан массив с временем выполнения каждой из задач, что у него были*/
    let namesDsgnrs: {[key: string]: Array<number>} = {}
    issues.forEach(issue => {
      if(issue.status === "Done"){
        const finishDate = issue.date_finished_by_designer.split('T');
        const finish = {date: finishDate[0].split('-'), 
                        time: finishDate[1].slice(0,8).split(':')}
        const startDate = issue.date_started_by_designer.split('T');
        const start = {date: startDate[0].split('-'), 
                      time: startDate[1].slice(0,8).split(':')};
        //@ts-ignore
        const millisenods = new Date(finish.date[0], finish.date[1]-1, finish.date[2], finish.time[0], finish.time[1], finish.time[2]) - new Date(start.date[0], start.date[1]-1, start.date[2], start.time[0], start.time[1], start.time[2]);
        
        if (namesDsgnrs.hasOwnProperty(issue.designer)){  //Если ключ надён
          Object.keys(namesDsgnrs).forEach(key => {if(key === issue.designer){namesDsgnrs[key] = [...namesDsgnrs[key], millisenods]}}) //Добавляем к его списку новые millisenods
        }else{
          Object.assign(namesDsgnrs, {[issue.designer]: [millisenods]}); //Создаём как новый
        }
      }
    })

    /*Создаём объект с дизайнерами, к которым привязаны массивы с средним времени потраченным на каждую его задачу и числом задач*/
    let timeTasks: {[key: string]: Array<number>} = {};
    Object.keys(namesDsgnrs).forEach(dsgnr => {
      const times: Array<number> = namesDsgnrs[dsgnr];
      let sumMillisenod = 0; 
      let numTasks = 0;
      for (numTasks; numTasks < times.length; numTasks++){
          //@ts-ignore
          sumMillisenod += parseInt(times[numTasks])
      }
      Object.assign(timeTasks, {[dsgnr]: [sumMillisenod/numTasks, numTasks]})
      //const sumMillisenod = namesDsgnrs[dsgnr].reduce((a, b, i) => {numberTasks+=i; return(ParseInt(a) + ParseInt(b))}, 0);
      //Object.assign(timeTasks, {[dsgnr]: [namesDsgnrs[dsgnr]]})

    });
    
    /*Возвращаем топ сount самых быстрых и эффективных дизайнеров*/
    return sorting(timeTasks).slice(0,count);
  }
  

  return (
    <>
      <Header/>
      <main className="comment-and-design">
        <section className='column'>
          <h1 className='title'>{`10 ${language === "Русский" ? 'комментариев' : 'comments'}`}</h1>
          {comments && sortLastComments(10).map((cmnt: [string, commentType], i) => i<10 && <Comment key={i} comment={cmnt}/>)}
        </section>
        <section className='column'>
          <h1 className='title'>{`10 ${language === "Русский" ? 'дизайнеров' : 'designers'}`}</h1> 
          {issues && sortTopDesigners(10).map((designer: DesignerType, i) => <Designer key={i} username={designer[0]} averageTime={designer[1][0]} numIssue={designer[1][1]}/>)}
        </section>
      </main>
      <Footer/>
      <Link to={{pathname: '/tasks'}} className="surface-button">
        <Button size="lg" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">{`${language === "Русский" ? 'Страница задач' : 'Issues page'}`}</Button>
      </Link>
      <Link to={{pathname: '/designer'}} className="surface-button-2">
        <Button size="lg" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">{`${language === "Русский" ? 'Страница дизайнеров' : 'Designers page'}`}</Button>
      </Link>
    </>
  )
}

export default App
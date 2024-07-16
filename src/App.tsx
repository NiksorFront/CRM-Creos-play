import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import request from './utils/API';
import {commentType, issueType, designerType} from "./utils/types";
import Comment from "./components/comment/comment";
import Designer from './components/designer/designer';

function App() {
  const [language, setLanguage] = useState("Русский");
  const [comments, setComments] = useState<Array<commentType>>([]);
  const [desingers, setDesingers] = useState<Array<designerType>>([]);
  const [issues, setIssues] = useState<Array<issueType>>([]);

  useEffect(() => {
    //request('issue/') //Для страницы задач
    request('comment/').then(res => setComments(res))
                       .catch(err => console.log(err));
    // request('designer/').then(res => setDesingers(res.results))
    //                     .catch(err => console.log(err));
    request('issue/').then(res => setIssues(res))
                      .catch(err => console.log(err));

    console.log(comments, issues, desingers)
  }, [])

  /*const sortTopDesigners = () => {
    issues.forEach(issue => {
      if(issue.status === "Done"){
        const finishDate = issue.date_finished_by_designer.split('T');
        const finish = {date: finishDate[0].split('-'), 
                        time: finishDate[1].slice(0,8).split(':')}
        const startDate = issue.date_started_by_designer.split('T');
        const start = {date: startDate[0].split('-'), 
                      time: startDate[1].slice(0,8).split(':')};

        const millisenods = new Date(finish.date[0], finish.date[1], finish.date[2], finish.time[0], finish.time[1], finish.time[2]) - new Date(start.date[0], start.date[1], start.date[2], start.time[0], start.time[1], start.time[2]);
      }
    })
    // console.log(top)
  }*/

  return (
    <>
      <Header/>
      <main className="comment-and-design">
        <section className='column'>
          <h1 className='title'>10 комментариев</h1>
          {comments.map((cmnt: commentType, i) => i<10 && <Comment key={i} comment={cmnt}/>)}
        </section>
        <section className='column'>
          <h1 className='title'>10 дизайнеров</h1> 
          {issues.map((isu: issueType, i) => {
            return <Designer key={i} username={isu.designer} time={'1'} issue={'12'}/>
            })}
        </section>
      </main>
      <Footer/>
    </>
  )
}

export default App

//let top = {one: [0, 0], two: [0, 0], three: [0, 0], four: [0, 0], five: [0, 0], six: [0, 0], seven: [0, 0], eight: [0, 0], nine: [0, 0], ten: [0, 0]}
// millisenods > top.ten[0]   ? top.ten   = [millisenods, issue.id] :
//         millisenods > top.nine[0]  ? top.nine  = [millisenods, issue.id] :
//         millisenods > top.eight[0] ? top.eight = [millisenods, issue.id] :
//         millisenods > top.seven[0] ? top.seven = [millisenods, issue.id] :
//         millisenods > top.six[0]   ? top.six   = [millisenods, issue.id] :
//         millisenods > top.five[0]  ? top.five  = [millisenods, issue.id] :
//         millisenods > top.four[0]  ? top.four  = [millisenods, issue.id] :
//         millisenods > top.three[0] ? top.three = [millisenods, issue.id] :
//         millisenods > top.two[0]   ? top.two   = [millisenods, issue.id] :
//         millisenods > top.one[0]  && (top.one  = [millisenods, issue.id])
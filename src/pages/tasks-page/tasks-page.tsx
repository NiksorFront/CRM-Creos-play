import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import request from "../../utils/API";
import { issueType } from "../../utils/types";

export default function TasksPage(){
    const [issues, setIssues] = useState<Array<issueType>>([]);

    useEffect(() => {
        request('issue/').then(res => setIssues(res))
                         .catch(err => console.log(err));
        console.log(issues)
        
    }, [])
     //request('issue/') //Для страницы задач
    
    return(<div>
        <Link to={{pathname: '/'}} className="surface-button">
            <Button size="lg" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Главная страница</Button>
        </Link>
    </div>)
}
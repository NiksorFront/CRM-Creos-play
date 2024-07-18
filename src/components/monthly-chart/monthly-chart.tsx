import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, XAxis, YAxis } from "recharts";
import whatMonth from "../../utils/whatMonth";
import {weekType} from "../../utils/types";

type dataType = {number: string, received: number, expeness: number, earned: number};
export default function MonthlyChart({month}:{month:weekType}){
    const data: dataType[] = [];
    Object.keys(month).reverse().forEach(week => {
      const chart = {number: week, 
                     received: month[week].received, 
                     expeness: month[week].expeness, 
                     earned: month[week].earned};
      data.push(chart);
    })
    
    // console.log(whatMonth(1,"Русский"));

    return(<section className="chart">
      <p>{whatMonth(parseInt(data[0].number),"Русский")}</p>{/*Кривенько работает, надо пофиксить короч, дэм*/}
      <ResponsiveContainer>
          <BarChart data={data} >
            <XAxis dataKey="number" />
            <YAxis />
            {/* <Legend /> */}
            <Bar dataKey="received" fill="#3ed886" label={{ fill: 'gray', fontSize: 10 }} />
            <Bar dataKey="expeness" fill="#e45353" label={{ fill: 'gray', fontSize: 10 }} />
            <Bar dataKey="earned"   fill="#b9e453" label={{ fill: 'gray', fontSize: 10 }} />
          </BarChart>
      </ResponsiveContainer>
    </section>)
}
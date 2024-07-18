export default function whatMonth(week:number, lang: string):string{
    let month = "";

    (week <= 5) ? month = lang === "Русский" ? "Январь" : "January":
    (week <= 9) ? month = lang === "Русский" ? "Февраль" : "February" :
    (week <= 13) ? month = lang === "Русский" ? "Март" : "March" :
    (week <= 18) ? month = lang === "Русский" ? "Апрель" : "April" :
    (week <= 22) ? month = lang === "Русский" ? "Май" : "May" :
    (week <= 26) ? month = lang === "Русский" ? "Июнь" : "June" :
    (week <= 31) ? month = lang === "Русский" ? "Июль" : "July" :
    (week <= 35) ? month = lang === "Русский" ? "Август" : "August" :
    (week <= 39) ? month = lang === "Русский" ? "Сентябрь" : "September" :
    (week <= 43) ? month = lang === "Русский" ? "Октябрь" : "October" :
    (week <= 47) ? month = lang === "Русский" ? "Ноябрь" : "November" :
                   month = lang === "Русский" ? "Декабрь" : "December"

    return month;
}
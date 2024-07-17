import { Button, Switch } from "@nextui-org/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {MoonIcon} from "./MoonIcon";
import {SunIcon} from "./SunIcon";

export default function Header(){
    // const [mounted, setMounted] = useState(false);
    const [workingWeek, setWorkingWeek] = useState();
    const [language, setLanguage] = useState("Русский");
    const {theme, setTheme} = useTheme("dark");

    useEffect(() => {
        const date = new Date() - new Date(new Date().getFullYear(), '00', '01', '11', '00', '00');
        setWorkingWeek(Math.ceil(date/1000/60/60/24/7));
    }, [])

    // if(!mounted) return null

    return(<header className="header">
        <Button variant="faded" onClick={() => language ==="Русский" ? setLanguage("English") : setLanguage("Русский")}>
            {language}
        </Button> 

        <p className="text">{language ==="Русский" ? `${workingWeek} Рабочая неделя` : `${workingWeek} Working week`}</p>

        <Switch
            defaultSelected
            size="lg"
            color="success"
            thumbIcon={() => theme === "dark" ? <MoonIcon /> : <SunIcon />}
            onValueChange={() => theme === "dark" ? setTheme('light') : setTheme('dark')}
            >
        </Switch>
    </header>)
}
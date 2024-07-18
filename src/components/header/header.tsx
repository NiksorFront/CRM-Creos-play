import { Button, Switch } from "@nextui-org/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {MoonIcon} from "./MoonIcon";
import {SunIcon} from "./SunIcon";
import numberWorkingWeek from "../../utils/workingWeek";

export default function Header(){
    // const [mounted, setMounted] = useState(false);
    const [language, setLanguage] = useState("Русский");
    const {theme, setTheme} = useTheme();

    // if(!mounted) return null

    return(<header className="header">
        <Button variant="faded" onClick={() => language ==="Русский" ? setLanguage("English") : setLanguage("Русский")}>
            {language}
        </Button> 

        <p className="text">{language ==="Русский" ? `${numberWorkingWeek()} Рабочая неделя` : `${numberWorkingWeek()} Working week`}</p>

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
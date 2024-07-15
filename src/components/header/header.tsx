import { Button, Switch } from "@nextui-org/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import {MoonIcon} from "./MoonIcon";
import {SunIcon} from "./SunIcon";

export default function Header(){
    const [mounted, setMounted] = useState(false);
    const [language, setLanguage] = useState("Русский");
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return(<header className="header">
        <Button variant="faded" onClick={() => language ==="Русский" ? setLanguage("English") : setLanguage("Русский")}>
            {language}
        </Button> 

        <p className="text">Тут будут темка классная, да. Дата недели чёт такое</p>

        <Switch
            defaultSelected
            size="lg"
            color="success"
            thumbIcon={() => theme === "dark" ? <SunIcon /> : <MoonIcon />}
            onValueChange={() => theme === "dark" ? setTheme('light') : setTheme('dark')}
            >
        </Switch>
    </header>)
}
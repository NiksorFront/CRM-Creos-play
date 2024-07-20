import { Button, Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import {MoonIcon} from "./MoonIcon";
import {SunIcon} from "./SunIcon";
import numberWorkingWeek from "../../utils/workingWeek";
import { useDispatch, useSelector } from "../../utils/redux-types";
import { changeLanguage } from "../../services/slices/languageSlice";

export default function Header(){
    const language = useSelector((state) => state.language);
    const dispatch = useDispatch();
    const {theme, setTheme} = useTheme();

    return(<header className="header">
        <Button variant="faded" onClick={() => dispatch(changeLanguage())}>
            {language}
        </Button> 

        <p className="header__text">{`${numberWorkingWeek()} ${language ==="Русский" ? "Рабочая неделя" : "Working week"}`}</p>

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
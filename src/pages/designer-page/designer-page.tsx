import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function DesignerPage(){
    return(<main>
        <Link to={{pathname: '/'}} className="surface-button">
            <Button size="lg" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Главная страница</Button>
        </Link>
    </main>)
}
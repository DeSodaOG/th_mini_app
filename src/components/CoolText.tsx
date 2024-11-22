import { FC, ReactNode } from "react";
import "./Styles/cooltext.css";


interface CoolTextProps {
    children: ReactNode;
}

export const CoolText: FC<CoolTextProps> = ({children}) => {

    return <div >
        <h1 className="fancy-wipe">
            <span className="text">
                {children}
            </span>
            <span className="wipe-in">
                {children}
            </span>
            <span className="blur-in">
                {children}
            </span>
        </h1>
    </div>
};

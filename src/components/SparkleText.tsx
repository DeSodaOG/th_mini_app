import { FC, ReactNode } from "react";
import "./Styles/sparkletext.css";

interface CoolTextProps {
    children: ReactNode;
}

export const SparkleText: FC<CoolTextProps> = ({ children }) => {

    return <div className="sparkle">
        {children}
    </div>
};

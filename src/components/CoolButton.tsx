import { FC, ReactNode } from "react";
import "./Styles/coolbutton.css";

interface CoolButtonProps {
    children: ReactNode;
    color?: string;
}

export const CoolButton: FC<CoolButtonProps> = ({ children }) => {

    return <div className="coolbutton">
        <button className="" data-effect="flicker">
            <span className="text">{children}</span>
            <span className="shimmer"></span>
        </button>
    </div>
};

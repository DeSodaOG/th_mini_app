import { FC, ReactNode } from "react";
import "./Styles/neontext.css";

interface CoolTextProps {
    children: ReactNode;
    color?: string;
}

export const NeonText: FC<CoolTextProps> = ({ children, color = 'pink' }) => {

    return <div>
        {
            color === 'pink' ? <h2 className="neon pink">
                {children}
            </h2> : <h2 className="neon turquoise">
                {children}
            </h2>
        }
    </div>
};

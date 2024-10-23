import { NavLink, useLocation } from "react-router-dom";
import { Tabbar } from '@telegram-apps/telegram-ui';
import { FaFireAlt } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { RiDashboard3Line } from "react-icons/ri";
import { TiDocumentText } from "react-icons/ti";

const tabs = [{
    id: '1',
    text: 'Home',
    href: '/',
    Icon: <FaFireAlt size='35px' color="#fff"/>
}, {
    id: '2',
    text: 'Leaders',
    href: '/leaders',
    Icon: <MdLeaderboard size='35px' color="#fff" />
}, {
    id: '3',
    text: 'Dashboard',
    href: '/dashboard',
    Icon: <RiDashboard3Line size='35px' color="#fff" />
}, {
    id: '4',
    text: 'WIKI',
    href: '/wiki',
    Icon: <TiDocumentText size='35px' color="#fff" />
}]

export const Footer = () => {
    const location = useLocation();

    return <div style={{ height: 100 }}>
        <Tabbar className="flex justify-between rounded-full bg-purple-950 m-2 opacity-90 text-white">
            {tabs.map(({ id, text, href, Icon }) => {
                return <NavLink key={id} to={href}>
                    <Tabbar.Item key={id} text={text} selected={href === location.pathname}>
                        {Icon}
                    </Tabbar.Item>
                </NavLink>
            })}
        </Tabbar>
    </div>
};

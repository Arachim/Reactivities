import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

export default function ActivityFilters() {
    return (
        <>
            <Menu vertical size="large" style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color="teal" content='סינון' />
                <Menu.Item content="כל הפעילויות" />
                <Menu.Item content="אני הולך" />
                <Menu.Item content="אני מארח" />
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}
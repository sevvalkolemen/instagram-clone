import { useState } from "react";
import Header from "./components/header";
import Messages from "./components/messages";
import Reply from "./components/reply";

export default function Chat(){

    const user = {
        name: 'Şevval Kölemen',
        avatar: "https://pbs.twimg.com/profile_images/1217130377019641856/DH_g6_Rp_400x400.jpg" 
    }

    const [messages, setMessages] = useState([
        {
            from: {
                id: 'FyNLAT65xVTyIy32geDDMBMqHsQ2',
                name: 'Şevval Kölemen',
                username: 'sevvalkolemen',
                avatar: "https://pbs.twimg.com/profile_images/1217130377019641856/DH_g6_Rp_400x400.jpg"
            },
            message: 'text1'

        },
        {
            from: {
                id: 'FyNLAT65xVTyIy32geDDMBMqHsQ2',
                name: 'Şevval Kölemen',
                username: 'sevvalkolemen',
                avatar: "https://pbs.twimg.com/profile_images/1217130377019641856/DH_g6_Rp_400x400.jpg"
            },
            message: 'text2',

        }
    ])

    return (
        <div className="flex-1">
            <Header user={user}/>
            <Messages messages={messages}/>

            <Reply  setMessages={setMessages} />
        </div>
    )
}
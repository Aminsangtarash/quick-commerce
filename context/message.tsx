
'use client'
import React, { createContext, ReactNode, useState } from 'react';

export const MessageContext = createContext({});

type MessageProviderProps = {
    children: ReactNode;
}

type Message = {
    open: boolean;
    text: string;
    variant: "error" | "info" | "success" | "warning"
}

export const MessageProvider = ({ children }: MessageProviderProps) => {
    const [message, setMessage] = useState<Message>({
        open: false,
        text: "",
        variant: "info"
    });

    const showMessage = (value: Message) => {
        setMessage(value)
    };

    return (
        <MessageContext.Provider value={{ message, showMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageProvider;  
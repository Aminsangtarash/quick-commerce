'use client'
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export type Message = {
    open: boolean;
    variant?: "error" | "success" | "warning" | "info";
    text?: string;
}

type MessengerProps = {
    message: Message
}

const defaultMessageValue: Message = {
    open: false,
    variant: "info",
    text: "",
}

function Messenger({ message: newMessage }: MessengerProps) {
    const [message, setMessage] = useState<Message>(defaultMessageValue)

    useEffect(() => {
        const time = setTimeout(() => setMessage(newMessage), 500);
        if (newMessage.open) {
            const timeout = setTimeout(() => {
                setMessage((prev) => ({ ...prev, open: false }));
            }, 3000);

            return () => clearTimeout(timeout);
        }
        return () => clearTimeout(time)
    }, [newMessage])

    const variantStyles = {
        info: "bg-[var(--info)] ",
        success: "bg-[var(--success)]",
        warning: "bg-[var(--warning)]",
        error: "bg-[var(--error)]",
    };

    const openStyles = {
        true: "translate-x-[-10%]",
        false: "translate-x-[120%]"
    }

    const classes = twMerge("fixed right-0 top-10 py-2 px-4 z-1101 rounded-lg text-white shadow-lg transition delay-150", variantStyles[message?.variant ?? "info"], openStyles[`${message.open}`])

    return (
        <div className={classes}>
            {message.text ?? ""}
        </div>
    );
}

export default Messenger;
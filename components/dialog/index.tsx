import { MouseEvent, ReactNode } from "react";

type DialogProps = {
    open: boolean;
    onClose?: () => void;
    children: ReactNode;
}

function Dialog({ open, children, onClose }: DialogProps) {

    const handleStopPropagation = (event: MouseEvent) => {
        event.stopPropagation()
    }

    return (
        open ? 
            <div className="fixed right-0 top-0 bottom-0 left-0 bg-[#000000aa] flex justify-center items-center z-1100" onClick={onClose}>
                <div className="bg-white rounded-lg shadow-lg p-10" onClick={handleStopPropagation}>
                    {children}
                </div>
            </div>
            :
            <></>
    );
}

export default Dialog;
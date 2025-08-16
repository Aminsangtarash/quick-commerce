
function CloseIcon({ color = "#191919", ...props }) {
    return (
        <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M1 1L17 17" stroke={color} />
            <path d="M17 1L0.999999 17" stroke={color} />
        </svg>
    );
}

export default CloseIcon;


import type { JSX } from "react";

type ErrorMessageProps = {
    children: JSX.Element
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
    return (
        <div className="text-red-500 bg-red-200 border-l-2 border-red-500 p-2 mt-1 text-sm font-semibold">{children}</div>
    );
}

export default ErrorMessage;
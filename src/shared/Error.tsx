type Props = {
    status: 404 | 500 | 401;
    message?: string;
    errorType: "NOT FOUND" | "Internal Server Error" | "Unauthorized";
};

export const ErrorPage = ({status, message, errorType}: Props) => {
    return <div>
        <h3>{status} {errorType}</h3>
        <p>{message}</p>
    </div>
};
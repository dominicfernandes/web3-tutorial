import React from "react";
import { useWeb3 } from "../hooks/useWeb3";
import { ErrorPage } from "../shared/Error";

export const withAuthentication = (Component: React.ReactNode) => {
    return (() => {
        const {isConnected} = useWeb3();

        return <>
        {isConnected ? Component : <ErrorPage errorType="Unauthorized" status={401}/>}
        </>
    })();
}
import { useEffect, useState } from "react";
import Web3 from "web3";

export const useWeb3 = () => {
    const [web3, setWeb3] = useState<Web3>();
    const [provider, setProvider] = useState<any>();
    const [activeAccount, setActiveAccount] = useState<string>();
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const getProvider = () => {
        const provider = (window as any).ethereum;

        // check if metamask is installed
        if(!provider) {
            throw new Error("Metamask not installed on the browser.");
        }
    
        return provider;
    }

    const initializeWeb3 = () => { 
        const web3Provider = getProvider();
        const web3Instance = new Web3(web3Provider);
        setProvider(web3Provider);
        setWeb3(new Web3(web3Provider));

        // check if user is already connected.
        web3Instance.eth.getAccounts()
        .then((accounts) => {
            if(accounts.length) {
                setIsConnected(true);
                setActiveAccount(accounts[0]);
            }
        });

        registerEvents(web3Provider);
    };

    const connectWallet = async() => {
        const account = await web3?.eth.requestAccounts();
        if(!account?.length) throw new Error("could not find any accounts in wallet.");
        setActiveAccount(account[0]);
        setIsConnected(true);
    };


    const registerEvents = (provider: any) => {
        provider.on("accountsChanged", (accounts: string[]) => {
            setActiveAccount(accounts[0]);
        });

        provider.on('chainChanged', () => {
            window.location.reload();
        });
    };

    useEffect(() => {
        initializeWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return {
        web3,
        provider,
        activeAccount,
        isConnected,
        setIsConnected,
        connectWallet
    }
};
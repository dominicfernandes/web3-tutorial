import { useEffect, useState } from "react";
import Web3 from "web3";
import { AbiItem } from 'web3-utils'

export let web3: Web3;

export const getProvider = () => {
    const provider = (window as any).ethereum;

    // check if metamask is installed
    if(!provider) {
        throw new Error("Metamask not installed on the browser.");
    }

    return provider;
};

const getWeb3 = (): Web3 => {
    if(web3) return web3;
    return new Web3(getProvider());
};
web3 = getWeb3();

export const useWeb3 = () => {
    const [activeAccount, setActiveAccount] = useState<string>();
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [chainId, setChainId] = useState<number>();

    const initializeWeb3 = () => { 
        // check if user is already connected.
        web3.eth.getAccounts()
        .then(async(accounts) => {
            if(accounts.length) {
                setIsConnected(true);
                setActiveAccount(accounts[0]);
                const networkId = await web3.eth.getChainId();
                setChainId(web3.utils.toDecimal(networkId));
            }
        });

        registerEvents();
    };

    const connectWallet = async() => {
        const account = await web3.eth.requestAccounts();
        const networkId = await web3.eth.getChainId();

        if(!account?.length) throw new Error("could not find any accounts in wallet.");

        setActiveAccount(account[0]);
        setIsConnected(true);
        setChainId(web3.utils.toDecimal(networkId));
    };


    const registerEvents = () => {
        const provider = getProvider();
        provider.on("accountsChanged", (accounts: string[]) => {
            setActiveAccount(accounts[0]);
        });

        provider.on('chainChanged', (chainId: number) => {
            setChainId(web3.utils.toDecimal(chainId));
        });
    };

    const createContract = (abi: AbiItem[], contractAddress: string) => {
        return new web3.eth.Contract(abi, contractAddress);
    }

    useEffect(() => {
        initializeWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return {
        activeAccount,
        isConnected,
        chainId,
        setIsConnected,
        connectWallet,
        createContract
    }
};
import Web3 from "web3";

let web3: Web3;


export const getProvider = () => {
    const provider = (window as any).ethereum;

    // check if metamask is installed
    if(!provider) {
        throw new Error("Metamask not installed on the browser.");
    }

    return provider;
};

export const getWeb3 = () => {
    if(web3) return web3;
    web3 = new Web3(getProvider());
    return web3;
}
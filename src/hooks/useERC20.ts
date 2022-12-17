import ERC20Abi from '../abi/ERC20.json';
import { useWeb3, web3 } from './useWeb3';
import { AbiItem } from "web3-utils";

export const useERC20 = () => {
    const { createContract, activeAccount } = useWeb3();

    const getTokenName = async (tokenAddress: string) => {
        const contract = createContract(ERC20Abi as AbiItem[], tokenAddress);
        return await contract.methods.name().call();
    };

    const approveToken = async (tokenAddress: string, spenderAddress: string, tokenValue: number) => {
        const contract = createContract(ERC20Abi as AbiItem[], tokenAddress);
        const result = await contract.methods.approve(spenderAddress, web3.utils.toWei(tokenValue.toString())).send({
            from: activeAccount,
        });
        return result;
    };

    return {
        getTokenName,
        approveToken,
    }
}
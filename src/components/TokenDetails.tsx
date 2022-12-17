import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useERC20 } from '../hooks/useERC20';
import { useWeb3 } from '../hooks/useWeb3';
import { tokenAddress } from '../tokenConfigs';

export const TokenDetails = () => {
    const [tokenName, setTokenName] = useState<string>();
    const { chainId } = useWeb3();
    const { getTokenName, approveToken } = useERC20();
    const [spender, setSpender] = useState<string>("");
    const [allowance, setAllowance] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleApprove = async() => {
        setIsLoading(true);
        try {
            if(!chainId) throw new Error("Could not find chainId");
            const contractAddress = tokenAddress[chainId].address
            const result = await approveToken(contractAddress, spender, allowance);
            console.log(result);
        } finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (chainId) {
            const contractAddress = tokenAddress[chainId].address
            getTokenName(contractAddress)
                .then((name) => setTokenName(name))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chainId]);
    return <div>
        <p>{tokenName}</p>
        <Form.Control placeholder='Spender' type='text' onChange={(e) => setSpender(e.target.value)}/>
        <br/>
        <Form.Control placeholder='allowance' type='number' onChange={(e) => setAllowance(+e.target.value)}/>
        <br/>
        <Button onClick={handleApprove} disabled={isLoading}>Approve</Button>
    </div>
}
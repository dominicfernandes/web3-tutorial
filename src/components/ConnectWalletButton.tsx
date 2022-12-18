import { useWeb3 } from "../hooks/useWeb3"
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom';

export const ConnectWalletButton = () => {
    const { connectWallet, isConnected } = useWeb3();
    const navigate = useNavigate();
        
    const handleWalletConnection = async() => {
        await connectWallet();
        navigate("/allwance");
    };

    return <Button disabled={isConnected} variant="light"  onClick={handleWalletConnection}>
        <FontAwesomeIcon icon={faCircle} color={isConnected ? "green" : "red"} />
        Connect
    </Button>
}
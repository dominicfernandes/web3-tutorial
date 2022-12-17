import { useWeb3 } from "../hooks/useWeb3"
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export const ConnectWalletButton = () => {
    const { connectWallet, isConnected } = useWeb3();

    return <Button disabled={isConnected} variant="light"  onClick={connectWallet}>
        <FontAwesomeIcon icon={faCircle} color={isConnected ? "green" : "red"} />
        Connect
    </Button>
}
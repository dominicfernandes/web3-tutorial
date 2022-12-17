export interface TokenConfig {
    [key:number]: {
        address: string,
    }
}

export const tokenAddress: TokenConfig = {
    1: {
        address: "0x514910771AF9Ca656af840dff83E8264EcF986CA"
    },
    5: {
        address: "0x7af963cf6d228e564e2a0aa0ddbf06210b38615d"
    },
};

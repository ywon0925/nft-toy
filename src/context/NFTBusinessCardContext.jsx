import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const NFTBusinessCardContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const NFTBusinessCardContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        NFTBusinessCardContract
    });
}

export const NFTBusinessCardProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')


    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                // getAllBusinessCard();
            } else {
                console.log("No Accounts Found");
            }
            console.log(accounts);
        }catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <NFTBusinessCardContext.Provider value={{ connectWallet, currentAccount }}>
            {children}
        </NFTBusinessCardContext.Provider>
    );
}
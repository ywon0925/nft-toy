import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const NFTBusinessCardContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const NFTBusinessCardContract = new ethers.Contract(contractAddress, contractABI, signer);

    return NFTBusinessCardContract;
}

export const NFTBusinessCardProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setFormData] = useState({jobTitle: '',name:'', exp:'',resume:''})

    const handleChange = (e, name) =>{
        setFormData((prevState)=>({...prevState, [name]: e.target.value}));
    }
    const handleFileChange = (e, name) =>{
        setFormData((prevState)=>({...prevState, [name]: e.target.files[0]}));   
    }
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

    const createNFT = async() => {
        try{
            if(!ethereum) return alert("Please intstall metamask");
            const {jobTitle, name, exp, resume} = formData;
            console.log(jobTitle, name, exp, resume);
            const nftContract = getEthereumContract();
        }catch(error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    }


    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <NFTBusinessCardContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, handleFileChange, createNFT }}>
            {children}
        </NFTBusinessCardContext.Provider>
    );
}
import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai"
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle, bsInfoCircle } from 'react-icons/bs';
import { uploadFileToIPFS } from '../pinata';


import { NFTBusinessCardContext } from "../context/NFTBusinessCardContext";
import { Loader } from './';

const commonStyles = "min-h-[70px] sm:px-0 px-2  flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
const Input = ({ placeholder, name, type, value, style, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.5"
        value={value}
        style={{ style }}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
)

const Welcome = () => {
    const { connectWallet, currentAccount, formData, createNFT, handleChange, handleFileChange } = useContext(NFTBusinessCardContext);
    const handleSubmit = (e) => {
        const { jobTitle, name, exp, resume } = formData;

        e.preventDefault();

        if (!jobTitle || !name || !exp || !resume) {
            alert("Please fill in the form.")
            return;
        }
        let response = uploadFileToIPFS(resume);

        console.log(response);
        createNFT();
    }
    const randInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    const changeColor = () => {
        let card = document.getElementById("hello")
        for (let i = 1; i < 8; i++) {
            let n1 = Math.round(Math.random() * 100)
            let n2 = Math.round(Math.random() * 100)
            let h = randInclusive(0, 360);
            let s = randInclusive(50, 100);
            let l = randInclusive(50, 100);
            let color = `${n1}% ${n2}%, hsla(${h}, ${s}%, ${l}%, 1)`;
            card.style.setProperty('--c' + i, color);
        }
    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Create <br /> Business Card NFT
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Make your business card NFT, prove your work exprience forever.
                    </p>
                    {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                        >
                            <p className="text-white text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>
                    )}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliablility
                        </div>
                        <div className={`${commonStyles}`}>
                            Security
                        </div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={`${commonStyles}`}>
                            Low Fees
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div id="hello" className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-72 my-5 eth-card white-glassmorpism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <p className="text-white font-semibold text-sm">L1</p>
                            </div>
                            <div className="grid justify-end">
                                <p className="text-white font-light text-sm">
                                    Software Engineer
                                </p>
                                <p className="text-white font-semibold text-lg">
                                    Yuseok
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start blue-glassmorphism">
                        <button className="my-2 w-full p-2 outline-none bg-transparent text-white rounded-full border-none text-sm white-glassmorphism hover:bg-[#10365b] cursor-pointer" type="button" onClick={changeColor}>Change Base Card</button>
                        <Input placeholder="Job title" name="jobTitle" type="text" handleChange={handleChange} />
                        <Input placeholder="Name" name="name" type="text" handleChange={handleChange} />
                        <Input placeholder="Year of Experience" name="exp" type="number" handleChange={handleChange} />
                        <label className ="ml-2 text-sm dark:text-gray-600 text-left" for="resume">Upload Resume</label>
                        <Input placeholder="Resume" name="resume" type="file" handleChange={handleFileChange} />

                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {false ? (
                            <Loader />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Create Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
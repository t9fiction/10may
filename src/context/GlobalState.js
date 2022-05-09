import { createContext, useEffect, useContext, useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/ABI';
import { DAI_ABI, DAI_ADDRESS } from '../utils/ABIDAI';
import { ethers } from 'ethers';
import axios from 'axios';
import { resolveProperties } from "ethers/lib/utils";

const { ethereum } = window;

const getEtherContract = async () => {
    try {
        // if (window.ethereum !== undefined) {
        if (!ethereum) {
            return alert("Metamask not installed");
        } else {
            // await requestAccount();
            const provider = new ethers.providers.Web3Provider(ethereum);
            // await window.ethereum.enable()
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            return contract;

        }
    } catch (error) {
        console.log("Wallet Not Connected", error)
    }
}

const getDAIContract = async () => {
    try {
        // if (window.ethereum !== undefined) {
        if (!ethereum) {
            return alert("Metamask not installed");
        } else {
            // await requestAccount();
            const provider = new ethers.providers.Web3Provider(ethereum);
            // await window.ethereum.enable()
            const signer = provider.getSigner();
            const contract = new ethers.Contract(DAI_ADDRESS, DAI_ABI, signer);

            return contract;

        }
    } catch (error) {
        console.log("Wallet Not Connected", error)
    }
}

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [appNumber, setAppNumber] = useState();
    const [owner, setOwner] = useState("");
    const [alreadySubmit, setAlreadySubmit] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    // const [toAccount, setToAccount] = useState();
    const [applicants, setApplicants] = useState(0);
    const [tokenSupply, setTokenSupply] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [fileUploaded, setFileUploaded] = useState('');
    const [recVideo, setRecVideo] = useState("");
    const [email, setEmail] = useState("");
    const [applicantName, setApplicantName] = useState("");
    const [country, setCountry] = useState("");
    const [amount, setAmount] = useState("");
    const [city, setCity] = useState("");
    const [industry, setIndustry] = useState("");


    const [formData, setFormData] = useState({ email: "", applicantName: "", country: "", amount: "", city: "", industry: "", currentAccount: "" })


    //-----------------------------------------
    const checkIfWallet = async () => {
        try {
            if (!ethereum) return alert("Metamask not installed");

            const accounts = await ethereum.request({ method: 'eth_accounts' })
            // await window.ethereum.enable()
            // getAllTrxs();
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found")
            }
            console.log("Accounts : ", accounts)

        } catch (error) {
            // console.log(error);

            throw new Error("No ethereum object");
        }
    }

    //-----------------------------------------
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            // console.log(error);

            throw new Error("No ethereum object");
        }
    };

    // Calling function totalSupply 
    const getTotalSupply = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            // const contract = await getEtherContract();
            const contractDai = await getDAIContract();
            // const tSupply = await contract.methods.balanceOf(currentAccount).call().then{(value)=>{resolve(new BN('0'))}}; //from internet
            // const tSupply = await contract.methods.balanceOf(currentAccount).call();
            const tSupply = await contractDai.balanceOf(currentAccount);
            console.log("Tsupply",tSupply.toString);
            // const tSupply = (await contractDai.balanceOf(currentAccount).toString());
            // const balance = (await contract.balanceOf((await provider.getSigners())[0].address)).toString(); // copied from internet
            // const tSupply = await contract.contractDaiBalance();
            setTokenSupply(ethers.utils.formatUnits(tSupply, 18));
            // window.localStorage.setItem("transactionCount", currentTrxsCount);
        } catch (error) {
            console.log("errore : ", error);
        }

    }

    // Send Application
    const sendApplication = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const contractDai = await getDAIContract();
            const contract = await getEtherContract();
            // const filePathdata = "http://abc.com";
            // console.log("fileuploaded,", fileUploaded);
            const increaseAllowanceTx = contractDai.increaseAllowance('0xE0b9260BEA6032B02D0fed630dcdEDD28f2f6821', (1*10**18));
            const sendApplicationTx = contract.sendApplication(1*10**18);
            await increaseAllowanceTx.then(sendApplicationTx);

        } catch (error) {
            console.log("errore : ", error);
        }
    }

    // Account Checking
    const accountIfOwner = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const contract = await getEtherContract();
            const getOwner = await contract.owner();
            // console.log("Get Owner ; ",getOwner);
            setOwner(getOwner);
        } catch (error) {
            console.log("errore : ", error);
        }
    }

    // Accept Application
    const acceptApplication = async () => {
        
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const contract = await getEtherContract();
            // console.log("acceptApplication working properly")
            const num = await contract.acceptApplication(0, owner);
        } catch (error) {
            console.log("errore : ", error);
        }
    }

    // Reject Application
    const rejectApplication = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const contract = await getEtherContract();
            // console.log("rejectApplication working properly")
            const num = await contract.rejectApplication(0);
        } catch (error) {
            console.log("errore : ", error);
        }
    }

    // Total pending Applications
    const getApplicantCount = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const contract = await getEtherContract();
            const num = await contract.getAppicantCount();
            setApplicants(parseInt(num));
        } catch (error) {
            console.log("errore : ", error);
        }
    }

    // Application Checking
    const checkApp = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const contract = await getEtherContract();
            setRecVideo(await contract.checkApplicationbyNum(appNumber));
            // console.log("Rec video : ", recVideo);

        } catch (error) {
            console.log("errore : ", error);
        }
    }

    const checkOwner = async () => {
        (owner.toUpperCase() == currentAccount.toUpperCase()) ? setIsOwner(true) : setIsOwner(false)
      }

    //==============================

//    useEffect(async () => {
        // await checkIfWallet();
        // await getEtherContract();
        // await getDAIContract();
    //    setLoaded(true);
//    }, []);
    
    useEffect(async () => {
        // Only get profile if we are completly loaded 
        if (loaded && (currentAccount !== 0)) {
            // get user info
            getTotalSupply();
            accountIfOwner();
        }
        // else {
            //     // dirty trick to trigger reload if something went wrong
            //     setTimeout(setLoaded(true), 500);
            // }
            // This here subscribes to changes on the loaded and accounts state
        }, [loaded, currentAccount]);
        
        useEffect(() => {
            checkOwner();
        }, [accountIfOwner]);
        
        // useEffect(() => {
        //     console.log("currentAccount is ", currentAccount);
        //     console.log("currentAccount is ", isOwner);
        // }, [checkOwner]);

    return (
        <GlobalContext.Provider value={{
            currentAccount, owner, appNumber, isOwner, checkOwner, getEtherContract, getDAIContract, setLoaded,
            setAppNumber, getApplicantCount, acceptApplication, applicants, rejectApplication, appNumber,
            fileUploaded, setFileUploaded, formData, setFormData, sendApplication, checkApp, recVideo,
            connectWallet, loaded, tokenSupply, setIndustry, industry, setCity, city, setAmount, amount, setCountry,
            country, setApplicantName, applicantName, setEmail, email, alreadySubmit, setAlreadySubmit
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const GlobalStore = () => useContext(GlobalContext);
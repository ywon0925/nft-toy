const key=process.env.REACT_APP_PINATA_API_KEY;
const secret=process.env.REACT_APP_PINATA_API_SECRET;

const axios = require('axios');
const FormData = require('form-data');

export const uploadJSONtoIPFS = async(JSONBody) => {
    const url = '';

    return axios.post(url, JSONBody, {
        headers: {
            pinata_api_key : key,
            pinata_secret_api_key : secret
        }
    })
    .then((response) => {
        return {
            success: true,
            pinataURL: "" + response.data.IpfsHash
        };
    })
    .catch((error) => {
        console.log(error);
        return {
            success: false,
            message: error.message
        }
    })
}


export const uploadFileToIPFS = async(file) => {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';


    let data = new FormData();
    data.append('file', file)

    const metadata = JSON.stringify({
        "name": 'resume',
        "keyvalues": {
            "resume": "user resume"
        }
    })
    data.append('pinataMetadata', metadata);
    data.append('pinataOptions', '{"cidVersion": 1}');

    console.log(key)
    return axios.post(url, data, {
        headers: {
            'Content-Type': `multipart/fom-data: boundary=${data._boundary}`,
            pinata_api_key : key,
            pinata_secret_api_key : secret
        }
    })
    .then((response) => {
        console.log("image uploaded", response.data.IpfsHash);
        return {
            success: true,
            pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
        };
    })
    .catch((error) => {
        console.log(error);
        return {
            success: false,
            message: error.message
        }
    })
}
import axios from "axios";
const MAX_FILE_SIZE_BYTES = 5.0 * 1024 * 1024; // 2 MB in bytes
const IPFS_DOMAIN = process.env.NEXT_PUBLIC_APP_IPFS_DOMAIN || "https://ipfs.io";

// 上传图片或者json数据方法
const pinFileToIPFS = async (file: any, type = 'image') => {
    console.log(file)
    if (file.size > MAX_FILE_SIZE_BYTES) {
        
        return null;
    }

    const formData = new FormData();

    formData.append("file", file);

    if (type === "image") {
        // Upload image
        const pinataMetadata = JSON.stringify({
            name: "Image file",
        });
        formData.append("pinataMetadata", pinataMetadata);
    } else if (type === "json") {
        // Upload JSON data
        const jsonBlob = new Blob([JSON.stringify(file)], { type: "application/json" });
        formData.append("file", jsonBlob, "data.json");
        const pinataMetadata = JSON.stringify({
            name: "JSON data",
        });
        formData.append("pinataMetadata", pinataMetadata);
    }

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": `multipart/form-data`,
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_APP_JWT_KEY}`,
            },
        });
        return IPFS_DOMAIN + res.data.IpfsHash;
    } catch (error) {
        console.error("IPFS upload failed:", error);
        throw new Error("IPFS upload failed");
    }
};

export default pinFileToIPFS;

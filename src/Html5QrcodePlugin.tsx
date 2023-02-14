import { Html5Qrcode, Html5QrcodeScanner } from "@cosva-lab/html5-qrcode";
import { CameraDevice } from "@cosva-lab/html5-qrcode/esm/core";
import { useState } from "react";
import SelectCamera from "./SelectCamera";
const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props: {
    verbose?: any;
    qrCodeSuccessCallback?: any;
    qrCodeErrorCallback?: any;
    fps?: any;
    qrbox?: any;
    aspectRatio?: any;
    disableFlip?: any;
}) => {
    let config = {
        fps: undefined,
        qrbox: undefined,
        aspectRatio: undefined,
        disableFlip: undefined,
    };
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin = (props: {
    verbose?: any;
    qrCodeSuccessCallback?: any;
    qrCodeErrorCallback?: any;
    fps?: any;
    qrbox?: any;
    aspectRatio?: any;
    disableFlip?: any;
}) => {

    const [selectedCamera, setSelectedCamera] = useState<CameraDevice>();
    const [isScanning, setIsScanning] = useState<Boolean>(false);
    const [decodedText, setDecodedText] = useState<String | null>(null);
    const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>();

    function startReadingBarcode () {
        if (selectedCamera) {
            setDecodedText(null);
            let _html5QrCode = new Html5Qrcode(qrcodeRegionId);
            setHtml5QrCode(_html5QrCode);

            _html5QrCode.start(
                selectedCamera.id,
                {
                    fps: 10,
                    qrbox: 250,
                    disableFlip: false,
                },
                (decodedText) => {
                    if (decodedText) {
                        setDecodedText(decodedText);
                    }
                },
                (errorMessage) => {
                })
                .catch((err) => {
                });

            setIsScanning(true);
        }
        else {
            alert('Select Camera First');
        }

    }

    function stopReadingBarcode () {
        if (html5QrCode !== undefined && html5QrCode !== null) {
            html5QrCode.stop().then(() => {
                setIsScanning(false);
                setDecodedText(null);
            }).catch((error) => {
                console.log('Failed ' + error)
            }).finally(() => setHtml5QrCode(null));
        }
        else {
            console.log('NOT DEFINED');
        }

    }

    return <div>


        <div className="min-w-screen h-screen fixed  left-0 top-0  flex justify-center items-center inset-0 z-50 bg-green-100 overflow-y-scroll bg-cover" style={{ backgroundImage: 'url(https://www.camcode.com/wp-content/uploads/2021/08/10414706_barcode-on-blue-background-min.jpg)' }}>

            <div className="absolute bg-gradient-to-tl from-indigo-600  to-green-600 opacity-80 inset-0 " />
            <div className="relative border-8 overflow-hidden border-gray-900 bg-gray-900 h-4/6 sm:h-3/5 rounded-3xl flex flex-col w-64  flex justify-center items-center bg-no-repeat bg-cover shadow-2xl" style={{ backgroundImage: 'url(https://us.123rf.com/450wm/markoaliaksandr/markoaliaksandr2012/markoaliaksandr201200183/markoaliaksandr201200183.jpg?ver=6)' }}>
                <div className="absolute bg-black opacity-60 inset-0 " />
                <div className="camera absolute top-4" />
                {
                    isScanning === false ?
                        <SelectCamera selectedCamera={selectedCamera} setSelectedCamera={setSelectedCamera} /> : ""
                }
                {
                    decodedText !== null ?
                        <div className="animate-bounce pointer-events-none fixed inset-x-0 top-0 sm:flex sm:justify-center sm:px-6 sm:pt-5 lg:px-8">
                            <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-green-700 py-2.5 px-6 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4">
                                <p className="text-sm leading-6 text-white">
                                    <span>
                                        <strong className="font-semibold">{decodedText}</strong>
                                    </span>
                                </p>
                            </div>
                        </div>
                        : ""
                }

                <div className="text-center z-10 mt-8">
                    <div className={"relative border-corner  p-1 relative m-auto  rounded-xl bg-cover " + (
                        isScanning === false ? 'w-48 h-48 flex' : ''
                    )}
                        style={{ backgroundImage: 'url(https://us.123rf.com/450wm/markoaliaksandr/markoaliaksandr2012/markoaliaksandr201200183/markoaliaksandr201200183.jpg?ver=6)' }}>
                        <span className="border_bottom" />
                        <div id={qrcodeRegionId} ></div>
                    </div>
                    <p className="text-white text-xs mt-3">Scan a Barcode</p>

                    <div className="mt-5 w-full flex items-center justify-center space-x-3 my-3 absolute bottom-0 left-0 px-2">
                        {
                            isScanning === false ?
                                <button className="ml-0" onClick={startReadingBarcode}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-14 w-14 p-2 cursor-pointer hover:bg-gray-600 text-gray-50 rounded-full" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                </button>
                                :
                                <button className="ml-0" onClick={stopReadingBarcode}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-14 w-14 p-2 cursor-pointer hover:bg-red-700 text-gray-50 rounded-full bg-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                </button>
                        }
                    </div>
                </div>


            </div>
        </div>
    </div >;
};

export default Html5QrcodePlugin;

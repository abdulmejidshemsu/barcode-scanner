import { Html5QrcodeScanner } from "@cosva-lab/html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
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
    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        const verbose = props.verbose === true;
        // Success callback is required.
        if (!props.qrCodeSuccessCallback) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(
            qrcodeRegionId,
            config,
            verbose
        );
        html5QrcodeScanner.render(
            props.qrCodeSuccessCallback,
            props.qrCodeErrorCallback
        );

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch((error) => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, [props]);

    return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;

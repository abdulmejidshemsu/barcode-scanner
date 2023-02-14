import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Html5Qrcode } from '@cosva-lab/html5-qrcode';
import { CameraDevice } from '@cosva-lab/html5-qrcode/esm/core';
import CameraError from './CameraError';

export default function SelectCamera (props: {
    selectedCamera?: CameraDevice;
    setSelectedCamera: ((value: CameraDevice) => void);
}) {
    const [cameras, setCameras] = useState<CameraDevice[]>([]);
    const [isPermissionDenied, setIsPermissionDenied] = useState<Boolean>(false);
    const [isLoadingCamera, setIsLoadingCamera] = useState<Boolean>(false);

    useEffect(() => {
        async function fetchCameras () {
            setIsLoadingCamera(true);
            Html5Qrcode.getCameras()
                .then(devices => {
                    setCameras(devices);
                    props.setSelectedCamera(devices[0]);
                })
                .catch(error => {
                    if (error === 'NotAllowedError : Permission denied') {
                        setIsPermissionDenied(true);
                    }
                    console.log(error);
                })
                .finally(() => setIsLoadingCamera(false));
        }

        fetchCameras();
    }, []);


    return (
        <div className=' z-20'>
            {
                isLoadingCamera === true ?
                    <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-cyan-500 hover:bg-cyan-400 transition ease-in-out duration-150 cursor-not-allowed">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading Camera...
                    </button>
                    :
                    cameras.length == 0 ? <CameraError message={isPermissionDenied === true ? 'Permission denied' : 'No Available Camera Device'} /> :
                        <div className="-mt-16 w-64">
                            <Listbox value={props.selectedCamera} onChange={props.setSelectedCamera}>
                                <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span className="block truncate">{props.selectedCamera?.label}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {cameras.map((camera, cameraIndex) => (
                                                <Listbox.Option
                                                    key={cameraIndex}
                                                    className={({ active }) =>
                                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                        }`
                                                    }
                                                    value={camera}
                                                >
                                                    {({ selected }) => (
                                                        <>
                                                            <span
                                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                    }`}
                                                            >
                                                                {camera.label}
                                                            </span>
                                                            {selected ? (
                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
            }
        </div>

    )
}

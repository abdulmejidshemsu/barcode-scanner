export default function CameraError (props: { message: String }) {
    return (
        <div className="animate-bounce pointer-events-none fixed inset-x-0 top-0 sm:flex sm:justify-center sm:px-6 sm:pt-5 lg:px-8">
            <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-red-700 py-2.5 px-6 sm:rounded-xl sm:py-3 sm:pr-3.5 sm:pl-4">
                <p className="text-sm leading-6 text-white">
                    <span>
                        <strong className="font-semibold">Camera Error</strong>
                        <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        {props.message}
                    </span>
                </p>
            </div>
        </div>
    )
}

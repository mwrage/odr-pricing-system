
function ConfirmButton(props) {
    const { label, sublabel = "" } = props;
    return (
        <>
            <div className="w-full bg-zinc-800 py-2 text-center rounded-xl my-2 hover:cursor-pointer">
                <p className="text-white inter-500">{label}</p>
                <p className="text-white inter-200 text-xs">{sublabel}</p>
            </div>
        </>
    )
}

export default ConfirmButton
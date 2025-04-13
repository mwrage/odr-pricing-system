
function ConfirmButton(props) {
    const { label } = props;
    return (
        <>
            <div className="w-full bg-zinc-800 py-2 text-center rounded-lg my-2 hover:cursor-pointer">
                <p className="text-white text-medium">{label}</p>
            </div>
        </>
    )
}

export default ConfirmButton
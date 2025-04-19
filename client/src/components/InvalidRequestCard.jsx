
function InvalidRequestCard(props) {

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full text-center p-6 bg-white border rounded-lg text-sm">
                <p className="inter-500 pb-2">Huch! Deine Anfrage konnte nicht verarbeitet werden.</p>
                <p className="inter-300 text-xs">lümo fährt nur in Lübeck, Bad Schwartau und Stockelsdorf. Stelle sicher, dass dein Start und Ziel innerhalb dieses Bediengebiets liegen und versuche es erneut! </p>
            </div>
        </>
    )
}

export default InvalidRequestCard

function MobileDevice({ content }) {
  return (
    <>
        <section className='h-screen w-full p-2 flex items-center justify-center'>
        <div className='flex items-center justify-center h-full w-sm bg-radial from-gray-500 to-gray-900 border-4 border-black rounded-4xl p-4'>
            <div className='z-100 absolute self-start flex items-center justify-center h-6 w-36 bg-linear-to-b from-gray-800 to-gray-900 rounded-b-2xl'>
                <div className='w-1/2 rounded-full bg-gray-700 h-1 mb-2'></div>
            </div>
            <div className='h-full w-full bg-gray-100 rounded-3xl'>
                <div className="h-full w-full">
                    {content}
                </div>
            </div>
        </div>
        </section>
    </>
  )
}

export default MobileDevice

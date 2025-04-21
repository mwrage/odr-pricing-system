
function MobileDevice({ content }) {
  return (
    <>
        <section className='h-screen w-full md:p-2 flex items-center justify-center'>
        <div className='flex items-center justify-center h-full w-full md:w-sm md:bg-radial md:from-gray-500 md:to-gray-900 md:border-4 md:border-black md:rounded-4xl md:p-4'>
            <div className='md:z-100 absolute self-start flex items-center justify-center h-6 w-36 bg-linear-to-b from-gray-800 to-gray-900 rounded-b-2xl'>
                <div className='w-1/2 rounded-full bg-gray-700 h-1 mb-2'></div>
            </div>
            <div className='h-full w-full bg-gray-100 md:rounded-3xl'>
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

"use client"

export default function Error() {

  return (

    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">

      <div className="text-center">

        <div className="text-3xl font-black text-red-500 mb-3">

          Scanner Error

        </div>

        <div className="text-zinc-400">

          Connection lost...

        </div>

      </div>

    </div>

  )

}
"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export default function HomePage() {

  const [loggedIn, setLoggedIn] =
    useState(false)

  const [steamData, setSteamData] =
    useState<any[]>([])

  const [currentTime, setCurrentTime] =
    useState("")

  useEffect(() => {

    const auth =
      localStorage.getItem("loggedIn")

    if (auth === "true") {

      setLoggedIn(true)

      const socket = io(
        "http://127.0.0.1:5000"
      )

      socket.on(
        "steam_update",
        (data) => {

          setSteamData(data)

        }
      )

      const clock =
        setInterval(() => {

          updateClock()

        }, 1000)

      updateClock()

      return () => {

        socket.disconnect()

        clearInterval(clock)

      }

    } else {

      window.location.href =
        "/login"

    }

  }, [])

  const updateClock = () => {

    const now = new Date()

    setCurrentTime(

      now.toLocaleTimeString(
        "vi-VN"
      )

    )

  }

  const logout = () => {

    localStorage.removeItem(
      "loggedIn"
    )

    window.location.href =
      "/login"

  }

  if (!loggedIn) {

    return null

  }

  return (

    <div className="min-h-screen bg-[#eef1f5] text-black">

      {/* TOPBAR */}

      <div className="h-[55px] bg-[#17233a] flex items-center justify-between px-3 border-b border-[#24324a]">

        <div className="flex items-center gap-4">

          <div className="text-lg font-black">

            <span className="text-white">

              Odds

            </span>

            <span className="text-cyan-400">

              Seokeo

            </span>

          </div>

          <div className="text-cyan-400 border-b-2 border-cyan-400 pb-1 text-xs font-bold">

            Live Scanner

          </div>

        </div>

        <div className="flex items-center gap-2">

          <a
            href="https://t.me/sokeoscanner"
            target="_blank"
            className="bg-[#243b63] hover:bg-[#2c4c7d] text-white px-2 py-1 rounded-lg text-xs border border-cyan-500"
          >

            💬 Telegram

          </a>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs"
          >

            Logout

          </button>

          <div className="flex items-center gap-1 text-white font-bold text-xs">

            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

            {currentTime}

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-3">

        {/* STATUS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">

          <div className="bg-white rounded-xl border border-zinc-300 p-3">

            <div className="text-zinc-500 text-[10px] mb-1">

              API STATUS

            </div>

            <div className="text-green-500 font-black text-sm animate-pulse">

              ONLINE

            </div>

          </div>

          <div className="bg-white rounded-xl border border-zinc-300 p-3">

            <div className="text-zinc-500 text-[10px] mb-1">

              LIVE MATCHES

            </div>

            <div className="font-black text-sm">

              {steamData.length}

            </div>

          </div>

          <div className="bg-white rounded-xl border border-zinc-300 p-3">

            <div className="text-zinc-500 text-[10px] mb-1">

              TELEGRAM

            </div>

            <div className="text-cyan-500 font-black text-sm">

              CONNECTED

            </div>

          </div>

          <div className="bg-white rounded-xl border border-zinc-300 p-3">

            <div className="text-zinc-500 text-[10px] mb-1">

              LAST UPDATE

            </div>

            <div className="font-black text-xs">

              {currentTime}

            </div>

          </div>

        </div>

        {/* MATCH CARDS */}

        <div className="space-y-3">

          {steamData.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl border border-zinc-300 p-3 shadow-sm"
            >

              {/* HEADER */}

              <div className="flex justify-between items-center mb-3">

                <div>

                  <div className="font-bold text-red-500 text-sm">

                    {item.home_team}

                  </div>

                  <div className="text-blue-500 text-xs">

                    vs {item.away_team}

                  </div>

                </div>

                <div className="bg-green-600 text-white px-2 py-1 rounded-lg text-[10px] animate-pulse">

                  🔴 LIVE

                </div>

              </div>

              {/* MARKET */}

              <div className="bg-zinc-100 rounded-xl p-2 text-center font-bold text-xs mb-3">

                {item.market || "⚽ TÀI/XỈU 3.5"}

              </div>

              {/* ODDS */}

              <div className="flex items-center justify-center gap-2">

                <div

                  className={`

                    rounded-xl px-4 py-3 text-center font-black text-lg animate-pulse

                    ${item.odds >= item.previous_odds

                      ?

                      "bg-green-100 text-green-600"

                      :

                      "bg-red-100 text-red-600"

                    }

                  `}
                >

                  {item.odds}

                </div>

                <div className="text-lg font-bold">

                  {

                    item.odds >= item.previous_odds

                      ?

                      "⬆️"

                      :

                      "⬇️"

                  }

                </div>

              </div>

              {/* PREVIOUS */}

              <div className="mt-2 text-[10px] text-zinc-500 text-center">

                Prev Odds: {item.previous_odds}

              </div>

              {/* BOOKMAKER */}

              <div className="grid grid-cols-3 gap-2 mt-3 text-[10px]">

                <div className="bg-zinc-100 rounded-lg p-2 text-center">

                  SBO 0.98

                </div>

                <div className="bg-zinc-100 rounded-lg p-2 text-center">

                  SABA 0.95

                </div>

                <div className="bg-zinc-100 rounded-lg p-2 text-center">

                  CMD 1.02

                </div>

              </div>

              {/* FOOTER */}

              <div className="mt-3 flex justify-between items-center">

                <div className="text-green-600 font-bold text-xs">

                  {item.bookmaker || "SBOBET"}

                </div>

                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-2 py-1 rounded-xl text-[10px] font-bold animate-pulse">

                  ⚡ {item.status || "Steam Move"}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}
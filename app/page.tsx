"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export default function HomePage() {

  const [loggedIn, setLoggedIn] =
    useState(false)

  const [steamData, setSteamData] =
    useState<any[]>([])

  const [logs, setLogs] =
    useState<string[]>([])

  const [currentTime, setCurrentTime] =
    useState("")

  const [socketStatus, setSocketStatus] =
    useState("CONNECTED")

  useEffect(() => {

    const auth =
      localStorage.getItem("loggedIn")

    if (auth === "true") {

      setLoggedIn(true)

      const socket = io(
        "http://127.0.0.1:5001"
      )

      socket.on(
        "connect",
        () => {

          setSocketStatus(
            "CONNECTED"
          )

        }
      )

      socket.on(
        "disconnect",
        () => {

          setSocketStatus(
            "DISCONNECTED"
          )

        }
      )

      socket.io.on(
        "reconnect_attempt",
        () => {

          setSocketStatus(
            "RECONNECTING"
          )

        }
      )

      socket.on(
        "steam_update",
        (data) => {

          setSteamData(data)

          const bigMove = data.some(

            (item: any) =>

              Math.abs(
                parseFloat(item.move)
              ) >= 0.10

          )

          if (bigMove) {

            const audio =
              new Audio("/alert.mp3")

            audio.volume = 0.4

            audio.play()

          }

        }
      )

      socket.on(
        "activity_logs",
        (data) => {

          setLogs(data)

        }
      )

      const clock =
        setInterval(() => {

          const now = new Date()

          setCurrentTime(

            now.toLocaleTimeString(
              "vi-VN"
            )

          )

        }, 1000)

      return () => {

        socket.disconnect()

        clearInterval(clock)

      }

    } else {

      window.location.href =
        "/login"

    }

  }, [])

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

        <div className="flex items-center gap-3">

          <div className="text-lg font-black">

            <span className="text-white">

              Odds

            </span>

            <span className="text-cyan-400">

              Seokeo

            </span>

          </div>

          <div className="text-cyan-400 border-b-2 border-cyan-400 pb-1 text-xs font-bold">

            LIVE SCANNER

          </div>

        </div>

        <div className="flex items-center gap-2">

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs"
          >

            Logout

          </button>

          <div

            className={`

              px-2 py-1 rounded-lg text-[10px] font-bold

              ${socketStatus === "CONNECTED"

                ?

                "bg-green-500 text-white"

                :

                socketStatus === "RECONNECTING"

                ?

                "bg-yellow-500 text-black"

                :

                "bg-red-500 text-white"

              }

            `}
          >

            {

              socketStatus === "CONNECTED"

                ?

                "LIVE"

                :

                socketStatus === "RECONNECTING"

                ?

                "RECONNECT"

                :

                "OFFLINE"

            }

          </div>

          <div className="text-white text-xs font-bold">

            {currentTime}

          </div>

        </div>

      </div>

      {/* BODY */}

      <div className="p-3">

        {/* STATUS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">

          <div className="bg-white rounded-xl border border-zinc-300 p-3">

            <div className="text-zinc-500 text-[10px]">

              API STATUS

            </div>

            <div className="text-green-500 font-black text-sm animate-pulse">

              ONLINE

            </div>

          </div>

          <div className="bg-white rounded-xl border border-zinc-300 p-3">

            <div className="text-zinc-500 text-[10px]">

              LIVE MATCHES

            </div>

            <div className="font-black text-sm">

              {steamData.length}

            </div>

          </div>

          <div className="bg-white rounded-xl border border-zinc-300 p-3">

            <div className="text-zinc-500 text-[10px]">

              TELEGRAM

            </div>

            <div className="text-cyan-500 font-black text-sm">

              CONNECTED

            </div>

          </div>

          <div className="bg-white rounded-xl border border-zinc-300 p-3">

            <div className="text-zinc-500 text-[10px]">

              UPDATE

            </div>

            <div className="font-black text-xs">

              {currentTime}

            </div>

          </div>

        </div>

        {/* LIVE LOG */}

        <div className="bg-[#16233a] rounded-2xl p-3 mb-3">

          <div className="text-cyan-400 font-bold text-xs mb-2">

            LIVE ACTIVITY

          </div>

          <div className="space-y-1 max-h-[160px] overflow-auto">

            {logs.map((log, index) => (

              <div
                key={index}
                className="text-white text-[10px] font-mono border-b border-zinc-700 pb-1"
              >

                {log}

              </div>

            ))}

          </div>

        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden md:block bg-white rounded-2xl border border-zinc-300 overflow-hidden">

          <table className="w-full text-xs">

            <thead className="bg-[#17233a] text-white">

              <tr>

                <th className="p-3 text-left">

                  MATCH

                </th>

                <th className="p-3 text-center">

                  MARKET

                </th>

                <th className="p-3 text-center">

                  ODDS

                </th>

                <th className="p-3 text-center">

                  MOVE

                </th>

                <th className="p-3 text-center">

                  BOOK

                </th>

                <th className="p-3 text-center">

                  STATUS

                </th>

              </tr>

            </thead>

            <tbody>

              {steamData.map((item, index) => (

                <tr
                  key={index}
                  className="border-b border-zinc-200 hover:bg-zinc-50"
                >

                  <td className="p-3">

                    <div className="font-bold text-red-500">

                      {item.home_team}

                    </div>

                    <div className="text-blue-500 text-[10px]">

                      vs {item.away_team}

                    </div>

                  </td>

                  <td className="text-center font-bold">

                    {item.market} {item.line}

                  </td>

                  <td className="text-center">

                    <div

                      className={`

                        inline-block px-3 py-1 rounded-lg font-black animate-pulse

                        ${item.direction === "UP"

                          ?

                          "bg-green-100 text-green-600"

                          :

                          "bg-red-100 text-red-600"

                        }

                      `}
                    >

                      {item.odds}

                    </div>

                  </td>

                  <td

                    className={`

                      text-center font-bold

                      ${item.direction === "UP"

                        ?

                        "text-green-600"

                        :

                        "text-red-600"

                      }

                    `}
                  >

                    {item.move}

                  </td>

                  <td className="text-center font-bold text-green-600">

                    {item.bookmaker}

                  </td>

                  <td className="text-center">

                    {

                      item.status === "Steam Move"

                        ?

                        "🔥"

                        :

                        item.status === "Sharp Money"

                        ?

                        "💰"

                        :

                        "⚡"

                    }

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* MOBILE CARDS */}

        <div className="block md:hidden space-y-3">

          {steamData.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl border border-zinc-300 p-3 shadow-sm"
            >

              <div className="flex justify-between items-center mb-2">

                <div>

                  <div className="font-bold text-red-500 text-sm">

                    {item.home_team}

                  </div>

                  <div className="text-blue-500 text-xs">

                    vs {item.away_team}

                  </div>

                </div>

                <div className="bg-green-600 text-white px-2 py-1 rounded-lg text-[10px]">

                  LIVE

                </div>

              </div>

              <div className="bg-zinc-100 rounded-xl p-2 text-center font-bold text-xs mb-3">

                {item.market} {item.line}

              </div>

              <div className="flex items-center justify-center gap-2">

                <div

                  className={`

                    rounded-xl px-4 py-3 text-center font-black text-lg animate-pulse

                    ${item.direction === "UP"

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

                    item.direction === "UP"

                      ?

                      "⬆️"

                      :

                      "⬇️"

                  }

                </div>

              </div>

              <div className="grid grid-cols-3 gap-2 mt-3 text-[10px]">

                <div className="bg-zinc-100 rounded-lg p-2 text-center">

                  Line {item.line}

                </div>

                <div

                  className={`

                    rounded-lg p-2 text-center font-bold

                    ${item.direction === "UP"

                      ?

                      "bg-green-100 text-green-600"

                      :

                      "bg-red-100 text-red-600"

                    }

                  `}
                >

                  {item.move}

                </div>

                <div className="bg-zinc-100 rounded-lg p-2 text-center">

                  {item.bookmaker}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}
"use client"

import { useEffect, useState } from "react"

export default function HomePage() {

  const [loggedIn, setLoggedIn] =
    useState(false)

  const [steamData, setSteamData] =
    useState<any[]>([])

  const [currentTime, setCurrentTime] =
    useState("")

  useEffect(() => {

    const auth = localStorage.getItem(
      "loggedIn"
    )

    if (auth === "true") {

      setLoggedIn(true)

      loadSteam()

      const interval = setInterval(() => {

        loadSteam()

      }, 5000)

      const clock = setInterval(() => {

        updateClock()

      }, 1000)

      updateClock()

      return () => {

        clearInterval(interval)

        clearInterval(clock)

      }

    } else {

      window.location.href = "/login"

    }

  }, [])

  const updateClock = () => {

    const now = new Date()

    const time = now.toLocaleTimeString(
      "vi-VN",
      {

        hour12: false

      }
    )

    const date = now.toLocaleDateString(
      "vi-VN"
    )

    setCurrentTime(
      `${date} ${time}`
    )

  }

  const loadSteam = async () => {

    try {

      const res = await fetch(
        "http://127.0.0.1:5000/steam"
      )

      const data = await res.json()

      const uniqueMatches =
        data.reduce((acc: any[], current: any) => {

          const exists = acc.find(

            (item) =>

              item.home_team === current.home_team &&

              item.away_team === current.away_team

          )

          if (!exists) {

            acc.push(current)

          }

          return acc

        }, [])

      setSteamData(uniqueMatches)

    } catch (err) {

      console.log(err)

    }

  }

  const logout = () => {

    localStorage.removeItem(
      "loggedIn"
    )

    window.location.href = "/login"

  }

  if (!loggedIn) {

    return null

  }

  return (

    <div className="min-h-screen bg-[#eceef2] text-black">

      {/* TOPBAR */}

      <div className="h-[70px] bg-[#17233a] border-b border-[#25324d] flex items-center justify-between px-8">

        <div className="flex items-center gap-10">

          <div className="text-3xl font-black">

            <span className="text-white">

              Arb

            </span>

            <span className="text-blue-400">

              Scanner

            </span>

          </div>

          <div className="text-cyan-400 border-b-2 border-cyan-400 pb-1 text-lg">

            Live Scanner

          </div>

        </div>

        <div className="flex items-center gap-4">

          <div className="text-zinc-300">

            vip123

          </div>

          <button className="bg-[#253cff] hover:bg-blue-700 text-white px-5 py-2 rounded-lg">

            📊 Monitor

          </button>

          <a
            href="https://t.me/sokeoscanner"
            target="_blank"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg"
          >

            💬 Chat Bot

          </a>

          <a
            href="https://t.me/sokeoscanner"
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg"
          >

            🚀 Join Telegram

          </a>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >

            ⏻ Logout

          </button>

          <div className="flex items-center gap-3 text-white text-xl font-bold">

            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

            {currentTime}

          </div>

        </div>

      </div>

      <div className="flex">

        {/* SIDEBAR */}

        <div className="w-[260px] bg-[#f4f5f7] border-r border-zinc-300 min-h-screen p-5">

          <div className="text-zinc-500 font-bold mb-5">

            WORKFLOW

          </div>

          {[

            "Asian Scanner",

            "Steam Move",

            "Sharp Money",

            "Realtime Odds",

            "Live Market"

          ].map((item, index) => (

            <div
              key={index}
              className={`rounded-xl p-4 mb-4 border cursor-pointer transition-all
              
              ${
                index === 4
                  ? "border-blue-500 bg-white"
                  : "border-zinc-300 bg-white hover:bg-zinc-100"
              }`}
            >

              <div className="font-bold text-2xl mb-3">

                {item}

              </div>

              <div className="text-zinc-600 text-lg leading-8">

                KSPORT vs CMD / SABA

              </div>

            </div>

          ))}

        </div>

        {/* CONTENT */}

        <div className="flex-1 p-5">

          {/* LOG PANEL */}

          <div className="bg-[#1d2b45] rounded-xl p-5 mb-5 text-white font-mono text-lg leading-10">

            [22:04:47] ⚡ BTI: nhận 29 trận <br />

            [22:04:49] ⚡ SABA: nhận 42 trận <br />

            [22:04:49] ⚡ Live Scanner Running

          </div>

          {/* LIVE OPPORTUNITIES */}

          <div className="bg-white border border-zinc-300 rounded-xl overflow-hidden mb-5">

            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-300">

              <div className="text-yellow-500 text-2xl">

                ⚡

              </div>

              <div className="text-3xl font-bold">

                LIVE OPPORTUNITIES

              </div>

              <div className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold">

                {steamData.length}

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1700px]">

                <thead className="bg-[#f3f4f6] text-zinc-600 text-lg">

                  <tr>

                    <th className="text-left p-4">

                      MATCH

                    </th>

                    <th className="text-left p-4">

                      TIME

                    </th>

                    <th className="text-left p-4">

                      TYPE

                    </th>

                    <th className="text-left p-4">

                      LINE

                    </th>

                    <th className="text-left p-4">

                      BOOK A

                    </th>

                    <th className="text-left p-4">

                      ODDS A

                    </th>

                    <th className="text-left p-4">

                      BOOK B

                    </th>

                    <th className="text-left p-4">

                      ODDS B

                    </th>

                    <th className="text-left p-4">

                      STATUS

                    </th>

                    <th className="text-left p-4">

                      FOUND

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {steamData.map((item, index) => (

                    <tr
                      key={index}
                      className="border-t border-zinc-300 hover:bg-zinc-50"
                    >

                      {/* MATCH */}

                      <td className="p-4">

                        <div className="text-red-500 font-bold text-2xl">

                          {item.home_team || "Home"}

                        </div>

                        <div className="text-blue-500 text-xl">

                          vs {item.away_team || "Away"}

                        </div>

                      </td>

                      {/* TIME */}

                      <td className="p-4">

                        <div className="flex items-center gap-3 mb-2">

                          <div className="bg-green-700 text-white px-2 py-1 rounded text-sm font-bold">

                            LIVE

                          </div>

                          <div className="text-red-500 font-bold text-2xl">

                            11'

                          </div>

                        </div>

                        <div className="text-zinc-500 text-sm">

                          {new Date().toLocaleDateString("vi-VN")}

                        </div>

                        <div className="text-zinc-500 text-sm">

                          {new Date().toLocaleTimeString("vi-VN")}

                        </div>

                      </td>

                      {/* TYPE */}

                      <td className="p-4">

                        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-3 py-2 rounded-lg text-center font-bold">

                          FT O/U

                        </div>

                      </td>

                      {/* LINE */}

                      <td className="p-4 text-3xl font-black text-[#17233a]">

                        3.5

                      </td>

                      {/* BOOK A */}

                      <td className="p-4">

                        <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded-lg text-center font-bold">

                          KSPORT

                        </div>

                      </td>

                      {/* ODDS A */}

                      <td className="p-4">

                        <div className="text-blue-500 text-3xl font-black">

                          {item.odds || "0.78"}

                        </div>

                      </td>

                      {/* BOOK B */}

                      <td className="p-4">

                        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded-lg text-center font-bold">

                          SABA

                        </div>

                      </td>

                      {/* ODDS B */}

                      <td className="p-4">

                        <div className="text-blue-500 text-3xl font-black">

                          0.95

                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="p-4">

                        <div className="bg-yellow-100 border border-yellow-500 text-yellow-700 px-4 py-3 rounded-xl text-center font-bold text-lg">

                          Steam Move (+1.73)

                        </div>

                      </td>

                      {/* FOUND */}

                      <td className="p-4 text-zinc-500">

                        <div className="text-xl">

                          {currentTime}

                        </div>

                        <div>

                          KSPORT 1.1s

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}
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

    const auth =
      localStorage.getItem("loggedIn")

    if (auth === "true") {

      setLoggedIn(true)

      loadSteam()

      const interval =
        setInterval(() => {

          loadSteam()

        }, 4000)

      const clock =
        setInterval(() => {

          updateClock()

        }, 1000)

      updateClock()

      return () => {

        clearInterval(interval)

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

  const loadSteam = async () => {

    try {

      const res = await fetch(

        "http://127.0.0.1:5000/steam"

      )

      const data = await res.json()

      const uniqueMatches =
        data.reduce(

          (
            acc: any[],
            current: any
          ) => {

            const exists =
              acc.find(

                (item) =>

                  item.home_team ===
                    current.home_team &&

                  item.away_team ===
                    current.away_team

              )

            if (!exists) {

              acc.push(current)

            }

            return acc

          },

          []

        )

      setSteamData(uniqueMatches)

    } catch (err) {

      console.log(err)

    }

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

    <div className="min-h-screen bg-[#eef1f5] text-black overflow-x-auto">

      {/* TOPBAR */}

      <div className="h-[55px] bg-[#17233a] flex items-center justify-between px-3 border-b border-[#24324a] min-w-[1200px]">

        <div className="flex items-center gap-5">

          <div className="text-xl font-black">

            <span className="text-white">

              Arb

            </span>

            <span className="text-cyan-400">

              Scanner

            </span>

          </div>

          <div className="text-cyan-400 border-b-2 border-cyan-400 pb-1 text-sm font-bold">

            Live Scanner

          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="text-white text-sm">

            vip123

          </div>

          <a
            href="https://t.me/sokeoscanner"
            target="_blank"
            className="bg-[#243b63] hover:bg-[#2c4c7d] text-white px-3 py-2 rounded-lg text-sm border border-cyan-500"
          >

            📊 Monitor

          </a>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
          >

            Logout

          </button>

          <div className="flex items-center gap-2 text-white font-bold text-sm">

            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

            {currentTime}

          </div>

        </div>

      </div>

      <div className="flex min-w-[1200px]">

        {/* SIDEBAR */}

        <div className="w-[220px] bg-[#f5f6f8] border-r border-zinc-300 min-h-screen p-3">

          <div className="text-zinc-500 font-bold mb-3 text-sm">

            WORKFLOW

          </div>

          {[

            "Workflow 1A",

            "Workflow 1C",

            "Workflow 1D",

            "Workflow 2B",

            "Workflow 2C"

          ].map((item, index) => (

            <div
              key={index}
              className={`rounded-xl p-3 mb-3 border transition-all cursor-pointer

              ${
                index === 4

                  ?

                  "border-blue-500 bg-white"

                  :

                  "border-zinc-300 bg-white hover:bg-zinc-100"

              }`}
            >

              <div className="font-bold text-base mb-2">

                {item}

              </div>

              <div className="text-zinc-600 text-sm leading-6">

                KSPORT vs CMD / SABA

              </div>

            </div>

          ))}

        </div>

        {/* CONTENT */}

        <div className="flex-1 p-3">

          {/* STATS */}

          <div className="grid grid-cols-5 gap-3 mb-3">

            <div className="bg-white rounded-xl border border-zinc-300 p-3">

              <div className="text-zinc-500 text-xs mb-1">

                API STATUS

              </div>

              <div className="text-green-500 font-black text-xl">

                ONLINE

              </div>

            </div>

            <div className="bg-white rounded-xl border border-zinc-300 p-3">

              <div className="text-zinc-500 text-xs mb-1">

                TOTAL MATCHES

              </div>

              <div className="font-black text-xl">

                156

              </div>

            </div>

            <div className="bg-white rounded-xl border border-zinc-300 p-3">

              <div className="text-zinc-500 text-xs mb-1">

                OPPORTUNITIES

              </div>

              <div className="font-black text-xl">

                {steamData.length}

              </div>

            </div>

            <div className="bg-white rounded-xl border border-zinc-300 p-3">

              <div className="text-zinc-500 text-xs mb-1">

                SUCCESS RATE

              </div>

              <div className="font-black text-xl text-green-500">

                87.2%

              </div>

            </div>

            <div className="bg-white rounded-xl border border-zinc-300 p-3">

              <div className="text-zinc-500 text-xs mb-1">

                LAST UPDATE

              </div>

              <div className="font-black text-xl">

                {currentTime}

              </div>

            </div>

          </div>

          {/* LOG */}

          <div className="bg-[#16233a] rounded-xl p-4 mb-3 text-white font-mono text-sm leading-7">

            [22:04:47] ⚡ BTI: nhận 29 trận <br />

            [22:04:49] ⚡ SABA: nhận 42 trận <br />

            [22:04:49] ⚡ Live scanner running

          </div>

          {/* LIVE */}

          <div className="bg-white border border-zinc-300 rounded-xl overflow-hidden">

            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-300">

              <div className="text-yellow-500">

                ⚡

              </div>

              <div className="text-lg font-bold">

                LIVE OPPORTUNITIES

              </div>

              <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">

                {steamData.length}

              </div>

            </div>

            <table className="w-full text-sm">

              <thead className="bg-[#f5f6f8] text-zinc-600">

                <tr>

                  <th className="text-left p-3">

                    MATCH

                  </th>

                  <th className="text-left p-3">

                    TIME

                  </th>

                  <th className="text-left p-3">

                    TYPE

                  </th>

                  <th className="text-left p-3">

                    LINE

                  </th>

                  <th className="text-left p-3">

                    BOOK

                  </th>

                  <th className="text-left p-3">

                    ODDS

                  </th>

                  <th className="text-left p-3">

                    STATUS

                  </th>

                </tr>

              </thead>

              <tbody>

                {steamData.map((item, index) => (

                  <tr
                    key={index}
                    className="border-t border-zinc-300 hover:bg-zinc-50"
                  >

                    <td className="p-3">

                      <div className="text-red-500 font-bold text-base">

                        {item.home_team}

                      </div>

                      <div className="text-blue-500 text-sm">

                        vs {item.away_team}

                      </div>

                    </td>

                    <td className="p-3">

                      <div className="flex items-center gap-2">

                        <div className="bg-green-700 text-white px-2 py-1 rounded text-xs">

                          LIVE

                        </div>

                        <div className="text-red-500 font-bold">

                          11'

                        </div>

                      </div>

                    </td>

                    <td className="p-3">

                      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-2 py-1 rounded-lg text-center font-bold text-xs w-fit">

                        FT O/U

                      </div>

                    </td>

                    <td className="p-3 font-bold">

                      3.5

                    </td>

                    <td className="p-3">

                      <div className="bg-green-100 border border-green-400 text-green-700 px-2 py-1 rounded-lg text-xs w-fit font-bold">

                        KSPORT

                      </div>

                    </td>

                    <td className="p-3">

                      <div className="text-blue-500 font-black text-lg">

                        {item.odds || "0.95"}

                      </div>

                    </td>

                    <td className="p-3">

                      <div className="bg-yellow-100 border border-yellow-500 text-yellow-700 px-3 py-2 rounded-xl text-center font-bold text-xs w-fit">

                        Steam Move

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

  )

}
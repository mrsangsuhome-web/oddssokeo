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

      }, 4000)

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

    setCurrentTime(

      now.toLocaleTimeString("vi-VN")

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

    <div className="min-h-screen bg-[#eceef2] text-black text-xs">

      {/* TOPBAR */}

      <div className="h-[50px] bg-[#17233a] border-b border-[#25324d] flex items-center justify-between px-3">

        <div className="text-sm font-black">

          <span className="text-white">

            Arb

          </span>

          <span className="text-blue-400">

            Scanner

          </span>

        </div>

        <div className="flex items-center gap-2">

          <a
            href="https://t.me/sokeoscanner"
            target="_blank"
            className="bg-cyan-500 text-white px-2 py-1 rounded"
          >

            Telegram

          </a>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >

            Out

          </button>

          <div className="text-white text-[10px]">

            {currentTime}

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="p-2">

        {/* LOG */}

        <div className="bg-[#1d2b45] rounded-lg p-2 mb-2 text-white font-mono text-[10px] leading-5">

          ⚡ Live Scanner Running <br />

          ⚡ API Online <br />

          ⚡ Telegram Connected

        </div>

        {/* TITLE */}

        <div className="flex items-center gap-2 mb-2">

          <div className="text-yellow-500 text-sm">

            ⚡

          </div>

          <div className="text-sm font-bold">

            LIVE

          </div>

          <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-[10px] font-bold">

            {steamData.length}

          </div>

        </div>

        {/* MATCHES */}

        <div className="space-y-2">

          {steamData.map((item, index) => (

            <div
              key={index}
              className="bg-white border border-zinc-300 rounded-lg p-2"
            >

              <div className="flex justify-between items-center mb-1">

                <div>

                  <div className="text-red-500 font-bold text-xs">

                    {item.home_team || "Home"}

                  </div>

                  <div className="text-blue-500 text-[11px]">

                    vs {item.away_team || "Away"}

                  </div>

                </div>

                <div className="bg-green-600 text-white px-2 py-1 rounded text-[10px]">

                  LIVE

                </div>

              </div>

              <div className="grid grid-cols-4 gap-1 mt-2 text-[10px]">

                <div className="bg-zinc-100 rounded p-1 text-center">

                  FT O/U
                </div>

                <div className="bg-zinc-100 rounded p-1 text-center font-bold">

                  3.5
                </div>

                <div className="bg-zinc-100 rounded p-1 text-center">

                  KSPORT
                </div>

                <div className="bg-zinc-100 rounded p-1 text-center text-blue-500 font-bold">

                  {item.odds || "0.95"}
                </div>

              </div>

              <div className="mt-2 flex justify-between items-center">

                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-2 py-1 rounded text-[10px]">

                  Steam Move
                </div>

                <div className="text-zinc-500 text-[10px]">

                  {currentTime}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}
"use client"

import { useState } from "react"

export default function LoginPage() {

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const handleLogin = () => {

    if (

      username === "admin"

      &&

      password === "123456"

    ) {

      localStorage.setItem(
        "loggedIn",
        "true"
      )

      window.location.href = "/"

    } else {

      alert("Wrong account")

    }

  }

  return (

    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">

      <div className="bg-[#17233a] rounded-3xl p-6 w-full max-w-sm border border-cyan-500 shadow-2xl">

        <div className="text-center mb-6">

          <div className="text-3xl font-black text-white">

            Odds<span className="text-cyan-400">Seokeo</span>

          </div>

          <div className="text-zinc-400 text-sm mt-2">

            Premium Scanner Login

          </div>

        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full mb-3 bg-[#0f172a] border border-zinc-700 rounded-xl p-3 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full mb-4 bg-[#0f172a] border border-zinc-700 rounded-xl p-3 text-white outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-xl p-3 font-bold text-black"
        >

          LOGIN

        </button>

      </div>

    </div>

  )

}
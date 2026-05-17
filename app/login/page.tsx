"use client"

import { useState } from "react"

export default function LoginPage() {

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const users = [

    { username: "admin", password: "123456" },

    { username: "vip1", password: "123456" },

    { username: "vip2", password: "123456" },

    { username: "vip3", password: "123456" },

    { username: "vip4", password: "123456" },

    { username: "vip5", password: "123456" },

    { username: "vip6", password: "123456" },

    { username: "vip7", password: "123456" },

    { username: "vip8", password: "123456" },

    { username: "vip9", password: "123456" }

  ]

  const handleLogin = async () => {

    const foundUser = users.find(

      (u) =>

        u.username === username &&

        u.password === password

    )

    if (foundUser) {

      localStorage.setItem(

        "loggedIn",

        "true"

      )

      localStorage.setItem(

        "username",

        foundUser.username

      )

      window.location.href = "/"

    } else {

      alert("Sai tài khoản hoặc mật khẩu")

    }

  }

  return (

    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">

      <div className="bg-[#172033] border border-zinc-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">

        {/* LOGO */}

        <div className="text-center mb-8">

          <div className="text-3xl font-black mb-2">

            <span className="text-white">

              Arb

            </span>

            <span className="text-cyan-400">

              Scanner

            </span>

          </div>

          <div className="text-zinc-400 text-sm">

            Live Scanner Dashboard

          </div>

        </div>

        {/* USERNAME */}

        <div className="mb-4">

          <div className="text-zinc-400 text-sm mb-2">

            Username

          </div>

          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="Nhập username"
            className="w-full bg-[#0f172a] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* PASSWORD */}

        <div className="mb-6">

          <div className="text-zinc-400 text-sm mb-2">

            Password

          </div>

          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Nhập password"
            className="w-full bg-[#0f172a] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* LOGIN */}

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition-all"
        >

          LOGIN

        </button>

        {/* TELEGRAM */}

        <a
          href="https://t.me/sokeoscanner"
          target="_blank"
          className="block text-center mt-5 text-cyan-400 text-sm hover:text-cyan-300"
        >

          Join Telegram

        </a>

      </div>

    </div>

  )

}
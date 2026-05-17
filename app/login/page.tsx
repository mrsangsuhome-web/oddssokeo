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

      <div className="bg-[#172033] border border-zinc-700 rounded-2xl p-6 w-full max-w-sm">

        <div className="text-center mb-6">

          <div className="text-2xl font-black text-white mb-2">

            Arb Scanner

          </div>

          <div className="text-zinc-400 text-sm">

            Login Dashboard
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
            className="w-full bg-[#0f172a] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
          />

        </div>

        {/* PASSWORD */}

        <div className="mb-5">

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
            className="w-full bg-[#0f172a] border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
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
          className="block text-center mt-4 text-cyan-400 text-sm"
        >

          Join Telegram

        </a>

        {/* DEMO ACCOUNTS */}

        <div className="mt-6 bg-[#0f172a] rounded-xl p-4 border border-zinc-700">

          <div className="text-zinc-400 text-xs mb-3">

            Demo Accounts
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-300">

            <div>admin / 123456</div>
            <div>vip1 / 123456</div>
            <div>vip2 / 123456</div>
            <div>vip3 / 123456</div>
            <div>vip4 / 123456</div>
            <div>vip5 / 123456</div>
            <div>vip6 / 123456</div>
            <div>vip7 / 123456</div>
            <div>vip8 / 123456</div>
            <div>vip9 / 123456</div>

          </div>

        </div>

      </div>

    </div>

  )

}
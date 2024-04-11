import Link from "next/link"

function City() {
  return (
      <div className="bg-gradient-to-t from-slate-900 to-black bg-cover h-screen flex items-center justify-center">
      <Link href="/" className="bg-zinc-900 rounded-xl border">
        <div className="p-2 text-center text-white">Go back Home</div>
      </Link>
    </div>
  )
}

export default City

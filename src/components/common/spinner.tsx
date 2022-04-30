import React from "react"

const Spinner = () => {
  return (
    <div className="flex items-center justify-center pt-2">
      <div className="w-10 h-10 border-t-4 border-b-4 rounded-full border-violet-900 animate-spin"></div>
    </div>
  )
}

export default Spinner

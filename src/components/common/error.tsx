import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"

interface ErrorProps {
  error: any
}

const Error = ({ error }: ErrorProps) => {
  const isFetchBaseQueryErrorType = (
    error: any
  ): error is FetchBaseQueryError => "status" in error

  return (
    <div className="pt-1 font-semibold text-center text-red-700">
      {isFetchBaseQueryErrorType(error as string) ? error.data?.message : null}
    </div>
  )
}

export default Error

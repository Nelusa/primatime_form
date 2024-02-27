import {ExclamationCircleIcon} from "@heroicons/react/24/outline";

const ErrorState = ({message}: {message: string}) => {
  return (
   <div className="flex items-center justify-center font-medium gap-x-2 text-red-700 py-4">
     <ExclamationCircleIcon width={20} height={20} />
     <p>{message}</p>
   </div>
  )
}

export default ErrorState;
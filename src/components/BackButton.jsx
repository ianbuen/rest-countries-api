import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";

export const BackButton = ({text, icon}) => {

  const router = useRouter();

  return (
    <button type="button" onClick={() => { router.push('/')}} className="bg-white flex gap-2 items-center px-7 py-2 shadow-[0_0_5px_2px_#0004] w-fit rounded-sm dark:bg-dark-blue" >
        {icon ? icon() : <BsArrowLeft />}
        {text || 'Back'}
    </button>
  )
}

export default BackButton;

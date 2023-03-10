import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";

export const BackButton = () => {

  const router = useRouter();

  return (
    <button type="button" onClick={() => { router.push('/')}} className="bg-white flex gap-2 items-center px-6 py-1 drop-shadow w-fit rounded-sm" >
        <BsArrowLeft />
        Back
    </button>
  )
}

export default BackButton;

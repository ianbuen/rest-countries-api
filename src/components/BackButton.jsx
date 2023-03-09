import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";

export const BackButton = () => {

  const router = useRouter();

  return (
    <button type="button" onClick={() => { router.push('/')}} className="flex gap-2 items-center px-6 py-1 shadow-md">
        <BsArrowLeft />
        Back
    </button>
  )
}

export default BackButton;

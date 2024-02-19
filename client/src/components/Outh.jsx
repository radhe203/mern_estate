import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSucess } from "../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";
function Outh() {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      console.log(result);
      const data = res.json();
      

      Dispatch(signInSucess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  }
  return (
    <button
      type="button"
      onClick={() => {
        handleGoogleClick();
      }}
      className=" bg-red-700 p-3 text-white rounded-lg uppercase"
    >
      Continiue With google
    </button>
  );
}

export default Outh;

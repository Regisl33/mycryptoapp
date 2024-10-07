import { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../Features/LandingPage/UserSlice";
import { currentIDPropsType } from "../Types/AppTypes";
import Favorites from "./Favorites";
import Footer from "./Footer";
import Header from "./Header";
import TodayRecap from "./TodayRecap";
import { fullUserType } from "../Types/LandingTypes";

const Home = ({ currentID }: currentIDPropsType) => {
  const [currentUser, setCurrentUser] = useState<fullUserType>();
  const { data: userApiData, isError, error } = useGetAllUsersQuery("User");

  useEffect(() => {
    if (!isError) {
      if (userApiData?.ids) {
        userApiData.ids.map((id) =>
          id === currentID
            ? setCurrentUser(userApiData.entities[id])
            : console.log(id)
        );
      } else {
        console.log("There is no data in the user Array");
      }
    } else {
      console.log(error);
    }
  }, []);

  return (
    <main className="user-background">
      <Header user={currentUser} />
      <Favorites user={currentUser}/>
      <TodayRecap />
      <Footer />
    </main>
  );
};

export default Home;

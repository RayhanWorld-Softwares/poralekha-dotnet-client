import Banner from "../../components/Banner/Banner";
import ClassFeedback from "../../components/ClassFeedback/ClassFeedback";
import Collaborators from "../../components/Collaborators/Collaborators";
import TeachersJoin from "../../components/TeachersJoin/TeachersJoin";

const Home = () => {
  return (
    <div>
      <Banner />
      <Collaborators />
      <TeachersJoin />
      <ClassFeedback />
    </div>
  );
};

export default Home;

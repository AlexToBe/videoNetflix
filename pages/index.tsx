import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: movies=[] } = useMovieList();
  const { data: favorites=[] } = useFavorites();
  const {isOpen, closeModal} = useInfoModal()
  
  
  return (
    <nav className=" w-full fixed z-40">
      <InfoModal visable={isOpen} onClose={closeModal}/>
     <Navbar/>
     <Billboard/>
      <div className=" pb-40">
        
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="MyList" data={favorites} />
     </div>
    </nav>
  );
}


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
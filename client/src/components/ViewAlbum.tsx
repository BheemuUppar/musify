import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { environment } from "../assets/environment";
import ListHeader from "./ListHeader";

const ViewAlbum = React.memo(() => {
    const [album, setAlbum] = useState({});
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${environment.searchUrl}/albumsById/${params.id}`)
      .then((data: any) => {
        console.log(data.data.data);
        setAlbum(data.data.data)
      });
  }, []);

  return <>
  <div>
  <ListHeader list={album}/>
  </div>
  </>;
});

export default ViewAlbum;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewAlbum = React.memo(() => {
  //   const [album, setAlbum] = useState({});
  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://saavn.dev/api/albums?id=${params.id}`)
      .then((data: any) => {
        console.log(data.data);
      });
  });

  return <>
  <div>
    
  </div>
  </>;
});

export default ViewAlbum;

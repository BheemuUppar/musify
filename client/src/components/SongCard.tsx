import React from "react";

const SongCard = React.memo(() => {
  return (
    <>
      <div className="h-[80px] mx-1 border border-gray-900 px-2 py-1 rounded flex items-center">
        <div className=" w-full flex justify-between items-center  ">
          <div className="flex ">
          <p className="p-2">1</p>
            <img
              src="https://c.saavncdn.com/386/Pardes-Hindi-1997-20230809151030-50x50.jpg"
              alt=""
            />
            <div className="ps-2">
              <p>Ramachari</p>
              {["tippu", "arjun", "rahaman"].map((singer: any) => {
                return <span className="mr-2">{singer}</span>;
              })}
            </div>
          </div>
          <div >
            <p>Ghulam</p>
          </div>
          <div>
            <p>5:00</p>
          </div>
        </div>
      </div>
    </>
  );
});

export default SongCard;

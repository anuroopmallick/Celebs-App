import React, { useState } from "react";
import { Celebs } from "../pages/types/celebs";
import { calculateAge, calculateDOB } from "../helpers/calculateAge";
import Celebrities from "../pages/Celebrities";

interface Props {
  celebrities: Celebs[] | undefined;
  setCelebs: React.Dispatch<React.SetStateAction<Celebs[] | undefined>>;
  setEditable: React.Dispatch<React.SetStateAction<Number | null>>;
  celeb: Celebs;
  selected: Number | null;
  toggle: (id: Number) => void;
}

const Editable: React.FC<Props> = ({
  celebrities,
  celeb,
  selected,
  toggle,
  setCelebs,
  setEditable,
}) => {
  const [detailsState, setDetailsState] = useState({
    id: celeb.id,
    first: celeb.first,
    last: celeb.last,
    dob: celeb.dob,
    gender: celeb.gender,
    email: celeb.email,
    picture: celeb.picture,
    country: celeb.country,
    description: celeb.description,
  });

  const handleEdit = () => {
    setDetailsState({
      ...detailsState,
      id: detailsState.id,
      first: detailsState.first,
      last: detailsState.last,
      dob: detailsState.dob,
      gender: detailsState.gender,
      email: detailsState.email,
      picture: detailsState.picture,
      country: detailsState.country,
      description: detailsState.description,
    });

    setCelebs((prevCelebs) =>
      prevCelebs?.map((celeb) =>
        celeb.id === detailsState.id ? { ...celeb, ...detailsState } : celeb
      )
    );

    setEditable(null);
  };

  return (
    <div key={celeb.id} className="mr-5 ml-5 mb-5 border-2 rounded-md">
      <div className="h-10 my-5  flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div>
            <img
              src={celeb.picture}
              alt="No Image"
              height={60}
              width={60}
              className="border-2 border-black-600 rounded-full ml-5 mr-6"
            ></img>
          </div>
          <div className="font-bold text-lg">
            <input
              height="18"
              className="border-2 rounded-md"
              value={`${detailsState.first} ${detailsState.last}`}
              onChange={(e) => {
                const [first, ...last] = e.target.value.split(" ");
                setDetailsState({
                  ...detailsState,
                  first: first ?? "",
                  last: last.join(" ") ?? "",
                });
              }}
            ></input>
          </div>
        </div>

        <div className="mr-5">
          {selected === celeb.id ? (
            <button onClick={() => toggle(celeb.id)}>
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/000000/chevron-up.png"
                alt="chevron-up"
                className=""
              />
            </button>
          ) : (
            <button onClick={() => toggle(celeb.id)}>
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/000000/chevron-down.png"
                alt="chevron-down"
                className=""
              />
            </button>
          )}
        </div>
      </div>
      <div className={selected === celeb.id ? "" : "hidden"}>
        <div className="flex flex-row justify-between mx-5">
          <div className="flex flex-col">
            <span className="text-gray-600">Age</span>{" "}
            <input
              className="border-2 rounded-md w-24"
              value={calculateAge(detailsState.dob)}
              type="number"
              onChange={(e) => {
                setDetailsState({
                  ...detailsState,
                  dob: `${calculateDOB(parseInt(e.target.value))}`,
                });
              }}
            ></input>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Gender</span>
            <select
              className="border-2 rounded-md"
              value={detailsState.gender}
              onChange={(e) => {
                setDetailsState({ ...detailsState, gender: e.target.value });
              }}
            >
              <option value={"male"}>male</option>
              <option value={"female"}>female</option>
            </select>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Country</span>{" "}
            <input
              className="border-2 rounded-md"
              value={detailsState.country}
              onChange={(e) => {
                setDetailsState({ ...detailsState, country: e.target.value });
              }}
            ></input>
          </div>
        </div>
        <br></br>
        <div className="mx-5">
          <span className="flex flex-col text-gray-600">Description</span>
          <textarea
            className="border-2 w-full rounded-md h-28"
            value={detailsState.description}
            onChange={(e) => {
              setDetailsState({ ...detailsState, description: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="flex flex-row justify-between mx-5 my-2">
          <div></div>
          <div>
            <button className="mr-2">
              <img
                onClick={() => {
                  setEditable(null);
                }}
                width="28"
                height="28"
                src="https://img.icons8.com/ios/50/FA5252/cancel.png"
                alt="cancel"
              />
            </button>
            <button onClick={handleEdit}>
              <img
                width="28"
                height="28"
                src="https://img.icons8.com/pastel-glyph/64/40C057/checked--v1.png"
                alt="checked--v1"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editable;

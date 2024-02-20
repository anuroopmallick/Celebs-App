import React, { useEffect, useState } from "react";
import data from "./../celebrities.json";
import { Celebs, Convert } from "./types/celebs";
import { calculateAge } from "../helpers/calculateAge";
import Editable from "../components/Editable";
import DeleteDialog from "../components/DeleteDialog";
// import img from "./../../public/assets/profile.jpg";

const Celebrities = () => {
  const [celebs, setCelebs] = useState<Celebs[] | undefined>([]);
  const [selected, setSelected] = useState<Number | null>(null);
  const [editable, setEditable] = useState<Number | null>(null);
  const [searchQuery, setsearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCeleb, setSelectedCeleb] = useState<Celebs | null>(null);

  useEffect(() => {
    var toSet: Celebs[] = [];
    const fetchCelebrities = async () => {
      data.map((element) => {
        toSet.push(element);
      });
      setCelebs(toSet);
    };
    fetchCelebrities();
  }, []);

  function toggle(id: Number) {
    if (selected === id) {
      return setSelected(null);
    }

    setSelected(id);
  }

  function handleEditable(id: Number) {
    if (editable === id) {
      return setEditable(null);
    }

    setEditable(id);
  }

  const openModal = (celeb: Celebs) => {
    setSelectedCeleb(celeb);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteCeleb = (id: number) => {
    setCelebs((prevCelebs) => prevCelebs?.filter((celeb) => celeb.id !== id));
  };

  return (
    <>
      <div>
        <div className="p-5">
          <input
            placeholder="Search User"
            className="p-5 h-12 w-full border-2  rounded-xl mt-5"
            value={searchQuery}
            onChange={(e) => {
              setsearchQuery(e.target.value);
            }}
          ></input>
        </div>
        {celebs
          ?.filter((celeb) => {
            return searchQuery.toLowerCase() === ""
              ? celeb
              : celeb.first.toLowerCase().includes(searchQuery) ||
                  celeb.last.toLowerCase().includes(searchQuery);
          })
          .map((celeb) =>
            editable === celeb.id ? (
              <Editable
                setCelebs={setCelebs}
                celebrities={celebs}
                celeb={celeb}
                selected={selected}
                toggle={toggle}
                setEditable={setEditable}
              ></Editable>
            ) : (
              <div
                key={celeb.id}
                className="mr-5 ml-5 mb-5 border-2 rounded-md"
              >
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
                      {celeb.first} {celeb.last}
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
                      <span>{`${calculateAge(celeb.dob)} years`}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Gender</span>{" "}
                      <span>{celeb.gender}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600">Country</span>{" "}
                      <span>{celeb.country}</span>
                    </div>
                  </div>
                  <br></br>
                  <div className="mx-5">
                    <span className="flex flex-col text-gray-600">
                      Description
                    </span>
                    <span>{celeb.description}</span>
                  </div>
                  <br></br>
                  <div className="flex flex-row justify-between">
                    <div></div>
                    <div>
                      <button
                        onClick={() => {
                          openModal(celeb);
                        }}
                      >
                        <img
                          width="32"
                          height="32"
                          src="https://img.icons8.com/carbon-copy/100/FA5252/filled-trash.png"
                          alt="filled-trash"
                          className="mr-2"
                        />
                      </button>
                      <button
                        className="mr-10"
                        onClick={() => {
                          handleEditable(celeb.id);
                        }}
                      >
                        <img
                          width="28"
                          height="28"
                          src="https://img.icons8.com/windows/32/228BE6/edit--v1.png"
                          alt="edit--v1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <DeleteDialog
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  deleteCeleb={deleteCeleb}
                  celeb={selectedCeleb}
                ></DeleteDialog>
              </div>
            )
          )}
      </div>
    </>
  );
};

export default Celebrities;

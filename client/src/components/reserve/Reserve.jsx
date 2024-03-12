import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [check, setCheck] = useState(false);

  const navigate = useNavigate();

  const { data } = useFetch(
    `${process.env.REACT_APP_BACKURL}/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    checked ? setCheck(true) : setCheck(false);
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms?.map((roomId) => {
          const res = axios.put(
            `${process.env.REACT_APP_BACKURL}/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      setOpen(false);
      alert("Réservation confirmé, cliquer sur ok pour être rédirigé");
      if (selectedRooms) {
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Sélectionnez votre chambre :</span>
        {data?.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">Description : {item.desc}</div>
              <div className="rMax">
                Maximum : <b>{item.maxPeople} personnes</b>
              </div>
              <div className="rPrice">{item.price} €</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers?.map((roomNumber) => (
                <div className="room">
                  <label>
                    <small>Chambre :</small> {roomNumber.number}
                  </label>
                  {!isAvailable(roomNumber) ? (
                    <span> Indisponible</span>
                  ) : (
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {check ? (
          <button className="rButton" onClick={handleClick}>
            Réserver !
          </button>
        ) : (
          <button disabled={true} className="rButton disable" onClick={handleClick}>
            Sélectionner une chambre
          </button>
        )}
      </div>
    </div>
  );
};

export default Reserve;

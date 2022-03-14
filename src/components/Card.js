import { useState } from "react";
import classes from "./card.module.css";

function Card({ shoeContent }) {
  const [currImg, setCurrImg] = useState(0);

  return (
    <div className={classes["card"]}>
      <div
        className={classes["card__title"]}
        style={{ borderColor: shoeContent.highlightColor }}
      >
        <div className={classes["card__title-container"]}>
          <p className={classes["card__title-category"]}>
            {shoeContent.category}
          </p>
          <p>{shoeContent.name}</p>
        </div>
        <div className={classes["card__shoe-size"]}>
          <span>Size: </span>
          {shoeContent.size}
        </div>
      </div>

      <div className={classes["card__img-container"]}>
        <img
          className={classes["card__curr-img"]}
          src={shoeContent.images[currImg]}
          alt={shoeContent.name}
        />
      </div>
      <div className={classes["card__content"]}>
        <div className={classes["card__name"]}>
          <span>Price</span>
          <p>${shoeContent.price}</p>
        </div>
        <div className={classes["card__content-images-container"]}>
          <div className={classes["card__content-images"]}>
            {shoeContent.images.map((img, i) => {
              return (
                <img
                  src={img}
                  alt={shoeContent.name}
                  style={{
                    border: i === currImg ? "3px solid blue;" : "",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

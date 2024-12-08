import React from "react";
import AppContext from "../../context";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
//console.log(styles);

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price };

  //React.useEffect(() => {
  //  setIsAdded(added);
  //}, [added]);

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };
  //console.log(isAdded);

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="155" height="90" />
          <rect x="0" y="101" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="126" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="170" rx="5" ry="5" width="80" height="24" />
          <rect x="124" y="163" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={
                  isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"
                }
                alt="Icon Unliked"
              />
            </div>
          )}
          <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>

            {onPlus && (
              <img
                className={styles.plus}
                onClick={onClickPlus}
                src={
                  isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"
                }
                alt="icon plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
